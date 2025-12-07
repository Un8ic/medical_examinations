// dashboard_script.js
class Dashboard {
    constructor() {
        this.indicators = [];
        this.filteredIndicators = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.chart = null;
        this.contextHelper = null;
        this.init();
    }

    init() {
        this.loadIndicators();
        this.setupEventListeners();
        this.renderDashboard();
        this.showNotification('Дашборд загружен. Нажмите на название показателя для просмотра динамики.', 'info');
        
        // Инициализируем контекстный помощник после загрузки данных
        this.contextHelper = new ContextHelper();
    }

    loadIndicators() {
        this.indicators = window.dashboardData.indicators.map(indicator => {
            const lastResult = indicator.history[0];
            const previousResult = indicator.history[1];
            
            return {
                ...indicator,
                lastResult,
                previousResult,
                isNormal: this.isValueNormal(indicator, lastResult.value),
                trend: this.calculateTrend(indicator)
            };
        });
        
        this.filteredIndicators = [...this.indicators];
    }

    isValueNormal(indicator, value) {
        // Для показателей с текстовым reference (например, прогестерон)
        if (indicator.reference.includes('зависят') || indicator.reference.includes('фаза')) {
            return true; // Не помечаем как аномальные, так как нужна дополнительная информация
        }
        
        // Для показателей с верхней границей только (например, холестерин)
        if (indicator.reference.startsWith('<')) {
            const maxRef = parseFloat(indicator.reference.replace('<', '').trim());
            return value <= maxRef;
        }
        
        // Для стандартных диапазонов
        const rangeMatch = indicator.reference.match(/(\d+[,.]?\d*)\s*-\s*(\d+[,.]?\d*)/);
        if (rangeMatch) {
            const minRef = parseFloat(rangeMatch[1].replace(',', '.'));
            const maxRef = parseFloat(rangeMatch[2].replace(',', '.'));
            return value >= minRef && value <= maxRef;
        }
        
        return true; // Если не можем определить, считаем нормальным
    }

    calculateTrend(indicator) {
        if (indicator.history.length < 2) return 'stable';
        
        const current = indicator.history[0].value;
        const previous = indicator.history[1].value;
        const change = ((current - previous) / previous) * 100;
        
        if (Math.abs(change) < 5) return 'stable';
        return change > 0 ? 'increasing' : 'decreasing';
    }

