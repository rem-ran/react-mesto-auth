function CommonLoginPage({ children, heading, btnTxt }) {
  return (
    <div className="login login__container">
      <h2 className="login__heading">{heading}</h2>
      <form className="login__form">
        <input className="login__input" placeholder="Email" />
        <input className="login__input" placeholder="Пароль" />
        <button className="login__submit-btn">{btnTxt}</button>
      </form>
      {children}
    </div>
  );
}

export default CommonLoginPage;
