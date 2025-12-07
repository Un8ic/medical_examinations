// context_helper.js
class ContextHelper {
    constructor() {
        this.helpData = this.getHelpData();
        this.helpIconsAdded = new Set(); // Трекер для добавленных иконок
        this.setupContextHelp();
    }

    getHelpData() {
        return {
            'ferritin': {
                title: 'Ферритин',
                description: 'Ферритин - это белковый комплекс, который хранит железо в организме. Он показывает запасы железа в организме.',
                normal: '15-204 мкг/л',
                low: {
                    causes: [
                        'Железодефицитная анемия',
                        'Недостаточное потребление железа с пищей',
                        'Нарушение всасывания железа (целиакия, болезнь Крона)',
                        'Хронические кровопотери (обильные менструации, язвы желудка)',
                        'Беременность (повышенная потребность в железе)'
                    ],
                    symptoms: [
                        'Усталость и слабость',
                        'Бледность кожи',
                        'Головокружение',
                        'Одышка',
                        'Ломкость ногтей и волос'
                    ],
                    recommendations: [
                        'Проконсультироваться с терапевтом или гематологом',
                        'Увеличить потребление железосодержащих продуктов (красное мясо, печень, бобовые)',
                        'Принимать препараты железа по назначению врача',
                        'Комбинировать с витамином C для лучшего усвоения',
                        'Проверить уровень витамина B12 и фолиевой кислоты'
                    ]
                },
                high: {
                    causes: [
                        'Воспалительные заболевания',
                        'Инфекционные заболевания',
                        'Передозировка препаратов железа',
                        'Гемохроматоз (наследственное заболевание)',
                        'Заболевания печени',
                        'Злокачественные опухоли'
                    ],
                    symptoms: [
                        'Боли в суставах',
                        'Усталость',
                        'Боль в животе',
                        'Потеря либидо',
                        'Бронзовый оттенок кожи'
                    ],
                    recommendations: [
                        'Консультация гематолога',
                        'Исключение воспалительных процессов',
                        'Анализ на С-реактивный белок (СРБ)',
                        'УЗИ органов брюшной полости',
                        'Генетический тест на гемохроматоз при необходимости'
                    ]
                }
            },
            'alt': {
                title: 'АлАТ (Аланинаминотрансфераза)',
                description: 'Фермент, находящийся преимущественно в печени. Повышение указывает на повреждение клеток печени.',
                normal: '0-31 Ед/л',
                high: {
                    causes: [
                        'Вирусные гепатиты',
                        'Токсическое поражение печени (алкоголь, лекарства)',
                        'Жировая болезнь печени',
                        'Цирроз печени',
                        'Опухоли печени',
                        'Мышечные травмы'
                    ],
                    symptoms: [
                        'Тошнота, рвота',
                        'Боль в правом подреберье',
                        'Желтушность кожи и глаз',
                        'Темная моча',
                        'Слабость, утомляемость'
                    ],
                    recommendations: [
                        'Консультация гастроэнтеролога или гепатолога',
                        'УЗИ печени и желчного пузыря',
                        'Анализы на вирусные гепатиты',
                        'Отказ от алкоголя',
                        'Осторожность с приемом лекарств',
                        'Диета с ограничением жирной, жареной пищи'
                    ]
                }
            },
            'ast': {
                title: 'АсАТ (Аспартатаминотрансфераза)',
                description: 'Фермент, находящийся в печени, сердце, мышцах. Повышение может указывать на проблемы с этими органами.',
                normal: '0-32 Ед/л',
                high: {
                    causes: [
                        'Заболевания печени',
                        'Инфаркт миокарда',
                        'Мышечные травмы',
                        'Панкреатит',
                        'Почечная недостаточность'
                    ],
                    recommendations: [
                        'Консультация терапевта',
                        'ЭКГ при подозрении на сердечные проблемы',
                        'УЗИ органов брюшной полости',
                        'Анализ на КФК при мышечных повреждениях',
                        'Соотношение АСТ/АЛТ >2 может указывать на алкогольное поражение'
                    ]
                }
            },
            'hemoglobin': {
                title: 'Гемоглобин',
                description: 'Белок в эритроцитах, переносящий кислород. Показывает способность крови переносить кислород.',
                normal: '120-160 г/л',
                low: {
                    causes: [
                        'Железодефицитная анемия',
                        'Дефицит витамина B12 или фолиевой кислоты',
                        'Хронические кровопотери',
                        'Хронические заболевания',
                        'Заболевания костного мозга'
                    ],
                    recommendations: [
                        'Анализ на ферритин, витамин B12, фолиевую кислоту',
                        'Консультация гематолога',
                        'Диета с железосодержащими продуктами',
                        'Прием препаратов железа по назначению врача'
                    ]
                },
                high: {
                    causes: [
                        'Обезвоживание',
                        'Курение',
                        'Хронические заболевания легких',
                        'Заболевания сердца',
                        'Полицитемия'
                    ],
                    recommendations: [
                        'Проверка гидратации',
                        'Консультация гематолога',
                        'Отказ от курения',
                        'Достаточное потребление жидкости'
                    ]
                }
            },
            'vitamin_d': {
                title: 'Витамин D',
                description: 'Витамин, важный для здоровья костей, иммунитета и многих других функций организма.',
                normal: '30-100 нг/мл',
                low: {
                    causes: [
                        'Недостаточное пребывание на солнце',
                        'Недостаточное потребление с пищей',
                        'Нарушение всасывания',
                        'Ожирение',
                        'Заболевания почек или печени'
                    ],
                    symptoms: [
                        'Усталость',
                        'Боли в костях и мышцах',
                        'Частые простуды',
                        'Депрессия',
                        'Выпадение волос'
                    ],
                    recommendations: [
                        'Прием препаратов витамина D',
                        'Ежедневные прогулки на солнце',
                        'Продукты, богатые витамином D (жирная рыба, яйца)',
                        'Контроль уровня каждые 3-6 месяцев',
                        'Прием с витамином K2 для лучшего усвоения'
                    ]
                }
            },
            'tsh': {
                title: 'ТТГ (Тиреотропный гормон)',
                description: 'Гормон гипофиза, регулирующий работу щитовидной железы.',
                normal: '0.4-4.0 мкМЕ/мл',
                low: {
                    causes: [
                        'Гипертиреоз (повышенная функция щитовидной железы)',
                        'Прием гормонов щитовидной железы',
                        'Беременность (первый триместр)',
                        'Заболевания гипофиза'
                    ],
                    recommendations: [
                        'Консультация эндокринолога',
                        'Анализ на свободный T4 и T3',
                        'УЗИ щитовидной железы',
                        'Исследование антител к щитовидной железе'
                    ]
                },
                high: {
                    causes: [
                        'Гипотиреоз (сниженная функция щитовидной железы)',
                        'Аутоиммунный тиреоидит (Хашимото)',
                        'Дефицит йода',
                        'Состояние после операции на щитовидной железе'
                    ],
                    recommendations: [
                        'Консультация эндокринолога',
                        'Заместительная гормональная терапия',
                        'Диета с достаточным содержанием йода',
                        'Регулярный контроль уровня ТТГ'
                    ]
                }
            },
            'glucose': {
                title: 'Глюкоза',
                description: 'Уровень сахара в крови. Основной источник энергии для клеток.',
                normal: '3.9-6.1 ммоль/л',
                high: {
                    causes: [
                        'Сахарный диабет',
                        'Преддиабет',
                        'Стресс',
                        'Прием некоторых лекарств',
                        'Заболевания поджелудочной железы'
                    ],
                    recommendations: [
                        'Консультация эндокринолога',
                        'Тест на толерантность к глюкозе',
                        'Анализ на гликированный гемоглобин (HbA1c)',
                        'Диета с низким гликемическим индексом',
                        'Регулярная физическая активность'
                    ]
                },
                low: {
                    causes: [
                        'Передозировка инсулина или сахароснижающих препаратов',
                        'Длительное голодание',
                        'Инсулинома',
                        'Заболевания печени'
                    ],
                    recommendations: [
                        'Регулярное питание',
                        'Избегание длительных перерывов между едой',
                        'Консультация эндокринолога',
                        'Наличие быстрых углеводов при симптомах гипогликемии'
                    ]
                }
            },
            'hba1c': {
                title: 'Гликированный гемоглобин (HbA1c)',
                description: 'Показывает средний уровень сахара в крови за последние 2-3 месяца.',
                normal: '4.8-6.0%',
                high: {
                    interpretation: [
                        '6.0-6.4% - повышенный риск развития диабета',
                        '≥6.5% - диагностический критерий сахарного диабета'
                    ],
                    recommendations: [
                        'Консультация эндокринолога',
                        'Контроль глюкозы натощак и после еды',
                        'Диета с ограничением простых углеводов',
                        'Регулярная физическая активность',
                        'Снижение веса при избыточной массе тела'
                    ]
                }
            },
            'cholesterol': {
                title: 'Общий холестерин',
                description: 'Жироподобное вещество, необходимое для строительства клеток, но при избытке вредное для сосудов.',
                normal: '<5.2 ммоль/л',
                high: {
                    risks: [
                        'Атеросклероз',
                        'Ишемическая болезнь сердца',
                        'Инфаркт миокарда',
                        'Инсульт'
                    ],
                    recommendations: [
                        'Анализ на липидный профиль (ЛПНП, ЛПВП, триглицериды)',
                        'Диета с ограничением насыщенных жиров',
                        'Регулярная физическая активность',
                        'Контроль веса',
                        'Консультация кардиолога'
                    ]
                }
            },
            'creatinine': {
                title: 'Креатинин',
                description: 'Продукт распада креатина в мышцах. Показывает функцию почек.',
                normal: '53-97 мкмоль/л',
                high: {
                    causes: [
                        'Почечная недостаточность',
                        'Обезвоживание',
                        'Массивные мышечные травмы',
                        'Прием некоторых лекарств',
                        'Заболевания сердца'
                    ],
                    recommendations: [
                        'Консультация нефролога',
                        'Анализ на скорость клубочковой фильтрации (СКФ)',
                        'УЗИ почек',
                        'Достаточное потребление жидкости',
                        'Ограничение белка в питании при необходимости'
                    ]
                },
                low: {
                    causes: [
                        'Снижение мышечной массы',
                        'Беременность',
                        'Недостаточное питание'
                    ],
                    recommendations: [
                        'Оценка мышечной массы',
                        'Консультация диетолога',
                        'Адекватное потребление белка'
                    ]
                }
            },
            'crp': {
                title: 'С-реактивный белок (СРБ)',
                description: 'Маркер воспаления в организме. Повышается при инфекциях, травмах, воспалительных заболеваниях.',
                normal: '0-5 мг/л',
                high: {
                    interpretation: [
                        '3-10 мг/л - незначительное воспаление (возможны вялотекущие процессы)',
                        '10-40 мг/л - умеренное воспаление (вирусные инфекции)',
                        '>40 мг/л - сильное воспаление (бактериальные инфекции)'
                    ],
                    recommendations: [
                        'Консультация терапевта',
                        'Поиск очага воспаления',
                        'Дополнительные анализы при необходимости',
                        'Повторный анализ после лечения'
                    ]
                }
            }
        };
    }

