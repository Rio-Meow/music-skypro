'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import styles from './SignForm.module.css';

interface SignFormProps {
  type: 'signin' | 'signup';
}

export function SignForm({ type }: SignFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  
  const isSignin = type === 'signin';
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form}>
            <Link href="/music/main">
              <div className={styles.modal__logo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            
            <input
              className={cn(styles.modal__input, { [styles.login]: isSignin })}
              type="text"
              name="login"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {!isSignin && (
              <input
                className={styles.modal__input}
                type="password"
                name="repeatPassword"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            )}
            
            <div className={styles.errorContainer}></div>
            
            <button 
              type="submit" 
              className={isSignin ? styles.modal__btnEnter : styles.modal__btnSignupEnt}
            >
              {isSignin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            
            {isSignin && (
              <Link href="/signup" className={styles.modal__btnSignup}>
                Зарегистрироваться
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}