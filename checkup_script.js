// Основная логика чек-листа
class CheckupChecklist {
    constructor() {
        this.selectedAnalyses = new Set();
        this.selectedClinic = null;
        this.userParams = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAnalysesChecklist();
        this.loadClinics();
        this.updateProgress();
    }

    setupEventListeners() {
        // Навигация по шагам
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

        // Выбор всех анализов
        document.getElementById('select-all').addEventListener('click', () => {
            this.selectAllAnalyses();
        });

        document.getElementById('deselect-all').addEventListener('click', () => {
            this.deselectAllAnalyses();
        });

        // Перезапуск
        document.getElementById('start-over').addEventListener('click', () => {
            this.startOver();
        });

        // Печать
        document.getElementById('print-plan').addEventListener('click', () => {
            this.printPlan();
        });
    }

    goToStep(stepNumber) {
        // Скрываем все шаги
        document.querySelectorAll('.step-content').forEach(step => {
            step.classList.remove('active');
        });

        // Показываем нужный шаг
        document.getElementById(`step-${stepNumber}`).classList.add('active');

        // Обновляем прогресс
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) <= stepNumber) {
                step.classList.add('active');
            }
        });

        // Обновляем данные на шагах
        if (stepNumber === '2') {
            this.updateRecommendedAnalyses();
        } else if (stepNumber === '4') {
            this.showFinalResults();
        }
    }

    loadAnalysesChecklist() {
        const container = document.getElementById('analyses-checklist');
        container.innerHTML = '';

        Object.entries(window.checkupAnalyses).forEach(([category, analyses]) => {
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
                <span class="checkmark"></span>
                <div class="analysis-info">
                    <div class="analysis-name">${analysis.name}</div>
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

        // Добавляем в выбранные, если рекомендован
        if (analysis.recommended) {
            this.selectedAnalyses.add(analysis.id);
        }

        return item;
    }

    loadClinics() {
        const container = document.getElementById('clinics-list');
        container.innerHTML = '';

        window.novosibirskClinics.forEach(clinic => {
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
        // Здесь можно добавить логику рекомендаций на основе параметров пользователя
        this.collectUserParams();
    }

    collectUserParams() {
        this.userParams = {
            gender: document.querySelector('input[name="gender"]:checked').value,
            age: parseInt(document.getElementById('age').value),
            height: parseInt(document.getElementById('height').value),
            weight: parseInt(document.getElementById('weight').value),
            riskFactors: Array.from(document.querySelectorAll('input[name="risk_factors"]:checked')).map(cb => cb.value),
            goals: Array.from(document.querySelectorAll('input[name="goals"]:checked')).map(cb => cb.value)
        };
    }

    selectAllAnalyses() {
        document.querySelectorAll('#analyses-checklist input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
            this.selectedAnalyses.add(checkbox.value);
        });
        this.updateTotalCost();
    }

    deselectAllAnalyses() {
        document.querySelectorAll('#analyses-checklist input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            this.selectedAnalyses.delete(checkbox.value);
        });
        this.updateTotalCost();
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

        Object.values(window.checkupAnalyses).flat().forEach(analysis => {
            if (this.selectedAnalyses.has(analysis.id)) {
                const item = document.createElement('div');
                item.className = 'analysis-item final-item';
                item.innerHTML = `
                    <h4>${analysis.name}</h4>
                    <p>${analysis.description}</p>
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
        
        // Сброс форм
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
        document.querySelector('input[name="gender"][value="male"]').checked = true;
        
        this.goToStep('1');
        this.loadAnalysesChecklist();
        this.loadClinics();
    }

    printPlan() {
        window.print();
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

    updateProgress() {
        // Можно добавить дополнительную логику обновления прогресса
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new CheckupChecklist();
});