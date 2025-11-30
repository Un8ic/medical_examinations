// Данные анализов для чек-листа (цены для Новосибирска)
const checkupAnalyses = {
    basic: [
        {
            id: 'blood_general',
            name: 'Общий анализ крови',
            category: 'basic',
            price: 450,
            description: 'Оценка основных показателей крови',
            details: 'Включает гемоглобин, эритроциты, лейкоциты, тромбоциты, СОЭ',
            recommended: true
        },
        {
            id: 'blood_bio',
            name: 'Биохимический анализ крови',
            category: 'basic',
            price: 1890,
            description: 'Комплексная оценка функции органов',
            details: 'АЛТ, АСТ, билирубин, креатинин, мочевина, глюкоза, общий белок',
            recommended: true
        },
        {
            id: 'urine_general',
            name: 'Общий анализ мочи',
            category: 'basic',
            price: 350,
            description: 'Оценка состояния мочевыделительной системы',
            details: 'Цвет, прозрачность, плотность, белок, глюкоза, лейкоциты',
            recommended: true
        }
    ],

    hormones: [
        {
            id: 'tsh',
            name: 'ТТГ (тиреотропный гормон)',
            category: 'hormones',
            price: 520,
            description: 'Оценка функции щитовидной железы',
            details: 'Основной регулятор работы щитовидной железы',
            recommended: false
        },
        {
            id: 'cortisol',
            name: 'Кортизол',
            category: 'hormones',
            price: 580,
            description: 'Гормон стресса',
            details: 'Оценка функции надпочечников',
            recommended: false
        },
        {
            id: 'testosterone',
            name: 'Тестостерон общий',
            category: 'hormones',
            price: 610,
            description: 'Мужской половой гормон',
            details: 'Важен для обоих полов',
            recommended: false
        },
        {
            id: 'estradiol',
            name: 'Эстрадиол',
            category: 'hormones',
            price: 590,
            description: 'Женский половой гормон',
            details: 'Оценка репродуктивного здоровья',
            recommended: false
        }
    ],

    vitamins: [
        {
            id: 'vitamin_d',
            name: 'Витамин D',
            category: 'vitamins',
            price: 1750,
            description: '25-ОН Витамин D',
            details: 'Критически важен для иммунитета и костей',
            recommended: true
        },
        {
            id: 'vitamin_b12',
            name: 'Витамин B12',
            category: 'vitamins',
            price: 890,
            description: 'Цианокобаламин',
            details: 'Влияет на кроветворение и нервную систему',
            recommended: false
        },
        {
            id: 'ferritin',
            name: 'Ферритин',
            category: 'vitamins',
            price: 620,
            description: 'Маркер запасов железа',
            details: 'Показывает уровень железа в организме',
            recommended: true
        }
    ],

    special: [
        {
            id: 'hba1c',
            name: 'Гликированный гемоглобин',
            category: 'special',
            price: 720,
            description: 'Контроль уровня сахара',
            details: 'Показывает средний уровень глюкозы за 3 месяца',
            recommended: true
        },
        {
            id: 'cholesterol',
            name: 'Липидный профиль',
            category: 'special',
            price: 850,
            description: 'Оценка риска атеросклероза',
            details: 'Холестерин общий, ЛПНП, ЛПВП, триглицериды',
            recommended: true
        },
        {
            id: 'crp',
            name: 'С-реактивный белок',
            category: 'special',
            price: 480,
            description: 'Маркер воспаления',
            details: 'Показывает наличие воспалительных процессов',
            recommended: false
        },
        {
            id: 'ecg',
            name: 'ЭКГ (электрокардиограмма)',
            category: 'special',
            price: 950,
            description: 'Оценка работы сердца',
            details: 'Регистрация электрической активности сердца',
            recommended: true
        },
        {
            id: 'ultrasound',
            name: 'УЗИ органов брюшной полости',
            category: 'special',
            price: 2200,
            description: 'Комплексное УЗИ',
            details: 'Печень, желчный пузырь, поджелудочная, селезенка, почки',
            recommended: true
        }
    ]
};

