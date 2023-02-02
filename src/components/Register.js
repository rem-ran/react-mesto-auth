import { useState } from "react";
import { Link } from "react-router-dom";
import CommonLoginPage from "./CommonLoginPage";
import Header from "./Header";

function Register({ handleUserSignUp }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserSignUp(formValue);
  };
  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Header>
      <div className="login login__container">
        <h2 className="login__heading">Registration</h2>
        <form onSubmit={handleSubmit} className="login__form">
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
          <button className="login__submit-btn">Register</button>
        </form>
        <Link to="/sign-in" className="login__link">
          Уже зарегистрировались? Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
