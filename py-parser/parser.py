from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import json
import time

# Настройка драйвера
service = Service('c:\\Users\\volko\\Downloads\\edgedriver_win64\\msedgedriver.exe')  # Замените на путь к вашему ChromeDriver
driver = webdriver.Edge(service=service)

# URL товара
url = 'https://www.wildberries.ru/catalog/242789818/detail.aspx'  # Замените на нужный URL товара

# Открытие страницы товара
driver.get(url)

# Ждем загрузки страницы
time.sleep(3)  # Увеличьте значение при необходимости

# Извлечение данных о товаре
product = {}

try:
    product['name'] = driver.find_element(By.CSS_SELECTOR, '.product-page__title').text
    #product['image'] = driver.find_element(By.CSS_SELECTOR, '.photo-zoom__preview j-zoom-image hide img').get_attribute('src')
    #product['brand'] = driver.find_element(By.CSS_SELECTOR, '.product-page__header-brand j-wba-card-item j-wba-card-item-show j-wba-card-item-observe').text
    product['seller'] = driver.find_element(By.CSS_SELECTOR, '.seller-info__name').text
    #product['price'] = driver.find_element(By.CSS_SELECTOR, '.price-block__final-price wallet').text
except Exception as e:
    print(f"Error occurred: {e}")

# Закрытие драйвера
driver.quit()

# Сохранение информации в JSON файл
with open('product.json', 'w', encoding='utf-8') as f:
    json.dump(product, f, ensure_ascii=False, indent=4)

print("Данные о товаре успешно сохранены в product.json")