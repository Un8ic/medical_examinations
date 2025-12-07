// context_helper.js
class ContextHelper {
    constructor() {
        this.helpData = this.getHelpData();
        this.setupContextHelp();
        this.hasIconsAdded = false; // Флаг, чтобы значки добавлялись только один раз
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
                },
                high: {
                    causes: [
                        'Передозировка препаратов витамина D',
                        'Некоторые заболевания (саркоидоз)'
                    ],
                    symptoms: [
                        'Тошнота, рвота',
                        'Запоры',
                        'Слабость',
                        'Потеря аппетита',
                        'Почечные камни'
                    ],
                    recommendations: [
                        'Прекращение приема витамина D',
                        'Консультация эндокринолога',
                        'Контроль уровня кальция в крови'
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
                    symptoms: [
                        'Учащенное сердцебиение',
                        'Потеря веса',
                        'Тремор рук',
                        'Потливость',
                        'Нервозность'
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
                    symptoms: [
                        'Усталость, слабость',
                        'Увеличение веса',
                        'Сухость кожи',
                        'Выпадение волос',
                        'Депрессия'
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
                low: {
                    causes: [
                        'Передозировка инсулина или сахароснижающих препаратов',
                        'Длительное голодание',
                        'Инсулинома',
                        'Заболевания печени'
                    ],
                    symptoms: [
                        'Потливость',
                        'Дрожь',
                        'Головокружение',
                        'Слабость',
                        'Спутанность сознания'
                    ],
                    recommendations: [
                        'Регулярное питание',
                        'Избегание длительных перерывов между едой',
                        'Консультация эндокринолога',
                        'Наличие быстрых углеводов при симптомах гипогликемии'
                    ]
                },
                high: {
                    causes: [
                        'Сахарный диабет',
                        'Преддиабет',
                        'Стресс',
                        'Прием некоторых лекарств',
                        'Заболевания поджелудочной железы'
                    ],
                    symptoms: [
                        'Сильная жажда',
                        'Частое мочеиспускание',
                        'Усталость',
                        'Затуманенное зрение'
                    ],
                    recommendations: [
                        'Консультация эндокринолога',
                        'Тест на толерантность к глюкозе',
                        'Анализ на гликированный гемоглобин (HbA1c)',
                        'Диета с низким гликемическим индексом',
                        'Регулярная физическая активность'
                    ]
                }
            },
            'hba1c': {
                title: 'Гликированный гемоглобин (HbA1c)',
                description: 'Показывает средний уровень сахара в крови за последние 2-3 месяца.',
                normal: '4.8-6.0%',
                low: {
                    causes: [
                        'Частые гипогликемии',
                        'Гемолитическая анемия',
                        'Заболевания почек',
                        'Беременность'
                    ],
                    recommendations: [
                        'Консультация эндокринолога',
                        'Контроль уровня глюкозы',
                        'Анализ на гемоглобин и ретикулоциты'
                    ]
                },
                high: {
                    causes: [
                        'Сахарный диабет',
                        'Преддиабет',
                        'Синдром Кушинга',
                        'Хронические заболевания почек'
                    ],
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
                    causes: [
                        'Неправильное питание',
                        'Малоподвижный образ жизни',
                        'Ожирение',
                        'Наследственность',
                        'Заболевания печени'
                    ],
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
                },
                low: {
                    causes: [
                        'Гипертиреоз',
                        'Заболевания печени',
                        'Нарушение всасывания',
                        'Недоедание'
                    ],
                    recommendations: [
                        'Консультация терапевта',
                        'Анализ функции щитовидной железы',
                        'Проверка функции печени',
                        'Сбалансированное питание'
                    ]
                }
            },
            'creatinine': {
                title: 'Креатинин',
                description: 'Продукт распада креатина в мышцах. Показывает функцию почек.',
                normal: '53-97 мкмоль/л',
                low: {
                    causes: [
                        'Снижение мышечной массы',
                        'Беременность',
                        'Недостаточное питание',
                        'Заболевания печени'
                    ],
                    recommendations: [
                        'Оценка мышечной массы',
                        'Консультация диетолога',
                        'Адекватное потребление белка'
                    ]
                },
                high: {
                    causes: [
                        'Почечная недостаточность',
                        'Обезвоживание',
                        'Массивные мышечные травмы',
                        'Прием некоторых лекарств',
                        'Заболевания сердца'
                    ],
                    symptoms: [
                        'Усталость',
                        'Отеки',
                        'Одышка',
                        'Тошнота',
                        'Изменения в мочеиспускании'
                    ],
                    recommendations: [
                        'Консультация нефролога',
                        'Анализ на скорость клубочковой фильтрации (СКФ)',
                        'УЗИ почек',
                        'Достаточное потребление жидкости',
                        'Ограничение белка в питании при необходимости'
                    ]
                }
            },
            'homocysteine': {
                title: 'Гомоцистеин',
                description: 'Аминокислота, повышенный уровень которой связан с риском сердечно-сосудистых заболеваний.',
                normal: '5-15 мкмоль/л',
                high: {
                    causes: [
                        'Дефицит витаминов B6, B12, фолиевой кислоты',
                        'Курение',
                        'Чрезмерное употребление кофе',
                        'Заболевания почек',
                        'Наследственность'
                    ],
                    risks: [
                        'Атеросклероз',
                        'Тромбоз',
                        'Инфаркт миокарда',
                        'Инсульт',
                        'Осложнения при беременности'
                    ],
                    recommendations: [
                        'Прием витаминов группы B',
                        'Отказ от курения',
                        'Ограничение кофе',
                        'Диета, богатая зелеными овощами',
                        'Консультация кардиолога'
                    ]
                }
            },
            'ca125': {
                title: 'СА-125',
                description: 'Онкомаркер, используемый преимущественно для мониторинга рака яичников.',
                normal: '0-35 Ед/мл',
                high: {
                    causes: [
                        'Рак яичников',
                        'Эндометриоз',
                        'Миома матки',
                        'Воспалительные заболевания органов малого таза',
                        'Беременность',
                        'Менструация'
                    ],
                    recommendations: [
                        'Консультация гинеколога',
                        'УЗИ органов малого таза',
                        'Повторный анализ через 1-2 месяца',
                        'Исключение неонкологических причин'
                    ]
                }
            },
            'progesterone': {
                title: 'Прогестерон',
                description: 'Женский половой гормон, важный для менструального цикла и беременности.',
                normal: 'Зависит от фазы цикла',
                interpretation: [
                    'Фолликулярная фаза: 0,3-2,2 нмоль/л',
                    'Овуляция: 0,5-9,4 нмоль/л',
                    'Лютеиновая фаза: 7,0-56,6 нмоль/л',
                    'Постменопауза: < 0,6 нмоль/л'
                ],
                low: {
                    causes: [
                        'Недостаточность желтого тела',
                        'Дисфункция яичников',
                        'Стресс',
                        'Чрезмерные физические нагрузки'
                    ],
                    symptoms: [
                        'Нерегулярные менструации',
                        'Бесплодие',
                        'Выкидыши на ранних сроках',
                        'Предменструальный синдром'
                    ],
                    recommendations: [
                        'Консультация гинеколога-эндокринолога',
                        'Анализ в правильную фазу цикла',
                        'УЗИ органов малого таза',
                        'Гормональная терапия при необходимости'
                    ]
                },
                high: {
                    causes: [
                        'Беременность',
                        'Кисты яичников',
                        'Опухоли яичников',
                        'Заболевания надпочечников'
                    ],
                    recommendations: [
                        'Тест на беременность',
                        'УЗИ органов малого таза',
                        'Консультация гинеколога'
                    ]
                }
            },
            'estradiol': {
                title: 'Эстрадиол',
                description: 'Основной женский половой гормон, важный для репродуктивной функции.',
                normal: 'Зависит от фазы цикла',
                interpretation: [
                    'Фолликулярная фаза: 68-1269 пмоль/л',
                    'Овуляция: 131-1655 пмоль/л',
                    'Лютеиновая фаза: 91-861 пмоль/л',
                    'Постменопауза: < 73 пмоль/л'
                ],
                low: {
                    causes: [
                        'Дисфункция яичников',
                        'Менопауза',
                        'Чрезмерные физические нагрузки',
                        'Низкий вес тела'
                    ],
                    symptoms: [
                        'Приливы жара',
                        'Сухость влагалища',
                        'Перепады настроения',
                        'Нарушения менструального цикла'
                    ],
                    recommendations: [
                        'Консультация гинеколога-эндокринолога',
                        'Гормональная терапия при необходимости',
                        'Сбалансированное питание',
                        'Контроль веса'
                    ]
                },
                high: {
                    causes: [
                        'Ожирение',
                        'Опухоли яичников',
                        'Цирроз печени',
                        'Прием эстрогенсодержащих препаратов'
                    ],
                    recommendations: [
                        'Консультация гинеколога',
                        'УЗИ органов малого таза',
                        'Контроль веса',
                        'Исследование функции печени'
                    ]
                }
            },
            'crp': {
                title: 'С-реактивный белок (СРБ)',
                description: 'Маркер воспаления в организме. Повышается при инфекциях, травмах, воспалительных заболеваниях.',
                normal: '0-5 мг/л',
                interpretation: [
                    '3-10 мг/л - незначительное воспаление (возможны вялотекущие процессы)',
                    '10-40 мг/л - умеренное воспаление (вирусные инфекции)',
                    '>40 мг/л - сильное воспаление (бактериальные инфекции)'
                ],
                high: {
                    causes: [
                        'Бактериальные инфекции',
                        'Вирусные инфекции',
                        'Воспалительные заболевания (артрит, колит)',
                        'Травмы, операции',
                        'Ожоги',
                        'Инфаркт миокарда'
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
        
        // Наблюдаем за изменениями в таблице
        this.observeTableChanges();
        
        // Первоначальное добавление значков
        this.addHelpIcons();
    }

    observeTableChanges() {
        // Наблюдаем за изменениями в таблице показателей
        const tableBody = document.getElementById('indicators-table-body');
        if (tableBody) {
            const observer = new MutationObserver(() => {
                if (!this.hasIconsAdded) {
                    this.addHelpIcons();
                }
            });
            
            observer.observe(tableBody, { childList: true, subtree: true });
        }
    }

    addHelpIcons() {
        // Проверяем, не добавлены ли уже значки
        if (this.hasIconsAdded) return;
        
        // Ждем загрузки таблицы
        setTimeout(() => {
            const rows = document.querySelectorAll('.indicator-row');
            rows.forEach(row => {
                const indicatorId = row.dataset.indicatorId;
                if (indicatorId) {
                    // Проверяем, есть ли уже значок помощи
                    const existingIcon = row.querySelector('.help-icon');
                    if (existingIcon) {
                        existingIcon.remove(); // Удаляем старый значок
                    }
                    
                    // Добавляем новый значок только если есть данные для этого показателя
                    if (this.helpData[indicatorId]) {
                        const nameCell = row.querySelector('.indicator-name');
                        if (nameCell) {
                            const helpIcon = this.createHelpIcon(indicatorId);
                            
                            // Вставляем после названия показателя, но перед значком тренда
                            const link = nameCell.querySelector('.indicator-link');
                            const trendIcon = nameCell.querySelector('.trend-icon');
                            
                            if (link) {
                                if (trendIcon) {
                                    nameCell.insertBefore(helpIcon, trendIcon);
                                } else {
                                    link.parentNode.insertBefore(helpIcon, link.nextSibling);
                                }
                            }
                        }
                    }
                }
            });
            
            this.hasIconsAdded = true;
        }, 100);
    }

    createHelpIcon(indicatorId) {
        const helpIcon = document.createElement('button');
        helpIcon.className = 'help-icon';
        helpIcon.innerHTML = '?';
        helpIcon.title = 'Объяснение показателя';
        helpIcon.dataset.indicatorId = indicatorId;
        
        helpIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showHelp(indicatorId);
        });
        
        return helpIcon;
    }

    setupHelpModal() {
        // Создаем модальное окно для помощи
        const modalHTML = `
            <div id="help-modal" class="modal">
                <div class="modal-content help-modal-content">
                    <div class="modal-header">
                        <h2 id="help-title">Контекстный помощник</h2>
                        <button class="modal-close" id="help-modal-close">&times;</button>
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
                            
                            <div class="help-section" id="interpretation-section" style="display: none;">
                                <h4>Интерпретация результатов:</h4>
                                <ul id="help-interpretation"></ul>
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
        
        // Удаляем существующее модальное окно, если оно есть
        const existingModal = document.getElementById('help-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Добавляем обработчики закрытия
        const helpModalClose = document.getElementById('help-modal-close');
        const helpModal = document.getElementById('help-modal');
        
        if (helpModalClose) {
            helpModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeHelp();
            });
        }
        
        if (helpModal) {
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) {
                    this.closeHelp();
                }
            });
        }
    }

    showHelp(indicatorId) {
        const data = this.helpData[indicatorId];
        if (!data) {
            console.log('Нет данных для показателя:', indicatorId);
            return;
        }

        const modal = document.getElementById('help-modal');
        if (!modal) return;

        // Заголовок
        document.getElementById('help-title').textContent = `Объяснение: ${data.title}`;
        document.getElementById('help-subtitle').textContent = data.title;
        document.getElementById('help-description').textContent = data.description;
        
        // Отображаем нормальные значения
        if (data.normal) {
            document.getElementById('help-normal').textContent = data.normal;
            document.getElementById('help-normal').style.display = 'inline-block';
        } else {
            document.getElementById('help-normal').style.display = 'none';
        }

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

        // Всегда показываем интерпретацию, если она есть
        if (data.interpretation) {
            this.populateList('help-interpretation', data.interpretation);
            document.getElementById('interpretation-section').style.display = 'block';
        }

        // Показываем информацию о пониженных значениях, если она есть
        if (data.low) {
            this.populateSection('low', data.low);
        }

        // Показываем информацию о повышенных значениях, если она есть
        if (data.high) {
            this.populateSection('high', data.high);
            
            // Показываем риски отдельно, если они есть
            if (data.high.risks) {
                this.populateList('help-risks', data.high.risks);
                document.getElementById('risks-section').style.display = 'block';
            }
        }

        // Если есть только информация о повышенных значениях (например, для CA-125),
        // но нет о пониженных, все равно показываем секцию с повышенными значениями
        if (data.high && !data.low) {
            document.getElementById('high-section').style.display = 'block';
        }

        // Показываем модальное окно
        modal.style.display = 'block';
    }

    populateSection(type, data) {
        const section = document.getElementById(`${type}-section`);
        if (section) {
            section.style.display = 'block';
            
            if (data.causes && data.causes.length > 0) {
                this.populateList(`${type}-causes`, data.causes);
            } else {
                document.querySelector(`#${type}-section .causes`).style.display = 'none';
            }
            
            if (data.symptoms && data.symptoms.length > 0) {
                this.populateList(`${type}-symptoms`, data.symptoms);
                const symptomsContainer = document.getElementById(`${type}-symptoms-container`);
                if (symptomsContainer) symptomsContainer.style.display = 'block';
            } else {
                const symptomsContainer = document.getElementById(`${type}-symptoms-container`);
                if (symptomsContainer) symptomsContainer.style.display = 'none';
            }
            
            if (data.recommendations && data.recommendations.length > 0) {
                this.populateList(`${type}-recommendations`, data.recommendations);
            } else {
                document.querySelector(`#${type}-section .recommendations`).style.display = 'none';
            }
        }
    }

    populateList(listId, items) {
        const list = document.getElementById(listId);
        if (list) {
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                list.appendChild(li);
            });
        }
    }

    clearList(listId) {
        const list = document.getElementById(listId);
        if (list) {
            list.innerHTML = '';
        }
    }

    closeHelp() {
        const modal = document.getElementById('help-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Ждем немного, чтобы таблица успела загрузиться
    setTimeout(() => {
        new ContextHelper();
    }, 300);
});