    setupEventListeners() {
        // Фильтры
        document.querySelectorAll('.filter-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-buttons .btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.applyFilters();
            });
        });

        // Поиск
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Модальное окно деталей показателя
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('indicator-modal').addEventListener('click', (e) => {
            if (e.target.id === 'indicator-modal') {
                this.closeModal();
            }
        });
        
        // Закрытие по клавише Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                if (this.contextHelper) {
                    this.contextHelper.closeHelp();
                }
            }
        });
    }

    applyFilters() {
        this.filteredIndicators = this.indicators.filter(indicator => {
            // Поиск
            const matchesSearch = indicator.name.toLowerCase().includes(this.searchTerm) ||
                                indicator.id.toLowerCase().includes(this.searchTerm);
            
            if (!matchesSearch) return false;

            // Фильтры
            switch (this.currentFilter) {
                case 'abnormal':
                    return !indicator.isNormal;
                case 'improving':
                    return indicator.trend === 'decreasing' && !indicator.isNormal;
                case 'worsening':
                    return indicator.trend === 'increasing' && !indicator.isNormal;
                default:
                    return true;
            }
        });

        this.renderDashboard();
        
        // Перерисовываем значки помощи после фильтрации
        if (this.contextHelper) {
            this.contextHelper.addHelpIcons();
        }
    }

    renderDashboard() {
        this.renderStats();
        this.renderTable();
    }

    renderStats() {
        const total = this.indicators.length;
        const normal = this.indicators.filter(ind => ind.isNormal).length;
        const abnormal = total - normal;
        
        // Время отслеживания (берем самую раннюю дату из всех показателей)
        const earliestDate = new Date(Math.min(...this.indicators.flatMap(ind => 
            ind.history.map(h => new Date(h.date))
        )));
        const monthsTracked = Math.max(1, Math.round((new Date() - earliestDate) / (30 * 24 * 60 * 60 * 1000)));

        document.getElementById('total-indicators').textContent = total;
        document.getElementById('normal-indicators').textContent = normal;
        document.getElementById('abnormal-indicators').textContent = abnormal;
        document.getElementById('tracked-time').textContent = monthsTracked;
    }

    renderTable() {
        const tbody = document.getElementById('indicators-table-body');
        const emptyState = document.getElementById('empty-state');
        
        if (this.filteredIndicators.length === 0) {
            tbody.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        
        tbody.innerHTML = this.filteredIndicators.map(indicator => {
            const trendIcon = this.getTrendIcon(indicator.trend);
            const statusClass = indicator.isNormal ? 'normal' : 'abnormal';
            const statusText = indicator.isNormal ? 'В норме' : 'Вне нормы';
            
            return `
                <tr class="indicator-row ${statusClass}" data-indicator-id="${indicator.id}">
                    <td class="indicator-name">
                        <button class="indicator-link">${indicator.name}</button>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                        ${trendIcon}
                    </td>
                    <td class="current-result">
                        <span class="value ${statusClass}">${indicator.lastResult.value}</span>
                        <span class="date">${this.formatDate(indicator.lastResult.date)}</span>
                    </td>
                    <td class="previous-result">
                        ${indicator.previousResult ? `
                            <span class="value">${indicator.previousResult.value}</span>
                            <span class="date">${this.formatDate(indicator.previousResult.date)}</span>
                        ` : '<span class="no-data">Нет данных</span>'}
                    </td>
                    <td class="unit">${indicator.unit}</td>
                    <td class="reference">${indicator.reference}</td>
                    <td class="comment">${indicator.comment || '—'}</td>
                </tr>
            `;
        }).join('');

        // Добавляем обработчики для клика по названиям показателей
        tbody.querySelectorAll('.indicator-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const row = e.target.closest('.indicator-row');
                const indicatorId = row.dataset.indicatorId;
                this.showIndicatorDetails(indicatorId);
            });
        });
    }

    getTrendIcon(trend) {
        const icons = {
            increasing: '📈',
            decreasing: '📉',
            stable: '➡️'
        };
        return `<span class="trend-icon" title="${this.getTrendText(trend)}">${icons[trend]}</span>`;
    }
    
    getTrendText(trend) {
        const texts = {
            increasing: 'Показатель растет',
            decreasing: 'Показатель снижается',
            stable: 'Показатель стабилен'
        };
        return texts[trend] || '';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }

    showIndicatorDetails(indicatorId) {
        const indicator = this.indicators.find(ind => ind.id === indicatorId);
        if (!indicator) return;

        // Заголовок модального окна
        document.getElementById('modal-title').textContent = `Динамика: ${indicator.name}`;

        // Строим график
        this.renderChart(indicator);

        // Заполняем таблицу истории
        this.renderHistoryTable(indicator);

        // Показываем модальное окно
        document.getElementById('indicator-modal').style.display = 'block';
    }

    parseReference(indicator) {
        // Для показателей с верхней границей только
        if (indicator.reference.startsWith('<')) {
            const maxRef = parseFloat(indicator.reference.replace('<', '').trim());
            return { minRef: null, maxRef: maxRef };
        }
        
        // Для стандартных диапазонов
        const rangeMatch = indicator.reference.match(/(\d+[,.]?\d*)\s*-\s*(\d+[,.]?\d*)/);
        if (rangeMatch) {
            const minRef = parseFloat(rangeMatch[1].replace(',', '.'));
            const maxRef = parseFloat(rangeMatch[2].replace(',', '.'));
            return { minRef, maxRef };
        }
        
        // Для текстовых reference
        return { minRef: null, maxRef: null };
    }

    renderChart(indicator) {
        const ctx = document.getElementById('indicator-chart').getContext('2d');
        
        // Уничтожаем предыдущий график
        if (this.chart) {
            this.chart.destroy();
        }

        const dates = indicator.history.map(h => this.formatDate(h.date)).reverse();
        const values = indicator.history.map(h => h.value).reverse();

        // Парсим референсные значения
        const { minRef, maxRef } = this.parseReference(indicator);

        const datasets = [
            {
                label: indicator.name,
                data: values,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: values.map((val, index) => {
                    if (maxRef !== null && val > maxRef) return '#ff6b6b';
                    if (minRef !== null && val < minRef) return '#ff6b6b';
                    return '#4a90e2';
                }),
                pointBorderColor: values.map((val, index) => {
                    if (maxRef !== null && val > maxRef) return '#ff6b6b';
                    if (minRef !== null && val < minRef) return '#ff6b6b';
                    return '#4a90e2';
                }),
                pointRadius: 6,
                pointHoverRadius: 8
            }
        ];

        // Добавляем линии референсных значений, если они есть
        if (maxRef !== null) {
            datasets.push({
                label: 'Верхняя граница нормы',
                data: Array(values.length).fill(maxRef),
                borderColor: '#ff6b6b',
                borderWidth: 1,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            });
        }

        if (minRef !== null) {
            datasets.push({
                label: 'Нижняя граница нормы',
                data: Array(values.length).fill(minRef),
                borderColor: '#ff6b6b',
                borderWidth: 1,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            });
        }

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Динамика показателя (${indicator.unit})`,
                        font: {
                            size: 16,
                            family: 'Montserrat, sans-serif'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y.toFixed(2);
                                if (indicator.unit) {
                                    label += ` ${indicator.unit}`;
                                }
                                return label;
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: minRef !== null ? minRef > 0 ? false : true : false,
                        title: {
                            display: true,
                            text: indicator.unit,
                            font: {
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Дата измерения',
                            font: {
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    renderHistoryTable(indicator) {
        const tbody = document.getElementById('history-table-body');
        const { minRef, maxRef } = this.parseReference(indicator);

        tbody.innerHTML = indicator.history.map(measurement => {
            const isNormal = this.isValueNormal(indicator, measurement.value);
            const statusClass = isNormal ? 'normal' : 'abnormal';
            let deviation = 'В норме';
            
            if (!isNormal) {
                if (minRef !== null && measurement.value < minRef) {
                    const diff = (minRef - measurement.value).toFixed(2);
                    deviation = `Ниже нормы на ${diff} ${indicator.unit}`;
                } else if (maxRef !== null && measurement.value > maxRef) {
                    const diff = (measurement.value - maxRef).toFixed(2);
                    deviation = `Выше нормы на ${diff} ${indicator.unit}`;
                } else {
                    deviation = 'Вне референсного диапазона';
                }
            }

            return `
                <tr class="${statusClass}">
                    <td>${this.formatDate(measurement.date)}</td>
                    <td><strong>${measurement.value} ${indicator.unit}</strong></td>
                    <td><span class="deviation ${statusClass}">${deviation}</span></td>
                </tr>
            `;
        }).join('');
    }

    closeModal() {
        document.getElementById('indicator-modal').style.display = 'none';
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        const container = document.getElementById('notification-container');
        container.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Добавляем стили для новых элементов
const style = document.createElement('style');
style.textContent = `
    .status-badge {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-left: 8px;
        vertical-align: middle;
    }
    
    .status-badge.normal {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .status-badge.abnormal {
        background-color: #ffebee;
        color: #c62828;
    }
    
    .value.abnormal {
        color: #c62828;
        font-weight: bold;
    }
    
    .value.normal {
        color: #2e7d32;
        font-weight: bold;
    }
    
    .trend-icon {
        margin-left: 8px;
        cursor: help;
        vertical-align: middle;
        font-size: 0.9rem;
    }
    
    .deviation {
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 0.85rem;
    }
    
    .deviation.normal {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .deviation.abnormal {
        background-color: #ffebee;
        color: #c62828;
    }
    
    .indicator-row:hover .indicator-link {
        text-decoration: underline;
    }
    
    .indicator-link {
        background: none;
        border: none;
        color: var(--primary-color);
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        padding: 0;
        text-align: left;
        font-family: 'Montserrat', sans-serif;
    }
    
    .no-data {
        color: #9e9e9e;
        font-style: italic;
        font-size: 0.9rem;
    }
    
    /* Анимация для появления строк таблицы */
    @keyframes fadeInRow {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .indicator-row {
        animation: fadeInRow 0.3s ease-out;
    }
    
    /* Улучшенный внешний вид комментариев */
    .comment {
        max-width: 300px;
        font-size: 0.85rem;
        line-height: 1.4;
        color: var(--text-light);
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        padding: 12px;
        border-radius: 8px;
        border-left: 4px solid #dee2e6;
        position: relative;
    }
    
    .indicator-row.abnormal .comment {
        background: linear-gradient(135deg, #fff5f5 0%, #ffeaea 100%);
        border-left-color: #ff6b6b;
    }
    
    .comment::before {
        content: '💡';
        position: absolute;
        left: -25px;
        top: 12px;
        font-size: 1rem;
    }
`;
document.head.appendChild(style);
