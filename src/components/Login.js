import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommonLoginPage from "./CommonLoginPage";
import Header from "./Header";
import * as Auth from "./Auth";

function Login({ setLoggedIn }) {
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
    Auth.authorize(password, email).then((res) => {
      setFormValue({ password: "", email: "" });
      setLoggedIn(true);
      navigate("/", { replace: true });
    });
  };
  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <div className="login login__container">
        <h2 className="login__heading">Login</h2>
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
          <button className="login__submit-btn">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
