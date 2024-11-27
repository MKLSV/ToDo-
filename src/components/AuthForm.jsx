import React, { useState } from 'react';
import { login, signup } from '../store/user/user.action';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true); // Определяет, отображать ли форму логина или регистрации
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '', // Только для регистрации
    });
    const [msg, setMsg] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (isLogin) {
            try {
                await login({ username: formData.username, password: formData.password });
                console.log('Login successful!');
            } catch (err) {
                setMsg(err.message || 'Ошибка при попытке входа');
                console.error('Login failed:', err.message);
            }

        } else {
            // Логика регистрации
            if (formData.password !== formData.confirmPassword) {
                setMsg('Пароли не совпадают!');
                return;
            }
            signup({ username: formData.username, password: formData.password })
            console.log('Registration data:', { username: formData.username, password: formData.password });
        }
    };

    return (
        <div className="auth-form">
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="username">Имя</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                )}
                {msg ? <span>{msg}</span> : ''}
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
            </form>
            <p>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="toggle-button"
                >
                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </button>
            </p>
        </div>
    );
}