    setupContextHelp() {
        this.setupHelpModal();
        
        // Используем MutationObserver для отслеживания изменений в таблице
        this.setupTableObserver();
    }

    setupTableObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Проверяем, были ли добавлены новые строки
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('indicator-row')) {
                            const indicatorId = node.dataset.indicatorId;
                            if (indicatorId) {
                                this.addHelpIconToRow(node, indicatorId);
                            }
                        }
                    });
                }
            });
        });

        // Начинаем наблюдение за таблицей
        const tableBody = document.getElementById('indicators-table-body');
        if (tableBody) {
            observer.observe(tableBody, { childList: true });
            
            // Инициализируем иконки для существующих строк
            setTimeout(() => {
                this.initializeHelpIcons();
            }, 100);
        }
    }

    initializeHelpIcons() {
        const rows = document.querySelectorAll('.indicator-row');
        rows.forEach(row => {
            const indicatorId = row.dataset.indicatorId;
            if (indicatorId && this.helpData[indicatorId]) {
                this.addHelpIconToRow(row, indicatorId);
            }
        });
    }

    addHelpIconToRow(row, indicatorId) {
        // Проверяем, не добавлена ли уже иконка
        if (row.querySelector('.help-icon')) {
            return; // Иконка уже есть, пропускаем
        }

        const nameCell = row.querySelector('.indicator-name');
        if (nameCell && this.helpData[indicatorId]) {
            const helpIcon = document.createElement('button');
            helpIcon.className = 'help-icon';
            helpIcon.innerHTML = '?';
            helpIcon.title = 'Объяснение показателя';
            helpIcon.dataset.indicatorId = indicatorId;
            
            // Вставляем после названия показателя
            const link = nameCell.querySelector('.indicator-link');
            if (link) {
                // Вставляем иконку после кнопки с названием
                link.insertAdjacentElement('afterend', helpIcon);
            }
            
            helpIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showHelp(indicatorId);
            });
        }
    }

    setupHelpModal() {
        // Проверяем, не существует ли уже модальное окно
        if (document.getElementById('help-modal')) {
            return;
        }

        // Создаем модальное окно для помощи
        const modalHTML = `
            <div id="help-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="help-title">Контекстный помощник</h2>
                        <button class="modal-close help-modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="help-content">
                            <div class="help-section">
                                <h3 id="help-subtitle">Название показателя</h3>
                                <p id="help-description" class="help-description"></p>
                            </div>
                            
                            <div class="help-section">
                                <h4>Нормальные значения:</h4>
                                <div class="normal-range" id="help-normal"></div>
                            </div>
                            
                            <div class="help-section" id="low-section" style="display: none;">
                                <h4 class="section-title low">При пониженных значениях:</h4>
                                <div class="causes">
                                    <h5>Возможные причины:</h5>
                                    <ul id="low-causes"></ul>
                                </div>
                                <div class="symptoms" id="low-symptoms-container">
                                    <h5>Возможные симптомы:</h5>
                                    <ul id="low-symptoms"></ul>
                                </div>
                                <div class="recommendations">
                                    <h5>Рекомендации:</h5>
                                    <ul id="low-recommendations"></ul>
                                </div>
                            </div>
                            
                            <div class="help-section" id="high-section" style="display: none;">
                                <h4 class="section-title high">При повышенных значениях:</h4>
                                <div class="causes">
                                    <h5>Возможные причины:</h5>
                                    <ul id="high-causes"></ul>
                                </div>
                                <div class="symptoms" id="high-symptoms-container">
                                    <h5>Возможные симптомы:</h5>
                                    <ul id="high-symptoms"></ul>
                                </div>
                                <div class="recommendations">
                                    <h5>Рекомендации:</h5>
                                    <ul id="high-recommendations"></ul>
                                </div>
                            </div>
                            
                            <div class="help-section" id="interpretation-section" style="display: none;">
                                <h4>Интерпретация результатов:</h4>
                                <ul id="help-interpretation"></ul>
                            </div>
                            
                            <div class="help-section" id="risks-section" style="display: none;">
                                <h4>Возможные риски:</h4>
                                <ul id="help-risks"></ul>
                            </div>
                            
                            <div class="help-note">
                                <p><strong>Важно:</strong> Данная информация носит справочный характер. Для точной диагностики и лечения обратитесь к врачу.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Добавляем обработчики закрытия
        document.querySelector('.help-modal-close').addEventListener('click', () => {
            this.closeHelp();
        });
        
        document.getElementById('help-modal').addEventListener('click', (e) => {
            if (e.target.id === 'help-modal') {
                this.closeHelp();
            }
        });
    }

    showHelp(indicatorId) {
        const data = this.helpData[indicatorId];
        if (!data) return;

        const modal = document.getElementById('help-modal');
        const indicator = this.indicators?.find(i => i.id === indicatorId) || 
                         window.dashboardData?.indicators?.find(i => i.id === indicatorId);
        
        // Заголовок
        document.getElementById('help-title').textContent = `Объяснение: ${data.title}`;
        document.getElementById('help-subtitle').textContent = data.title;
        document.getElementById('help-description').textContent = data.description;
        document.getElementById('help-normal').textContent = data.normal;

        // Скрываем все секции
        document.getElementById('low-section').style.display = 'none';
        document.getElementById('high-section').style.display = 'none';
        document.getElementById('interpretation-section').style.display = 'none';
        document.getElementById('risks-section').style.display = 'none';

        // Очищаем списки
        this.clearList('low-causes');
        this.clearList('low-symptoms');
        this.clearList('low-recommendations');
        this.clearList('high-causes');
        this.clearList('high-symptoms');
        this.clearList('high-recommendations');
        this.clearList('help-interpretation');
        this.clearList('help-risks');

        // Показываем актуальную информацию в зависимости от значения показателя
        if (indicator) {
            const currentValue = indicator.lastResult?.value;
            const isNormal = this.isValueNormal(indicator, currentValue);
            
            if (currentValue !== undefined) {
                // Определяем, высокое или низкое значение
                const rangeMatch = data.normal.match(/(\d+[,.]?\d*)\s*-\s*(\d+[,.]?\d*)/);
                if (rangeMatch) {
                    const min = parseFloat(rangeMatch[1].replace(',', '.'));
                    const max = parseFloat(rangeMatch[2].replace(',', '.'));
                    
                    if (currentValue < min && data.low) {
                        this.populateSection('low', data.low);
                    } else if (currentValue > max && data.high) {
                        this.populateSection('high', data.high);
                    }
                } else if (data.normal.startsWith('<')) {
                    const max = parseFloat(data.normal.replace('<', '').trim());
                    if (currentValue > max && data.high) {
                        this.populateSection('high', data.high);
                    }
                }
            }
        }

        // Всегда показываем дополнительные секции, если они есть
        if (data.high?.interpretation) {
            this.populateList('help-interpretation', data.high.interpretation);
            document.getElementById('interpretation-section').style.display = 'block';
        }
        
        if (data.high?.risks) {
            this.populateList('help-risks', data.high.risks);
            document.getElementById('risks-section').style.display = 'block';
        }

        // Если не определили отклонение, показываем общую информацию
        if (!document.getElementById('low-section').style.display.includes('block') && 
            !document.getElementById('high-section').style.display.includes('block')) {
            if (data.low) this.populateSection('low', data.low);
            if (data.high) this.populateSection('high', data.high);
        }

        // Показываем модальное окно
        modal.style.display = 'block';
    }

    populateSection(type, data) {
        const section = document.getElementById(`${type}-section`);
        section.style.display = 'block';
        
        if (data.causes) this.populateList(`${type}-causes`, data.causes);
        if (data.symptoms) {
            this.populateList(`${type}-symptoms`, data.symptoms);
            document.getElementById(`${type}-symptoms-container`).style.display = 'block';
        } else {
            document.getElementById(`${type}-symptoms-container`).style.display = 'none';
        }
        if (data.recommendations) this.populateList(`${type}-recommendations`, data.recommendations);
    }

    populateList(listId, items) {
        const list = document.getElementById(listId);
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    }

    clearList(listId) {
        const list = document.getElementById(listId);
        list.innerHTML = '';
    }

    closeHelp() {
        document.getElementById('help-modal').style.display = 'none';
    }

    isValueNormal(indicator, value) {
        // Копия метода из dashboard_script.js
        if (indicator.reference.includes('зависят') || indicator.reference.includes('фаза')) {
            return true;
        }
        
        if (indicator.reference.startsWith('<')) {
            const maxRef = parseFloat(indicator.reference.replace('<', '').trim());
            return value <= maxRef;
        }
        
        const rangeMatch = indicator.reference.match(/(\d+[,.]?\d*)\s*-\s*(\d+[,.]?\d*)/);
        if (rangeMatch) {
            const minRef = parseFloat(rangeMatch[1].replace(',', '.'));
            const maxRef = parseFloat(rangeMatch[2].replace(',', '.'));
            return value >= minRef && value <= maxRef;
        }
        
        return true;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ContextHelper();
});
