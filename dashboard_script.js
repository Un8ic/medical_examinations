class Dashboard {
    constructor() {
        this.indicators = [];
        this.filteredIndicators = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.chart = null;
        this.init();
    }

    init() {
        this.loadIndicators();
        this.setupEventListeners();
        this.renderDashboard();
        this.showNotification('Дашборд загружен. Нажмите на название показателя для просмотра динамики.', 'info');
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
        const [min, max] = indicator.reference.split(' - ').map(Number);
        return value >= min && value <= max;
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

        // Модальное окно
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('indicator-modal').addEventListener('click', (e) => {
            if (e.target.id === 'indicator-modal') {
                this.closeModal();
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
            
            return `
                <tr class="indicator-row ${statusClass}" data-indicator-id="${indicator.id}">
                    <td class="indicator-name">
                        <button class="indicator-link">${indicator.name}</button>
                        ${trendIcon}
                    </td>
                    <td class="current-result">
                        <span class="value">${indicator.lastResult.value}</span>
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
        return `<span class="trend-icon">${icons[trend]}</span>`;
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

    renderChart(indicator) {
        const ctx = document.getElementById('indicator-chart').getContext('2d');
        
        // Уничтожаем предыдущий график
        if (this.chart) {
            this.chart.destroy();
        }

        const dates = indicator.history.map(h => this.formatDate(h.date)).reverse();
        const values = indicator.history.map(h => h.value).reverse();

        // Парсим референсные значения
        const [minRef, maxRef] = indicator.reference.split(' - ').map(Number);

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: indicator.name,
                        data: values,
                        borderColor: '#4a90e2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Верхняя граница нормы',
                        data: Array(values.length).fill(maxRef),
                        borderColor: '#ff6b6b',
                        borderWidth: 1,
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    },
                    {
                        label: 'Нижняя граница нормы',
                        data: Array(values.length).fill(minRef),
                        borderColor: '#ff6b6b',
                        borderWidth: 1,
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Динамика показателя (${indicator.unit})`
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: minRef > 0 ? false : true,
                        title: {
                            display: true,
                            text: indicator.unit
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Дата измерения'
                        }
                    }
                }
            }
        });
    }

    renderHistoryTable(indicator) {
        const tbody = document.getElementById('history-table-body');
        const [minRef, maxRef] = indicator.reference.split(' - ').map(Number);

        tbody.innerHTML = indicator.history.map(measurement => {
            const isNormal = this.isValueNormal(indicator, measurement.value);
            const statusClass = isNormal ? 'normal' : 'abnormal';
            let deviation = 'В норме';
            
            if (!isNormal) {
                if (measurement.value < minRef) {
                    deviation = `Ниже нормы на ${(minRef - measurement.value).toFixed(1)}`;
                } else {
                    deviation = `Выше нормы на ${(measurement.value - maxRef).toFixed(1)}`;
                }
            }

            return `
                <tr class="${statusClass}">
                    <td>${this.formatDate(measurement.date)}</td>
                    <td>${measurement.value}</td>
                    <td>${deviation}</td>
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