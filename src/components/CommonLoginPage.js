import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "./Auth";

function CommonLoginPage({ children, heading, btnTxt }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    Auth.register(password, email).then((res) => {
      navigate("/sign-in", { replace: true });
    });
  };

  return (
    <div className="login login__container">
      <h2 className="login__heading">{heading}</h2>
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
        <button className="login__submit-btn">{btnTxt}</button>
      </form>
      {children}
    </div>
  );
}

export default CommonLoginPage;
