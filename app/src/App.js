import React, { useState } from "react";
import './App.css';

function App() {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [userLink, setUserLink] = useState("");

  // Функция для проверки ссылки и получения данных
  const search = () => {
    const userInput = document.querySelector(".user_input").value; // Получение ссылки введённой пользователем
    const urlPattern = /^https:\/\/www\.wildberries\.ru\/catalog\/\d{5,}\/detail\.aspx$/;

    if (urlPattern.test(userInput.trim())) {
      setIsValid(true);
      setError("");
      setUserLink(userInput);
      sendLinkToPython(userInput);
    } else {
      setIsValid(false);
      setError("Ошибка! Неправильная ссылка на товар");
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
        throw new Error('Ошибка при отправке ссылки');
      }

      const result = await response.json();
      setProducts([result]); // Добавляем полученный продукт в массив products
    } catch (error) {
      console.error("Error:", error);
      setError("Ошибка при получении данных о товаре");
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Анализатор карточек товаров</h1>

        <div className='container'>
          <input type="text" className="user_input" placeholder="Введите ссылку на товар" />
          <img className='s_icon'
            src='/search.svg'
            alt='s'
            onClick={search}
            onMouseOver={e => (e.currentTarget.src = '/search_h.svg')}
            onMouseOut={e => (e.currentTarget.src = '/search.svg')}
          />
        </div>

        {isValid ? (
          products.length > 0 ? (
            <div className='result'>
              {products.map((product, index) => (
                <div key={index} className="card">
                  <img src={product.image} alt="" />
                  <div className="card_content">
                    <h2 className="price">{product.price} &#8381;</h2>
                    <h3 className="name">{product.name}</h3>
                    <p className="description">{product.description}</p>
                  </div>
                  <a href={userLink} className="item_link" target="_blank" rel="noopener noreferrer">
                    К товару
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className='error_message'>{error}</div>
          )
        ) : (
          <div className='error_message'>{error}</div>
        )}
      </header>
    </div>
  );
}

export default App;




