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
        this.showNotification('Дашборд загружен. Нажмите на ❔ рядом с показателем для получения подробного объяснения.', 'info');
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
                deviationType: this.getDeviationType(indicator, lastResult.value),
                trend: this.calculateTrend(indicator)
            };
        });
        
        this.filteredIndicators = [...this.indicators];
    }

    getDeviationType(indicator, value) {
        // Для показателей с текстовым reference
        if (!indicator.reference || 
            indicator.reference.includes('зависят') || 
            indicator.reference.includes('фаза') ||
            indicator.reference.includes('зависят от фазы')) {
            return 'unknown';
        }
        
        // Для показателей с верхней границей только
        if (indicator.reference.startsWith('<')) {
            const maxRef = parseFloat(indicator.reference.replace('<', '').trim());
            return value > maxRef ? 'high' : 'normal';
        }
        
        // Для стандартных диапазонов
        const rangeMatch = indicator.reference.match(/(\d+[,.]?\d*)\s*-\s*(\d+[,.]?\d*)/);
        if (rangeMatch) {
            const minRef = parseFloat(rangeMatch[1].replace(',', '.'));
            const maxRef = parseFloat(rangeMatch[2].replace(',', '.'));
            
            if (value < minRef) return 'low';
            if (value > maxRef) return 'high';
            return 'normal';
        }
        
        return 'unknown';
    }

    isValueNormal(indicator, value) {
        const deviationType = this.getDeviationType(indicator, value);
        return deviationType === 'normal' || deviationType === 'unknown';
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

        // Модальные окна
        const indicatorModalClose = document.querySelector('#indicator-modal .modal-close');
        const contextHelpModalClose = document.querySelector('#context-help-modal .modal-close');
        
        if (indicatorModalClose) {
            indicatorModalClose.addEventListener('click', () => this.closeIndicatorModal());
        }
        
        if (contextHelpModalClose) {
            contextHelpModalClose.addEventListener('click', () => this.closeContextHelpModal());
        }

        // Закрытие модальных окон по клику на фон
        document.getElementById('indicator-modal').addEventListener('click', (e) => {
            if (e.target.id === 'indicator-modal') {
                this.closeIndicatorModal();
            }
        });

        document.getElementById('context-help-modal').addEventListener('click', (e) => {
            if (e.target.id === 'context-help-modal') {
                this.closeContextHelpModal();
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
            const helpIcon = indicator.contextHelp ? 
                `<button class="help-btn" data-indicator-id="${indicator.id}" title="Получить объяснение">
                    <i class="fas fa-question-circle"></i>
                </button>` : 
                '';
            
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
                    <td class="help-cell">${helpIcon}</td>
                </tr>
            `;
        }).join('');

        // Обработчики для клика по названиям показателей
        tbody.querySelectorAll('.indicator-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const row = e.target.closest('.indicator-row');
                const indicatorId = row.dataset.indicatorId;
                this.showIndicatorDetails(indicatorId);
            });
        });

        // Обработчики для кнопок помощи
        tbody.querySelectorAll('.help-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const indicatorId = btn.dataset.indicatorId;
                this.showContextHelp(indicatorId);
            });
        });
    }

    getTrendIcon(trend) {
        const icons = {
            increasing: '<span class="trend-icon increasing">📈</span>',
            decreasing: '<span class="trend-icon decreasing">📉</span>',
            stable: '<span class="trend-icon stable">➡️</span>'
        };
        return icons[trend] || icons.stable;
    }

    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    }

    showContextHelp(indicatorId) {
        const indicator = this.indicators.find(ind => ind.id === indicatorId);
        if (!indicator) {
            this.showNotification('Показатель не найден', 'warning');
            return;
        }

        const currentValue = indicator.lastResult.value;
        const deviationType = indicator.deviationType;
        
        // Заголовок
        document.getElementById('context-help-title').textContent = `Помощник: ${indicator.name}`;
        document.getElementById('help-indicator-name').textContent = indicator.name;
        document.getElementById('help-current-value').innerHTML = `
            Текущее значение: <strong>${currentValue} ${indicator.unit}</strong>
        `;
        document.getElementById('help-reference-value').innerHTML = `
            Референсные значения: <strong>${indicator.reference}</strong>
        `;

        // Статус
        let statusText = '';
        let statusClass = '';
        if (deviationType === 'normal') {
            statusText = 'В пределах нормы';
            statusClass = 'normal';
        } else if (deviationType === 'low') {
            statusText = 'Ниже нормы';
            statusClass = 'low';
        } else if (deviationType === 'high') {
            statusText = 'Выше нормы';
            statusClass = 'high';
        } else {
            statusText = 'Требует индивидуальной оценки';
            statusClass = 'unknown';
        }
        
        const statusBadge = document.getElementById('help-status');
        statusBadge.textContent = statusText;
        statusBadge.className = `status-badge ${statusClass}`;

        // Выбираем соответствующие данные для контекстной помощи
        let helpData = null;
        
        // Проверяем, есть ли контекстная помощь для показателя
        if (indicator.contextHelp) {
            if (deviationType === 'low' && indicator.contextHelp.low) {
                helpData = indicator.contextHelp.low;
            } else if ((deviationType === 'high' || deviationType === 'unknown') && indicator.contextHelp.high) {
                helpData = indicator.contextHelp.high;
            } else if (deviationType === 'normal' && indicator.contextHelp.normal) {
                helpData = indicator.contextHelp.normal;
            } else if (indicator.contextHelp.general) {
                helpData = indicator.contextHelp.general;
            }
        }

        // Если нет контекстной помощи, создаем базовую информацию
        if (!helpData) {
            helpData = this.generateBasicHelpData(indicator, deviationType);
        }

        // Заполняем секции
        const explanationElement = document.getElementById('help-explanation');
        if (explanationElement && helpData.explanation) {
            explanationElement.textContent = helpData.explanation;
        }
        
        const causesList = document.getElementById('help-causes');
        if (causesList && helpData.possibleCauses && helpData.possibleCauses.length > 0) {
            causesList.innerHTML = helpData.possibleCauses.map(cause => 
                `<li><i class="fas fa-chevron-right"></i> ${cause}</li>`
            ).join('');
        }
        
        const recommendationsList = document.getElementById('help-recommendations');
        if (recommendationsList && helpData.recommendations && helpData.recommendations.length > 0) {
            recommendationsList.innerHTML = helpData.recommendations.map(rec => 
                `<li><i class="fas fa-check-circle"></i> ${rec}</li>`
            ).join('');
        }

        // Показываем/скрываем секции в зависимости от наличия данных
        const sections = {
            'explanation': helpData.explanation,
            'causes': helpData.possibleCauses && helpData.possibleCauses.length > 0,
            'recommendations': helpData.recommendations && helpData.recommendations.length > 0
        };
        
        for (const [section, hasContent] of Object.entries(sections)) {
            const element = document.getElementById(`help-${section}-section`);
            if (element) {
                element.style.display = hasContent ? 'block' : 'none';
            }
        }

        // Показываем модальное окно
        document.getElementById('context-help-modal').style.display = 'block';
    }

    generateBasicHelpData(indicator, deviationType) {
        let explanation = '';
        let possibleCauses = [];
        let recommendations = [];

        switch (deviationType) {
            case 'normal':
                explanation = `Показатель ${indicator.name} находится в пределах референсных значений. Это хороший результат, указывающий на нормальное функционирование соответствующей системы организма.`;
                possibleCauses = ['Нормальное состояние здоровья'];
                recommendations = [
                    'Продолжать вести здоровый образ жизни',
                    'Регулярно контролировать показатель (раз в 6-12 месяцев)',
                    'Поддерживать сбалансированное питание'
                ];
                break;
                
            case 'low':
                explanation = `Показатель ${indicator.name} ниже референсных значений. Это может указывать на недостаточность функции или дефицит.`;
                possibleCauses = [
                    'Дефицит питательных веществ',
                    'Нарушение синтеза или метаболизма',
                    'Повышенные потери или расход',
                    'Врожденные или приобретенные нарушения'
                ];
                recommendations = [
                    'Проконсультироваться с врачом для уточнения диагноза',
                    'Сдать дополнительные анализы по назначению врача',
                    'Рассмотреть изменение диеты или образа жизни',
                    'Повторить анализ через 1-3 месяца'
                ];
                break;
                
            case 'high':
                explanation = `Показатель ${indicator.name} выше референсных значений. Это может указывать на чрезмерную активность, избыток или патологический процесс.`;
                possibleCauses = [
                    'Избыточное поступление или синтез',
                    'Нарушение выведения или метаболизма',
                    'Воспалительный или патологический процесс',
                    'Прием некоторых лекарственных препаратов'
                ];
                recommendations = [
                    'Немедленно обратиться к врачу для диагностики',
                    'Исключить временные факторы (стресс, физическая нагрузка)',
                    'Сдать дополнительные анализы для уточнения причины',
                    'Рассмотреть возможность коррекции образа жизни'
                ];
                break;
                
            case 'unknown':
            default:
                explanation = indicator.comment || `Показатель ${indicator.name} требует индивидуальной интерпретации врачом, так как референсные значения зависят от многих факторов.`;
                possibleCauses = ['Требуется индивидуальная оценка врачом'];
                recommendations = [
                    'Обязательно проконсультироваться с врачом',
                    'Предоставить врачу полную историю болезни',
                    'Учесть возраст, пол, фазу цикла (если применимо)',
                    'Рассмотреть сдачу анализов в динамике'
                ];
                break;
        }

        return {
            explanation,
            possibleCauses,
            recommendations
        };
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
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4a90e2',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
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
                borderWidth: 2,
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
                borderWidth: 2,
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
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                family: "'Montserrat', sans-serif"
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            size: 14,
                            family: "'Montserrat', sans-serif"
                        },
                        bodyFont: {
                            size: 14
                        },
                        padding: 12,
                        cornerRadius: 6
                    }
                },
                scales: {
                    y: {
                        beginAtZero: minRef !== null ? minRef > 0 ? false : true : false,
                        title: {
                            display: true,
                            text: indicator.unit,
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: "'Montserrat', sans-serif"
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Дата измерения',
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: "'Montserrat', sans-serif"
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
                    duration: 1000,
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
                    const diff = minRef - measurement.value;
                    deviation = `Ниже нормы на ${diff.toFixed(indicator.unit.includes('%') ? 1 : 2)} ${indicator.unit}`;
                } else if (maxRef !== null && measurement.value > maxRef) {
                    const diff = measurement.value - maxRef;
                    deviation = `Выше нормы на ${diff.toFixed(indicator.unit.includes('%') ? 1 : 2)} ${indicator.unit}`;
                } else {
                    deviation = 'Вне референсного диапазона';
                }
            }

            return `
                <tr class="${statusClass}">
                    <td>${this.formatDate(measurement.date)}</td>
                    <td><strong>${measurement.value}</strong> ${indicator.unit}</td>
                    <td>${deviation}</td>
                </tr>
            `;
        }).join('');
    }

    closeContextHelpModal() {
        document.getElementById('context-help-modal').style.display = 'none';
    }

    closeIndicatorModal() {
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
        if (container) {
            container.appendChild(notification);
            
            // Автоматическое закрытие через 5 секунд
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 5000);
            
            // Закрытие по клику на крестик
            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.remove();
            });
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    
    // Добавляем глобальные обработчики клавиш для закрытия модальных окон
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const indicatorModal = document.getElementById('indicator-modal');
            const contextHelpModal = document.getElementById('context-help-modal');
            
            if (indicatorModal.style.display === 'block') {
                dashboard.closeIndicatorModal();
            } else if (contextHelpModal.style.display === 'block') {
                dashboard.closeContextHelpModal();
            }
        }
    });
    
    // Показываем подсказку о контекстном помощнике при первом посещении
    const hasSeenHelpHint = localStorage.getItem('hasSeenHelpHint');
    if (!hasSeenHelpHint) {
        setTimeout(() => {
            dashboard.showNotification(
                '💡 Совет: Нажмите на значок вопроса ❔ рядом с любым показателем, чтобы получить подробное объяснение с возможными причинами и рекомендациями.',
                'info'
            );
            localStorage.setItem('hasSeenHelpHint', 'true');
        }, 2000);
    }
});

// Вспомогательные функции для работы с числами
function parseNumber(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        return parseFloat(value.replace(',', '.'));
    }
    return 0;
}

// Экспорт класса для возможного использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dashboard;
}
