import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// импортируем контекст пользователя
import { CurrentUserContext } from "../context/CurrentUserContext";

// импортируем компоненты
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import * as auth from "../utils/auth";

function App() {
  //переменная состояния попапа обновления данных пользователя
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  //переменная состояния попапа обновления аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  //переменная состояния попапа добавления новой карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  //переменная состояния попапа подтверждения
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);

  //переменные состояния попапа с увеличенной картинки карточки
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  //переменная состояния информации пользователя
  const [currentUser, setCurrentUser] = useState({});

  //переменная состояния начального массива карточек
  const [cards, setCards] = useState([]);

  //переменная состояния карточки для удаления
  const [cardToDelete, setCardToDelete] = useState({});

  //переменная состояния открытого модального окна
  const [isLoading, setIsLoading] = useState(false);

  //переменная состояния авторизации пользователя
  const [loggedIn, setLoggedIn] = useState(false);

  //переменная состояния данных пользователя, полученных при авторизации пользователя
  const [userData, setUserData] = useState({});

  //переменные состояния попапа с подсказкой
  const [isOkTooltipOpen, setIsOkTooltipOpen] = useState(false);
  const [isNotOkTooltipOpen, setIsNotOkTooltipOpen] = useState(false);

  const navigate = useNavigate();

  //отправляем запрос на сервер и рендерим данные о пользователе
  useEffect(() => {
    if (loggedIn) {
      api
        .getServerUserInfo()

        .then((userData) => {
          setCurrentUser(userData);
        })

        .catch((error) => {
          console.log(
            `Ошибка при начальной загрузки информации пользователя с сервера: ${error}`
          );
        });
    }
  }, [loggedIn]);

  //метод обработки открытия попапа обновления данных пользователя
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //метод обработки открытия попапа обновления аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //метод обработки открытия попапа добавления новой карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //метод обработки открытия попапа с увеличенной картинки
  const handleCardClick = (initialData) => {
    setIsCardOpen(true);
    setSelectedCard(initialData);
  };

  //метод обработки открытия попапа с подтверждением удаления карточки
  function handleConfirmDeleteCardPopup(cardId) {
    setIsConfirmationPopupOpen(true);
    setCardToDelete(cardId);
  }

  //метод обработки закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsCardOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsOkTooltipOpen(false);
    setIsNotOkTooltipOpen(false);
  };

  //отправляем запроса к API для рендеринга начального списка карточек при загрузке страницы
  useEffect(() => {
    if (loggedIn) {
      api
        .getAllCards()

        .then((cards) => {
          setCards(cards);
        })

        .catch((error) => {
          console.log(
            `Ошибка при начальной загрузки карточек с сервера: ${error}`
          );
        });
    }
  }, [loggedIn]);

  //метод запроса к API для добавления и снятия лайка с карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)

        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })

        .catch((error) => {
          console.log(`Ошибка при добавлении лайка: ${error}`);
        });
    } else {
      api
        .removeLike(card._id)

        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })

        .catch((error) => {
          console.log(`Ошибка при снятии лайка: ${error}`);
        });
    }
  }

  //метод запроса к API для удаления карточки
  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)

      .then(() => {
        setCards((state) => state.filter((c) => c._id != card._id));
      })

      .then(() => closeAllPopups())

      .catch((error) => {
        console.log(`Ошибка при удалении карточки: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //метод запроса к API для обновления информации пользователя
  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .updateServerUserInfo(userInfo)

      .then((res) => {
        setCurrentUser(res);
      })

      .then(() => closeAllPopups())

      .catch((error) => {
        console.log(`Ошибка при обновлении данных пользователя: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //метод запроса к API для обновления аватарки пользователя
  function handleUpdateAvatar(userAvatar) {
    setIsLoading(true);
    api
      .updateServerUserAvatar(userAvatar)

      .then((res) => setCurrentUser(res))

      .then(() => closeAllPopups())

      .catch((error) => {
        console.log(`Ошибка при обновлении аватара: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //метод запроса к API для добавления новой карточки
  function handleAddPlace({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })

      .then((newCard) => {
        setCards([newCard, ...cards]);
      })

      .then(() => closeAllPopups())

      .catch((error) => {
        console.log(`Ошибка при добавлении карточки: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //метод обработки авторизации пользоваетля на странице
  function handleUserSignIn({ password, email }) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserData({ email: email });
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })

      .catch((error) => {
        setIsNotOkTooltipOpen(true);
        console.log(`Error with login: ${error}`);
      });
  }

  //метод обработки регистрации пользоваетля на странице
  function handleUserSignUp({ password, email }) {
    auth
      .register(password, email)
      .then((res) => {
        setIsOkTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        setIsNotOkTooltipOpen(true);
        console.log(`Error with registration: ${error}`);
      });
  }

  //метод проверки токенов авторизированных пользователей, вернувшихся в приложение
  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      auth.getContent(token).then((res) => {
        if (res) {
          const userData = {
            email: res.data.email,
          };
          setLoggedIn(true);
          setUserData(userData);
          navigate("/", { replace: true });
        }
      });
    }
  }

  //метод выхода пользоваетля из системы
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
  };

  //вызываем метод проверки токенов при рендеринге главной страницы
  useEffect(() => {
    handleTokenCheck();
  }, []);

  console.log(loggedIn);
  return (
    <div
      className={`page__content ${!loggedIn ? "page__content_type_login" : ""}`}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/mesto-react-auth" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="/mesto-react-auth"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmDeleteCardPopup}
                  cards={cards}
                  userData={userData}
                  handleSignOut={handleSignOut}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleUserSignIn={handleUserSignIn} />}
          />
          <Route
            path="/sign-up"
            element={<Register handleUserSignUp={handleUserSignUp} />}
          />
        </Routes>
        {/* попап обновления данных пользователя */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        {/* попап добавления новой карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        {/* попап обновления аватарки пользователя */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        {/* попап с подтверждением удаления карточки */}
        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          cardToDelete={cardToDelete}
          isLoading={isLoading}
        />
        {/* попап увеличенной картинки карточки */}
        <ImagePopup
          card={selectedCard}
          isOpen={isCardOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOk={isOkTooltipOpen}
          isNotOk={isNotOkTooltipOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
