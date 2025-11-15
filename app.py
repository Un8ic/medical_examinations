import os
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import sqlite3
from contextlib import closing

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-2024')

# Конфигурация базы данных
DATABASE = 'medical_examinations.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Инициализация базы данных с тестовыми данными"""
    with closing(get_db_connection()) as conn:
        # Таблица целей здоровья
        conn.execute('''
            CREATE TABLE IF NOT EXISTS health_goals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                icon TEXT
            )
        ''')
        
        # Таблица анализов
        conn.execute('''
            CREATE TABLE IF NOT EXISTS analyses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                goal_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                reason TEXT NOT NULL,
                FOREIGN KEY (goal_id) REFERENCES health_goals (id)
            )
        ''')
        
        # Проверяем, есть ли уже данные
        existing_goals = conn.execute('SELECT COUNT(*) AS count FROM health_goals').fetchone()['count']
        
        if existing_goals == 0:
            # Добавляем тестовые данные
            goals_data = [
                ('Беременность', 'Планирование и ведение беременности', 'pregnancy'),
                ('Спорт', 'Подготовка к активным физическим нагрузкам', 'sport'),
                ('Чекап', 'Комплексное обследование организма', 'checkup'),
                ('Гормональный фон', 'Оценка работы эндокринной системы', 'hormones'),
                ('Диагностика щитовидной железы', 'Обследование щитовидной железы', 'thyroid'),
                ('Профилактика сердечно-сосудистых заболеваний', 'Оценка рисков и состояния сердца', 'heart')
            ]
            
            analyses_data = [
                # Беременность
                (1, 'Клинический анализ крови', 'Оценка общего состояния здоровья, выявление анемии, воспалительных процессов'),
                (1, 'Глюкоза крови', 'Скрининг на гестационный диабет'),
                (1, 'ТТГ (тиреотропный гормон)', 'Проверка функции щитовидной железы, важной для развития плода'),
                (1, 'TORCH-комплекс', 'Выявление инфекций, опасных для плода'),
                
                # Спорт
                (2, 'Общий анализ крови', 'Оценка базовых показателей здоровья и переносимости нагрузок'),
                (2, 'Креатинин и мочевина', 'Оценка функции почек при тренировках'),
                (2, 'АЛТ, АСТ', 'Оценка функции печени'),
                (2, 'ЭКГ (электрокардиограмма)', 'Оценка работы сердца перед нагрузками'),
                
                # Чекап
                (3, 'Биохимический анализ крови', 'Комплексная оценка функции органов'),
                (3, 'Общий анализ мочи', 'Оценка состояния мочевыделительной системы'),
                (3, 'Холестерин общий и ЛПНП', 'Оценка риска сердечно-сосудистых заболеваний'),
                (3, 'Гликированный гемоглобин', 'Диагностика сахарного диабета'),
                
                # Гормональный фон
                (4, 'ТТГ, Т4 свободный', 'Оценка функции щитовидной железы'),
                (4, 'Кортизол', 'Оценка функции надпочечников'),
                (4, 'Пролактин', 'Диагностика нарушений репродуктивной функции'),
                (4, 'Тестостерон общий', 'Оценка андрогенного статуса'),
                
                # Щитовидная железа
                (5, 'ТТГ, Т3, Т4 свободный', 'Комплексная оценка функции щитовидной железы'),
                (5, 'Анти-ТПО', 'Выявление аутоиммунных заболеваний щитовидной железы'),
                (5, 'УЗИ щитовидной железы', 'Визуальная оценка структуры и размеров'),
                
                # Сердечно-сосудистая система
                (6, 'Липидный профиль', 'Оценка риска атеросклероза'),
                (6, 'Коагулограмма', 'Оценка свертываемости крови'),
                (6, 'ЭКГ', 'Оценка электрической активности сердца'),
                (6, 'Тропонин', 'Маркер повреждения сердечной мышцы')
            ]
            
            cursor = conn.cursor()
            cursor.executemany(
                'INSERT INTO health_goals (title, description, icon) VALUES (?, ?, ?)', 
                goals_data
            )
            cursor.executemany(
                'INSERT INTO analyses (goal_id, name, reason) VALUES (?, ?, ?)', 
                analyses_data
            )
            conn.commit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/enter_as_guest')
def enter_as_guest():
    flash('Добро пожаловать! Вы вошли как гость.', 'success')
    return redirect(url_for('goal_constructor'))

@app.route('/goal_constructor')
def goal_constructor():
    try:
        with closing(get_db_connection()) as conn:
            health_goals = conn.execute('SELECT * FROM health_goals').fetchall()
        return render_template('goal_constructor.html', health_goals=health_goals)
    except Exception as e:
        flash('Произошла ошибка при загрузке данных.', 'error')
        return render_template('goal_constructor.html', health_goals=[])

@app.route('/get_analyses/<int:goal_id>')
def get_analyses(goal_id):
    try:
        with closing(get_db_connection()) as conn:
            analyses = conn.execute(
                'SELECT name, reason FROM analyses WHERE goal_id = ? ORDER BY id', 
                (goal_id,)
            ).fetchall()
        
        analyses_list = [
            {'name': analysis['name'], 'reason': analysis['reason']} 
            for analysis in analyses
        ]
        
        return jsonify({'analyses': analyses_list})
    except Exception as e:
        return jsonify({'error': 'Ошибка загрузки данных'}), 500

@app.route('/login', methods=['POST'])
def login():
    flash('Извините, функция входа в настоящее время в разработке.', 'info')
    return redirect(url_for('index'))

@app.route('/register', methods=['POST'])
def register():
    flash('Извините, функция регистрации в настоящее время в разработке.', 'info')
    return redirect(url_for('index'))

@app.errorhandler(404)
def not_found(error):
    return render_template('index.html'), 404

if __name__ == '__main__':
    with app.app_context():
        init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
