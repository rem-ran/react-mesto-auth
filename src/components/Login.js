import { Link } from "react-router-dom";
import CommonLoginPage from "./CommonLoginPage";
import Header from "./Header";

function Login({ handleUserSignIn }) {
  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <CommonLoginPage
        handleSubmit={handleUserSignIn}
        heading={"Вход"}
        btnTxt={"Войти"}
      ></CommonLoginPage>
    </>
  );
}

export default Login;
