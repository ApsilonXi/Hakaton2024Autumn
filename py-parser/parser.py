from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import json
import time

def parse(url):

    # Настройка драйвера
    service = Service('edgedriver_win64\\msedgedriver.exe')  
    driver = webdriver.Edge(service=service)
    driver.get(url)

    time.sleep(3) 
    # Извлечение данных о товаре
    product = {}

    try:
        product['name'] = driver.find_element(By.CLASS_NAME, 'product-page__title').text
        #product['image'] = driver.find_element(By.CLASS_NAME, 'photo-zoom__preview j-zoom-image hide').get_attribute("src")
    except Exception as e:
        print(f"Error occurred: {e}")

    driver.quit()

    # Сохранение информации в JSON файл
    with open('product.json', 'w', encoding='utf-8') as f:
        json.dump(product, f, ensure_ascii=False, indent=4)

    print("Данные о товаре успешно сохранены в product.json")
#parse("https://www.wildberries.ru/catalog/260553095/detail.aspx")