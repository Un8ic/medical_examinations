/* Стили для контекстного помощника */
.context-helper-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
}

.context-helper-content {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.context-helper-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px 12px 0 0;
}

.context-helper-header h3 {
    margin: 0;
    color: white;
}

.context-helper-close {
    background: none;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.context-helper-body {
    padding: 20px;
}

.analysis-description {
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
}

.indicators-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.indicator-compact {
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.indicator-compact:hover {
    border-color: var(--primary-color);
    background: #f8f9fa;
}

.indicator-compact h5 {
    margin: 0 0 8px 0;
    color: var(--text-dark);
}

.indicator-compact p {
    margin: 0 0 10px 0;
    color: var(--text-light);
}

.btn-details {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
}

.btn-details:hover {
    background: var(--primary-dark);
}

.indicator-details {
    margin-bottom: 20px;
}

.indicator-details h4 {
    color: var(--text-dark);
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 2px solid #f0f0f0;
}

.deviation-section {
    margin: 15px 0;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}

.deviation-section h5 {
    color: var(--primary-color);
    margin: 0 0 10px 0;
    font-size: 1rem;
}

.deviation-section ul {
    margin: 8px 0;
    padding-left: 20px;
}

.deviation-section li {
    margin-bottom: 5px;
    color: var(--text-light);
    line-height: 1.4;
}

/* Стили для кликабельных элементов анализов */
.analysis-clickable {
    cursor: help;
    border-bottom: 1px dashed var(--primary-color);
    transition: all 0.3s ease;
}

.analysis-clickable:hover {
    background: rgba(74, 144, 226, 0.1);
    border-bottom-color: var(--primary-dark);
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
    .context-helper-content {
        width: 95%;
        margin: 20px;
    }
    
    .context-helper-body {
        padding: 15px;
    }
    
    .deviation-section {
        padding: 10px;
    }
}