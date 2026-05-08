'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, clearError } from '@/store/slices/authSlice';
import styles from './signup.module.css';

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    dispatch(clearError());
    
    if (!email || !username || !password || !repeatPassword) {
      setLocalError('Заполните все поля');
      return;
    }
    
    if (password !== repeatPassword) {
      setLocalError('Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      setLocalError('Пароль должен быть не менее 6 символов');
      return;
    }
    
    try {
      await dispatch(registerUser({ email, password, username })).unwrap();
      router.push('/');
    } catch (err) {
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form} onSubmit={handleSubmit}>
            <div className={styles.modal__logo}>
              <Image 
                src="/img/logo_modal.png" 
                alt="logo" 
                width={140} 
                height={21}
                priority
              />
            </div>
            <input
              className={classNames(styles.modal__input, styles.login)}
              type="email"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <input
              className={styles.modal__input}
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            <input
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <input
              className={styles.modal__input}
              type="password"
              name="repeatPassword"
              placeholder="Повторите пароль"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              disabled={isLoading}
            />
            <div className={styles.errorContainer}>
              {(localError || error) && (
                <span>{localError || error}</span>
              )}
            </div>
            <button 
              type="submit" 
              className={styles.modal__btnSignupEnt}
              disabled={isLoading}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}