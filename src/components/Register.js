function Register() {
  return (
    <div className="login login__container">
      <h2 className="login__heading">Регистарция</h2>
      <form className="login__form">
        <input className="login__input" placeholder="Email" />
        <input className="login__input" placeholder="Пароль" />
        <button className="login__submit-btn">Зарегистрироваться</button>
      </form>
      <a className="login__link">Уже зарегистрировались? Войти</a>
    </div>
  );
}

export default Register;
