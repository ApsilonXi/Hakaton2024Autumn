
import './App.css';
function search() {
  alert("searching...");
}
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>
          Анализатор карточек товаров
        </h1>
        <p>
          Введите название товара или группы товаров
        </p>

        <div className='container'>
          <input name="Поиск товара"/>
          <button onClick={search}>Поиск</button>
        </div>

        <div className = 'result'>
          <div class="card">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHCmBls2L6dPXG8Zg7BfDaN9MncI73vOt4A&s' alt=''></img>
              <div class="card_content">
                  <h2 className='name'>Товар</h2>
                  <p className='seller'>Продавец</p>
                  <p className='description'>Описание</p>
                  <p class="price">Цена</p>
              </div>
          </div>

          
        </div>
        
      </header>
    </div>
  );
}

export default App;
