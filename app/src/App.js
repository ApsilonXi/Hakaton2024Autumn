import React, { useState, useEffect, useRef } from "react";
import './App.css';

function App() {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState(null);
  const [userLink, setUserLink] = useState("");
  const [previousLinks, setPreviousLinks] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Состояние для видимости выпадающего списка
  const inputRef = useRef(null); // Ссылка на поле ввода

  // Загрузка предыдущих ссылок из localStorage при монтировании компонента
  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("previousLinks")) || [];
    setPreviousLinks(savedLinks);

    // Обработчик для скрытия выпадающего списка при клике вне поля ввода
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Функция для проверки ссылки и получения данных
  const search = () => {
    const userInput = document.querySelector(".user_input").value.trim(); // Получение ссылки введённой пользователем
    const urlPattern = /^https:\/\/www\.wildberries\.ru\/catalog\/\d{5,}\/detail\.aspx$/;

    if (urlPattern.test(userInput)) {
      setIsValid(true);
      setError("");
      setUserLink(userInput);
      saveLinkToLocalStorage(userInput);  // Сохраняем ссылку в localStorage
      sendLinkToPython(userInput);
    } else {
      setIsValid(false);
      setError("Ошибка! Неправильная ссылка на товар");
    }
  };

  // Сохранение уникальной ссылки в localStorage
  const saveLinkToLocalStorage = (link) => {
    let savedLinks = JSON.parse(localStorage.getItem("previousLinks")) || [];
    
    if (!savedLinks.includes(link)) {
      savedLinks.push(link);
      localStorage.setItem("previousLinks", JSON.stringify(savedLinks));
      setPreviousLinks(savedLinks); // Обновляем состояние для выпадающего списка
    }
  };

  // Отправка ссылки на сервер Python и обработка результата
  const sendLinkToPython = async (link) => {
    try {
      const response = await fetch("http://localhost:5000/process-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: link }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке ссылки");
      }

      const result = await response.json();
      console.log("Полученные данные:", result); // Проверяем структуру данных
      setProducts(result); // Устанавливаем данные для продуктов
    } catch (error) {
      console.error("Error:", error);
      setError("Ошибка при получении данных о товаре");
    }
  };

  // Обработчик выбора ссылки из выпадающего списка
  const handleSelectLink = (link) => {
    setUserLink(link);
    document.querySelector(".user_input").value = link;  // Устанавливаем значение в input
    setIsDropdownVisible(false); // Закрываем выпадающий список после выбора
  };

  // Обработчик удаления ссылки
  const handleDeleteLink = (linkToDelete) => {
    const updatedLinks = previousLinks.filter(link => link !== linkToDelete);
    setPreviousLinks(updatedLinks); // Обновляем состояние
    localStorage.setItem("previousLinks", JSON.stringify(updatedLinks)); // Обновляем localStorage
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Анализатор карточек товаров</h1>

        <div className='container'>
          <div ref={inputRef} className="input-container">
            <input
              type="text"
              className="user_input"
              placeholder="Введите ссылку на товар"
              onClick={() => setIsDropdownVisible(true)} // Показываем список при клике на поле ввода
              defaultValue={userLink}
            />
            {isDropdownVisible && previousLinks.length > 0 && (
              <div className="dropdown">
                {previousLinks.map((link, index) => (
                  <div key={index} className="dropdown-item">
                    <span onClick={() => handleSelectLink(link)}>{link}</span>
                    <button className="delete-btn" onClick={() => handleDeleteLink(link)}>Удалить</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <img className='s_icon'
            src='/search.svg'
            alt='s'
            onClick={search}
            onMouseOver={(e) => (e.currentTarget.src = "/search_h.svg")}
            onMouseOut={(e) => (e.currentTarget.src = "/search.svg")}
          />
        </div>

        {isValid && !error && (
          <>
            {products ? (
              <div className="result">

                <div className="card">
                  <img src={products.original.image} alt="Product Image" />
                  <div className="card_content">
                    <h2 className="price">{products.original.price} &#8381;</h2>
                    <h3 className="name">{products.original.name}</h3>
                  </div>
                  <a href={products.original.link} className="item_link" target="_blank" rel="noopener noreferrer">
                    К товару
                  </a>
                </div>


                {products.related && products.related.length > 0 ? (
                  products.related.map((product, index) => (
                    <div key={index} className="card">
                      <img src={product.image} alt="Product Image" />
                      <div className="card_content">
                        <h2 className="price">{product.price} &#8381;</h2>
                        <h3 className="name">{product.name}</h3>
                      </div>
                      <a href={product.link} className="item_link" target="_blank" rel="noopener noreferrer">
                        К товару
                      </a>
                    </div>
                  ))
                ) : (
                  <p>Нет похожих товаров</p>
                )}
              </div>
            ) : (
              <p>Загрузка...</p>
            )}
          </>
        )}

        {error && <div className="error_message">{error}</div>}
      </header>
    </div>
  );
}

export default App;
