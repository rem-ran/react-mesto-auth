//импортируем картинку лого
import headerLogoPath from "../images/header-logo.svg";

//компонент хедера
function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogoPath}
        alt="логотип Mesto Russia белого цвета"
      />
      <a className="header__link">Text</a>
    </header>
  );
}

export default Header;
