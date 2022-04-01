import { ChangeEvent, FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/user-info-type';
import { isErrorInPassword } from '../../utils/utils-components';
import Header from '../general/header';


function Login (): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null> (null);
  const passwordRef = useRef<HTMLInputElement | null> (null);
  const dispatch = useDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (passwordRef.current !== null && loginRef.current !== null) {
      const isError = isErrorInPassword(passwordRef.current.value);

      if (isError) {
        passwordRef.current.setCustomValidity(isError);
      } else {
        passwordRef.current.setCustomValidity('');
      }

      passwordRef.current.reportValidity();
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (passwordRef.current !== null && loginRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header logo />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={loginRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#nowhere">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default Login;
