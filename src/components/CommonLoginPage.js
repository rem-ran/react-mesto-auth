import { useState } from "react";

//общий компонент для регистрации и авторизации
function CommonLoginPage({ children, heading, btnTxt, handleSubmit }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  //метод обработки кнопки подтверждения
  const onSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleSubmit(formValue);
    setFormValue({ password: "", email: "" });
  };

  return (
    <div className="login login__container">
      <h2 className="login__heading">{heading}</h2>
      <form onSubmit={onSubmit} className="login__form">
        <input
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          className="login__input"
          placeholder="Email"
        />
        <input
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          className="login__input"
          placeholder="Пароль"
        />
        <button className="login__submit-btn">{btnTxt}</button>
      </form>
      {children}
    </div>
  );
}

export default CommonLoginPage;