// Данные клиник Новосибирска
const novosibirskClinics = [
    {
        id: 'invitro',
        name: 'ИНВИТРО',
        logo: '🏥',
        rating: 4.8,
        reviews: 1247,
        address: 'ул. Ленина, 12',
        phone: '+7 (383) 123-45-67',
        workingHours: 'пн-вс: 7:00-20:00',
        features: ['Онлайн-запись', 'Результаты онлайн', 'Срочные анализы'],
        discount: 'При единовременной сдаче 5+ анализов - скидка 10%',
        deliveryTime: '1-2 рабочих дня'
    },
    {
        id: 'gemotest',
        name: 'Гемотест',
        logo: '🩺',
        rating: 4.6,
        reviews: 893,
        address: 'пр. Карла Маркса, 45',
        phone: '+7 (383) 234-56-78',
        workingHours: 'пн-пт: 8:00-19:00, сб-вс: 8:00-17:00',
        features: ['Современное оборудование', 'Детские заборы', 'Бесплатная парковка'],
        discount: 'Скидка 15% по карте здоровья',
        deliveryTime: '1-3 рабочих дня'
    },
    {
        id: 'citilab',
        name: 'ЦИТИЛАБ',
        logo: '🔬',
        rating: 4.7,
        reviews: 756,
        address: 'ул. Кирова, 32',
        phone: '+7 (383) 345-67-89',
        workingHours: 'круглосуточно',
        features: ['Круглосуточный забор', 'Собственная лаборатория', 'СМС-оповещения'],
        discount: 'Первичным клиентам скидка 20%',
        deliveryTime: '1-2 рабочих дня'
    }
];

