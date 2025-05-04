import React from 'react'
import styles from './AccountPopup.module.scss';
import axios from 'axios';
import { loginFunc, registerFunc } from '../../services/api';
import { useSelector } from 'react-redux';

const closeSvg = (<svg
  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
</svg>)

const AccountPopup = ({ userStatus, setUserStatus }) => {

  const [type, setType] = React.useState('login');
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [message, setMessage] = React.useState("");

  const currLang = useSelector(({ localiz }) => localiz.language);


  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (await loginFunc(email, password)) {
      setUserStatus('authed')

    }
    else {
      setUserStatus('authing');
    }
  }

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    console.log(email, password, name, surname, phone)
    if (await registerFunc(email, password, name, surname, phone)) {
      setUserStatus('authing')
      alert('Ви успішно зареєструвалися!\nУвійдіть у ваш аккаунт!')
    }
    else {
      setUserStatus('authing');
      alert('Виникла помилка!')
    }
  };





  return (
    <div className={userStatus === 'authing' ?
      styles.popupEnabled : styles.popupDisabled}>
      {type === 'login' ?
        //login form
        <form onSubmit={handleSubmitLogin} className={styles.form}>
          <div className={styles.formTop}>
            <h2 className={styles.formTitle}>{currLang == 'UA' ? 'Увійдіть до вашого аккаунту' : 'Login to your account'}</h2>
            <span
              className='cursor-pointer'
              onClick={() => { setUserStatus('auth') }}>
              {closeSvg}
            </span>
          </div>
          <div className={styles.formBody}>
            <label className={styles.formLabel} htmlFor="email">E-mail</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder={currLang == 'UA' ? 'Введіть e-mail' : 'Enter e-mail'}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <label className={styles.formLabel} htmlFor="password">{currLang == 'UA' ? 'Пароль' : 'Password'}</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder={currLang == 'UA' ? 'Введіть пароль' : 'Enter Password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            <button className={styles.submitBtn} type="submit">{currLang == 'UA' ? 'Увійти' : 'Login'}</button>
            {message && <p>{message}</p>}
          </div>
          <div className='text-sm'>
            <span>{currLang == 'UA' ? 'Немає аккаунту?' : 'Don\'t have an account?'} </span>
            <span className='text-green1 cursor-pointer'
              onClick={() => setType('registration')}
            >{currLang == 'UA' ? 'Зареєструватися' : 'Register here'}</span>
          </div>


        </form> :
        //registration form
        <form onSubmit={handleSubmitRegistration} className={styles.form}>
          <div className={styles.formTop}>
            <h2 className={styles.formTitle}>{currLang == 'UA' ? 'Реєстрація' : 'Register an account'}</h2>
            <span
              className='cursor-pointer'
              onClick={() => setUserStatus('')}>
              {closeSvg}
            </span>
          </div>
          <div className={styles.formBody}>
            <label className={styles.formLabel} htmlFor="name">{currLang == 'UA' ? 'Ім\'я' : 'Name'}</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder={currLang == 'UA' ? 'Введіть ім\'я' : 'Enter your name'}
              name="login"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />
            <label className={styles.formLabel} htmlFor="surname">{currLang == 'UA' ? 'Прізвище' : 'Surname'}</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder={currLang == 'UA' ? 'Введіть прізвище' : 'Enter your surname'}
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required />
            <label className={styles.formLabel} htmlFor="e-mail">E-mail</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder={currLang == 'UA' ? 'Введіть e-mail' : 'Enter your e-mail'}
              name="login"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required />
            <label className={styles.formLabel} htmlFor="phone">{currLang == 'UA' ? 'Телефон' : 'Phone'}</label>
            <input
              className={styles.formInput}
              type="phone"
              placeholder={currLang == 'UA' ? 'Введіть телефон' : 'Enter your phone'}
              name="login"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required />
            <label className={styles.formLabel} htmlFor="password">{currLang == 'UA' ? 'Пароль' : 'Password'}</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder={currLang == 'UA' ? 'Введіть пароль' : 'Create a password'}
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required />
            <button className={styles.submitBtn} type="submit">{currLang == 'UA' ? 'Зареєструватися' : 'Register'}</button>
          </div>
          <div className={styles.textSm}>
            <span>{currLang == 'UA' ? 'Вже є аккаунт?' : 'Already have an account?'} </span>
            <span className='text-green1 cursor-pointer'
              onClick={() => setType('login')}
            >{currLang == 'UA' ? 'Увійти' : 'Login here'}</span>
          </div>


        </form>
      }
    </div>
  )
}

export default AccountPopup;