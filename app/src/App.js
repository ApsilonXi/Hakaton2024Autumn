
import './App.css';

//функция вызывающаяся при нажатии кнопки
function search() {
  alert("searching...");
}

//result - контейнер с карточками, в css файле атрибут visibility: visible/hidden чтобы открывать/скрывать все карточки
//поле ввода - classname: user_input
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>
          Анализатор карточек товаров
        </h1>

        <div className='container'>
          <input type="text" className ="user_input" placeholder="Введите ссылку на товар" /> 
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
          <div class="card">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHCmBls2L6dPXG8Zg7BfDaN9MncI73vOt4A&s' alt=''></img>
              <div class="card_content">
                  <h2 className='name'>Товар</h2>
                  <p className='seller'>Продавец</p>
                  <p className='description'>Описание</p>
                  <p class="price">Цена</p>
              </div>
          </div>
          <div class="card">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHCmBls2L6dPXG8Zg7BfDaN9MncI73vOt4A&s' alt=''></img>
              <div class="card_content">
                  <h2 className='name'>Товар</h2>
                  <p className='seller'>Продавец</p>
                  <p className='description'>Описание</p>
                  <p class="price">Цена</p>
              </div>
          </div>
          <div class="card">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHCmBls2L6dPXG8Zg7BfDaN9MncI73vOt4A&s' alt=''></img>
              <div class="card_content">
                  <h2 className='name'>Товар</h2>
                  <p className='seller'>Продавец</p>
                  <p className='description'>Описание</p>
                  <p class="price">Цена</p>
              </div>
          </div>
          <div class="card">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHCmBls2L6dPXG8Zg7BfDaN9MncI73vOt4A&s' alt=''></img>
              <div class="card_content">
                  <h2 className='name'>Товар</h2>
                  <p className='seller'>Продавец</p>
                  <p className='description'>Описание</p>
                  <p class="price">Цена</p>
              </div>
          </div>
          <div class="card">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHCmBls2L6dPXG8Zg7BfDaN9MncI73vOt4A&s' alt=''></img>
              <div class="card_content">
                  <h2 className='name'>Товар</h2>
                  <p className='seller'>Продавец</p>
                  <p className='description'>Описание</p>
                  <p class="price">Цена</p>
              </div>
          </div>
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
