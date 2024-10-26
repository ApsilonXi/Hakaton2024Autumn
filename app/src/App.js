import './App.css';
import { useState } from 'react';
/*const fs = require('fs');

// Чтение JSON из файла
fs.readFile('product.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }
    // Преобразование строки в объект JavaScript
    const jsonData = JSON.parse(data);
    console.log(jsonData);
});*/

//result - контейнер с карточками
//поле ввода - classname: user_input
function App() {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const search = () => {
    const userInput = document.querySelector(".user_input").value; //получение ссылки введеной пользователем
    const urlPattern = /^https:\/\/www\.wildberries\.ru\/catalog\/\d{5,}\/detail\.aspx$/;
    if (urlPattern.test(userInput.trim())) {
      setIsValid(true);
      setError("");
    } else {
      setIsValid(false);
      setError("Ошибка! Неправильная ссылка на товар");
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
          <div className='result'>
            <div className="card">
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8P-gj3fDnuzzXlONNF4i4oiWB29JhpXhVwA&s' alt='' />
              <div className="card_content">
                <h2 className="price">20 000 &#8381;</h2>
                <h3 className="name">Название товара</h3>
                <p className='description'>Описание</p>
              </div>
              <a href="/" className='item_link'>К товару</a>
            </div>
          </div>
        ) : (

          <div className='error_message'>{error}</div>
          
        )}
      </header>
    </div>
  );
}

export default App;
