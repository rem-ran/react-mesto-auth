import { useEffect } from "react";

import okPic from "../images/check-mark.svg";
import notOkPic from "../images/cross-mark.svg";

function InfoTooltip({ isOk, isNotOk, onClose }) {
  //вешаем слушатель на зактрые модального окна по нажатию ESC клавиши
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  //метод закрытия модального окна по клику вне модального окна
  const handleOutsideClickClose = (e) => {
    if (e.target.classList.contains("popup_opened")) {
      onClose();
    }
  };

  return (
    <section
      className={`popup popup_type_info ${isNotOk ? "popup_opened" : ""} ${
        isOk ? "popup_opened" : ""
      } `}
      onClick={handleOutsideClickClose}
    >
      <div className="popup__container popup__container_info">
        <img
          className="popup__status-img"
          src={isOk ? okPic : notOkPic}
          alt={
            isOk
              ? "black check mark icon in a circle"
              : "red cross icon in a circle"
          }
        />
        <h2 className={`popup__heading popup__heading_type_info`}>
          {isOk
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попрубуйте еще раз."}
        </h2>

        {/* кнопка закрытия попапа */}
        <button
          className="popup__close-btn popup__close-btn_type_info"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