// Класс контекстного помощника
class ContextHelper {
    constructor() {
        this.helper = document.getElementById('context-helper');
        this.overlay = document.getElementById('helper-overlay');
        this.title = document.getElementById('helper-title');
        this.content = document.getElementById('helper-content');
        this.closeBtn = document.getElementById('helper-close');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', () => this.hide());
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hide();
            }
        });
    }

    showAnalysisInfo(analysisId) {
        const analysisData = window.contextHelperData ? window.contextHelperData[analysisId] : null;
        
        if (!analysisData) {
            this.showBasicInfo(analysisId);
            return;
        }

        this.title.textContent = analysisData.title;
        
        let html = `
            <div class="helper-section">
                <p>${analysisData.description}</p>
            </div>
        `;

        // Если есть отдельные показатели
        if (analysisData.indicators) {
            for (const [key, indicator] of Object.entries(analysisData.indicators)) {
                html += this.createIndicatorHTML(indicator);
            }
        } else {
            // Если анализ имеет общие нормы
            if (analysisData.normal) {
                html += `
                    <div class="helper-norm">
                        <p><strong>Нормальные значения:</strong> ${analysisData.normal}</p>
                    </div>
                `;
            }
            
            // Отклонения
            if (analysisData.low) {
                html += this.createDeviationHTML('Пониженные значения', analysisData.low);
            }
            
            if (analysisData.high) {
                html += this.createDeviationHTML('Повышенные значения', analysisData.high);
            }
        }

        // Общие рекомендации
        html += `
            <div class="helper-section">
                <h4>💡 Общие рекомендации</h4>
                <ul class="helper-list">
                    <li>Интерпретируйте результаты вместе с врачом</li>
                    <li>Учитывайте свои симптомы и историю болезни</li>
                    <li>Повторяйте анализы в динамике при необходимости</li>
                    <li>Сообщайте врачу о принимаемых лекарствах</li>
                </ul>
            </div>
        `;

        this.content.innerHTML = html;
        this.show();
    }

    createIndicatorHTML(indicator) {
        return `
            <div class="helper-section">
                <h4>${indicator.name}</h4>
                <div class="helper-norm">
                    <p><strong>Норма:</strong> ${indicator.normal}</p>
                </div>
                ${indicator.low ? this.createDeviationHTML('Понижение', indicator.low) : ''}
                ${indicator.high ? this.createDeviationHTML('Повышение', indicator.high) : ''}
            </div>
        `;
    }

    createDeviationHTML(title, data) {
        const statusClass = data.status ? `helper-status ${data.status}` : 'helper-status warning';
        const statusText = data.status === 'critical' ? 'Требует внимания!' : 
                          data.status === 'warning' ? 'Внимание' : 'Отклонение';
        
        return `
            <div class="deviation-section">
                <span class="${statusClass}">${statusText}</span>
                <h5>${title}</h5>
                <p><strong>Возможные причины:</strong></p>
                <ul class="helper-list">
                    ${data.reasons.map(reason => `<li>${reason}</li>`).join('')}
                </ul>
                <p><strong>Рекомендации:</strong></p>
                <ul class="helper-list">
                    ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    showBasicInfo(analysisId) {
        // Находим данные анализа для отображения базовой информации
        let analysisInfo = null;
        Object.values(checkupAnalyses).flat().forEach(analysis => {
            if (analysis.id === analysisId) {
                analysisInfo = analysis;
            }
        });

        this.title.textContent = analysisInfo ? analysisInfo.name : "Информация об анализе";
        
        let content = '';
        if (analysisInfo) {
            content = `
                <div class="helper-section">
                    <p><strong>Описание:</strong> ${analysisInfo.description}</p>
                    <p><strong>Детали:</strong> ${analysisInfo.details}</p>
                </div>
                <div class="helper-section">
                    <h4>💡 Общие рекомендации</h4>
                    <ul class="helper-list">
                        <li>Консультация с врачом перед сдачей анализа</li>
                        <li>Соблюдение правил подготовки к исследованию</li>
                        <li>Интерпретация результатов совместно со специалистом</li>
                        <li>Учет индивидуальных особенностей и истории болезни</li>
                    </ul>
                </div>
            `;
        } else {
            content = `
                <div class="helper-section">
                    <p>Подробная информация по этому анализу будет доступна в ближайшее время.</p>
                    <p>Рекомендуем проконсультироваться с врачом для интерпретации результатов.</p>
                </div>
            `;
        }

        this.content.innerHTML = content;
        this.show();
    }

    show() {
        this.helper.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.helper.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Основная логика чек-листа
class CheckupChecklist {
    constructor() {
        this.selectedAnalyses = new Set();
        this.selectedClinic = null;
        this.userParams = {};
        this.contextHelper = new ContextHelper();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAnalysesChecklist();
        this.loadClinics();
        
        setTimeout(() => {
            this.showNotification('Добро пожаловать в конструктор идеального чекапа! Заполните параметры для персонализированных рекомендаций.', 'info');
        }, 1000);
    }

    setupEventListeners() {
        document.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nextStep = e.target.dataset.next;
                this.goToStep(nextStep);
            });
        });

        document.querySelectorAll('.prev-step').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prevStep = e.target.dataset.prev;
                this.goToStep(prevStep);
            });
        });

        document.getElementById('select-all').addEventListener('click', () => {
            this.selectAllAnalyses();
        });

        document.getElementById('deselect-all').addEventListener('click', () => {
            this.deselectAllAnalyses();
        });

        document.getElementById('start-over').addEventListener('click', () => {
            this.startOver();
        });

        document.getElementById('print-plan').addEventListener('click', () => {
            this.printPlan();
        });

        document.getElementById('save-pdf').addEventListener('click', () => {
            this.savePDF();
        });

        // Добавляем обработчики для чекбоксов параметров
        this.setupParameterCheckboxes();
    }

    setupParameterCheckboxes() {
        // Обработчики для факторов риска
        document.querySelectorAll('input[name="risk_factors"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.collectUserParams();
            });
        });

        // Обработчики для целей обследования
        document.querySelectorAll('input[name="goals"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.collectUserParams();
            });
        });

        // Обработчики для пола
        document.querySelectorAll('input[name="gender"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.collectUserParams();
            });
        });

        // Обработчики для числовых полей
        ['age', 'height', 'weight'].forEach(field => {
            document.getElementById(field).addEventListener('input', () => {
                this.collectUserParams();
            });
        });
    }

    goToStep(stepNumber) {
        document.querySelectorAll('.step-content').forEach(step => {
            step.classList.remove('active');
        });

        document.getElementById(`step-${stepNumber}`).classList.add('active');

        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) <= stepNumber) {
                step.classList.add('active');
            }
        });

        if (stepNumber === '2') {
            this.updateRecommendedAnalyses();
            this.showNotification('На основе ваших параметров мы подобрали рекомендуемые анализы.', 'info');
        } else if (stepNumber === '3') {
            this.showNotification('Выберите клинику для сдачи анализов.', 'info');
        } else if (stepNumber === '4') {
            this.showFinalResults();
            this.showNotification('Ваш персонализированный план чекапа готов!', 'success');
        }
    }

    loadAnalysesChecklist() {
        const container = document.getElementById('analyses-checklist');
        container.innerHTML = '';

        Object.entries(checkupAnalyses).forEach(([category, analyses]) => {
            const categorySection = document.createElement('div');
            categorySection.className = 'checklist-category';
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = this.getCategoryName(category);
            categorySection.appendChild(categoryTitle);

            analyses.forEach(analysis => {
                const analysisItem = this.createAnalysisItem(analysis);
                categorySection.appendChild(analysisItem);
            });

            container.appendChild(categorySection);
        });

        this.updateTotalCost();
    }

    createAnalysisItem(analysis) {
        const item = document.createElement('div');
        item.className = `checklist-item ${analysis.recommended ? 'recommended' : ''}`;
        item.innerHTML = `
            <label class="checklist-label">
                <input type="checkbox" value="${analysis.id}" 
                    ${analysis.recommended ? 'checked' : ''}
                    data-price="${analysis.price}">
                <div class="analysis-info">
                    <div class="analysis-name clickable-indicator" data-analysis="${analysis.id}">
                        <span class="analysis-indicator indicator-normal"></span>
                        ${analysis.name}
                    </div>
                    <div class="analysis-description">${analysis.description}</div>
                    <div class="analysis-details">${analysis.details}</div>
                </div>
                <div class="analysis-price">${analysis.price} ₽</div>
            </label>
        `;

        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.selectedAnalyses.add(analysis.id);
            } else {
                this.selectedAnalyses.delete(analysis.id);
            }
            this.updateTotalCost();
        });

        // Добавляем обработчик для контекстного помощника
        const analysisName = item.querySelector('.analysis-name');
        analysisName.addEventListener('click', (e) => {
            if (e.target.classList.contains('clickable-indicator') || 
                e.target.classList.contains('analysis-indicator')) {
                this.contextHelper.showAnalysisInfo(analysis.id);
            }
        });

        if (analysis.recommended) {
            this.selectedAnalyses.add(analysis.id);
        }

        return item;
    }

    loadClinics() {
        const container = document.getElementById('clinics-list');
        container.innerHTML = '';

        novosibirskClinics.forEach(clinic => {
            const clinicCard = document.createElement('div');
            clinicCard.className = 'clinic-card';
            clinicCard.innerHTML = `
                <div class="clinic-header">
                    <div class="clinic-logo">${clinic.logo}</div>
                    <div class="clinic-info">
                        <h3 class="clinic-name">${clinic.name}</h3>
                        <div class="clinic-rating">
                            ⭐ ${clinic.rating} (${clinic.reviews} отзывов)
                        </div>
                    </div>
                    <label class="clinic-select">
                        <input type="radio" name="clinic" value="${clinic.id}">
                        <span class="radio-custom"></span>
                    </label>
                </div>
                <div class="clinic-details">
                    <div class="clinic-address">📍 ${clinic.address}</div>
                    <div class="clinic-phone">📞 ${clinic.phone}</div>
                    <div class="clinic-hours">🕒 ${clinic.workingHours}</div>
                    <div class="clinic-features">
                        ${clinic.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                    <div class="clinic-discount">🎁 ${clinic.discount}</div>
                    <div class="clinic-delivery">⏱️ Результаты: ${clinic.deliveryTime}</div>
                </div>
            `;

            const radio = clinicCard.querySelector('input[type="radio"]');
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectedClinic = clinic;
                    this.showNotification(`Выбрана клиника: ${clinic.name}`, 'success');
                }
            });

            container.appendChild(clinicCard);
        });
    }

    updateTotalCost() {
        let total = 0;
        
        document.querySelectorAll('#analyses-checklist input[type="checkbox"]:checked').forEach(checkbox => {
            total += parseInt(checkbox.dataset.price);
        });

        document.getElementById('total-cost').textContent = total.toLocaleString();
    }

    updateRecommendedAnalyses() {
        this.collectUserParams();
        
        // Снимаем все рекомендации
        document.querySelectorAll('.checklist-item').forEach(item => {
            item.classList.remove('recommended');
        });

        // Базовые рекомендации для всех
        this.markAsRecommended('blood_general');
        this.markAsRecommended('blood_bio');
        this.markAsRecommended('urine_general');
        this.markAsRecommended('vitamin_d');
        this.markAsRecommended('hba1c');
        this.markAsRecommended('cholesterol');

        const age = this.userParams.age;
        const gender = this.userParams.gender;
        const goals = this.userParams.goals;
        const riskFactors = this.userParams.riskFactors;

        // Рекомендации по возрасту
        if (age > 40) {
            this.markAsRecommended('ecg');
            this.markAsRecommended('ultrasound');
        }

        // Рекомендации по полу
        if (gender === 'female') {
            this.markAsRecommended('estradiol');
        } else if (gender === 'male') {
            this.markAsRecommended('testosterone');
        }

        // Рекомендации по целям
        if (goals.includes('hormones')) {
            this.markAsRecommended('tsh');
            this.markAsRecommended('cortisol');
        }

        if (goals.includes('vitamins')) {
            this.markAsRecommended('vitamin_b12');
            this.markAsRecommended('ferritin');
        }

        if (goals.includes('heart')) {
            this.markAsRecommended('ecg');
            this.markAsRecommended('crp');
        }

        // Рекомендации по факторам риска
        if (riskFactors.includes('smoking') || riskFactors.includes('family_history')) {
            this.markAsRecommended('crp');
            this.markAsRecommended('cholesterol');
        }

        if (riskFactors.includes('sedentary')) {
            this.markAsRecommended('ecg');
            this.markAsRecommended('hba1c');
        }

        if (riskFactors.includes('stress')) {
            this.markAsRecommended('cortisol');
        }

        this.showNotification(`Подобрано рекомендаций на основе ваших параметров`, 'success');
    }

    markAsRecommended(analysisId) {
        const item = document.querySelector(`.checklist-item input[value="${analysisId}"]`)?.closest('.checklist-item');
        if (item) {
            item.classList.add('recommended');
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) {
                checkbox.checked = true;
                this.selectedAnalyses.add(analysisId);
            }
        }
    }

    collectUserParams() {
        // Собираем выбранные факторы риска
        const riskFactors = [];
        document.querySelectorAll('input[name="risk_factors"]:checked').forEach(checkbox => {
            riskFactors.push(checkbox.value);
        });

        // Собираем выбранные цели
        const goals = [];
        document.querySelectorAll('input[name="goals"]:checked').forEach(checkbox => {
            goals.push(checkbox.value);
        });

        this.userParams = {
            gender: document.querySelector('input[name="gender"]:checked').value,
            age: parseInt(document.getElementById('age').value) || 30,
            height: parseInt(document.getElementById('height').value) || 170,
            weight: parseInt(document.getElementById('weight').value) || 70,
            riskFactors: riskFactors,
            goals: goals
        };
    }

    selectAllAnalyses() {
        document.querySelectorAll('#analyses-checklist input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
            this.selectedAnalyses.add(checkbox.value);
        });
        this.updateTotalCost();
        this.showNotification('Все анализы выбраны', 'success');
    }

    deselectAllAnalyses() {
        document.querySelectorAll('#analyses-checklist input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            this.selectedAnalyses.delete(checkbox.value);
        });
        this.updateTotalCost();
        this.showNotification('Все анализы сняты', 'info');
    }

    showFinalResults() {
        const totalCost = Array.from(document.querySelectorAll('#analyses-checklist input[type="checkbox"]:checked'))
            .reduce((sum, checkbox) => sum + parseInt(checkbox.dataset.price), 0);

        document.getElementById('selected-count').textContent = this.selectedAnalyses.size;
        document.getElementById('final-cost').textContent = totalCost.toLocaleString();
        document.getElementById('selected-clinic').textContent = this.selectedClinic ? this.selectedClinic.name : 'Не выбрана';

        this.showSelectedAnalysesList();
    }

    showSelectedAnalysesList() {
        const container = document.getElementById('final-analyses-list');
        container.innerHTML = '';

        Object.values(checkupAnalyses).flat().forEach(analysis => {
            if (this.selectedAnalyses.has(analysis.id)) {
                const item = document.createElement('div');
                item.className = 'analysis-item final-item';
                item.innerHTML = `
                    <div>
                        <h4>${analysis.name}</h4>
                        <p>${analysis.description}</p>
                    </div>
                    <div class="analysis-price-final">${analysis.price} ₽</div>
                `;
                container.appendChild(item);
            }
        });
    }

    startOver() {
        this.selectedAnalyses.clear();
        this.selectedClinic = null;
        this.userParams = {};
        
        // Сбрасываем все чекбоксы и радио-кнопки
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
        
        // Устанавливаем значения по умолчанию
        document.querySelector('input[name="gender"][value="male"]').checked = true;
        document.getElementById('age').value = 30;
        document.getElementById('height').value = 170;
        document.getElementById('weight').value = 70;
        document.querySelector('input[name="goals"][value="prevention"]').checked = true;
        
        this.goToStep('1');
        this.loadAnalysesChecklist();
        this.loadClinics();
        this.showNotification('Чек-лист сброшен. Вы можете начать заново.', 'info');
    }

    printPlan() {
        window.print();
        this.showNotification('Подготовка к печати...', 'info');
    }

    savePDF() {
        this.showNotification('Функция сохранения PDF будет доступна в ближайшее время', 'info');
    }

    getCategoryName(category) {
        const names = {
            basic: 'Базовые анализы',
            hormones: 'Гормональные исследования',
            vitamins: 'Витамины и микроэлементы',
            special: 'Специальные исследования'
        };
        return names[category] || category;
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
    new CheckupChecklist();
});
