import './App.css';
import { useState } from 'react';


function App() {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  // Function to validate the URL entered by the user and fetch JSON if valid
  const search = () => {
    const userInput = document.querySelector(".user_input").value;
    const urlPattern = /^https:\/\/www\.wildberries\.ru\/catalog\/\d{5,}\/detail\.aspx$/;

    if (urlPattern.test(userInput.trim())) {
      setIsValid(true);
      setError("");
      // Fetch the JSON data only if the URL is valid
      fetch('/products.json') // Adjust the path as necessary
        .then((response) => {
          if (!response.ok) {
            // Handle fetch errors due to missing or inaccessible JSON file
            throw new Error('Failed to fetch JSON data');
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          // Display error message for failed JSON fetch
          setError("Ошибка при загрузке данных о товарах. Возможно, файл отсутствует или недоступен.");
          console.error(err);
        });
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
          products.length > 0 ? (
            <div className='result'>
              {products.map((product, index) => (
                <div key={index} className="card">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8P-gj3fDnuzzXlONNF4i4oiWB29JhpXhVwA&s" alt="" />
                  <div className="card_content">
                    <h2 className="price">{product.price}</h2>
                    <h3 className="name">{product.name}</h3>
                    <p className="description">{product.description}</p>
                    <a href={product.href} className="item_link" target="_blank" rel="noopener noreferrer">К товару</a>
                  </div>
                  
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


