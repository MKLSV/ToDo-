import React, { useState } from 'react';
import { login, signup } from '../store/user/user.action';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [msg, setMsg] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    };

    async function handleSubmit(e) {
        e.preventDefault()
        if (isLogin) {
            try {
                await login({ username: formData.username, password: formData.password })
                console.log('Login successful!')
            } catch (err) {
                setMsg(err.message || 'Ошибка при попытке входа')
                console.error('Login failed:', err.message)
            }

        } else {
            if (formData.password !== formData.confirmPassword) {
                setMsg('Пароли не совпадают')
                return
            }
            signup({ username: formData.username, password: formData.password })
        }
    };

    function modalSwitch(){
        setMsg('')
        setIsLogin(!isLogin)
    }

    return (
        <div className="auth">
            <div className="auth-form">
                <span className='title'>{isLogin ? 'Вход' : 'Регистрация'}</span>
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
                    {msg ? <span className='msg'>{msg}</span> : ''}
                    <button type="submit" className='submit-btn' >{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                </form>
                <p className='toggle-section'>
                    {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                    <span
                        type="button"
                        onClick={() => modalSwitch()}
                        className="toggle-button"
                    >
                        {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </span>
                </p>
            </div>
        </div>
    );
}