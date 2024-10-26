from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

def parse(url):
    # Настройка драйвера
    service = Service('edgedriver_win64\\msedgedriver.exe')  
    driver = webdriver.Edge(service=service)
    driver.get(url)

    # Явное ожидание появления элементов
    wait = WebDriverWait(driver, 10)

    product = {}

    try:
        # Ожидание и извлечение названия товара
        product['name'] = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, 'product-page__header'))
        ).text

        # Ожидание и извлечение цены товара
        price_element = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, 'price-block__final-price'))
        )
        price_text = price_element.text.replace('\u00a0', '').replace('₽', '').strip()
        product['price'] = int(price_text.replace(" ", ''))  # Преобразуем цену в целое число

        # Ожидание и извлечение URL изображения товара
        product['image'] = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, 'photo-zoom__preview'))
        ).get_attribute("src")

    except Exception as e:
        print(f"Error occurred: {e}")

    driver.quit()

    return product

# Пример использования
#parse("https://www.wildberries.ru/catalog/260553095/detail.aspx")
