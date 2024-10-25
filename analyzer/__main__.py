import requests
from bs4 import BeautifulSoup

class ProductParser:
    def __init__(self, url):
        self.url = url
        self.product_data = {}

    def fetch_page(self):
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(self.url, headers=headers)
            response.raise_for_status()  # Проверка на ошибки HTTP
            return response.text
        except requests.RequestException as e:
            print(f"Ошибка при запросе: {e}")
            return None

    def parse(self, page_content):
        soup = BeautifulSoup(page_content, 'html.parser')

        # Пример парсинга: извлечение названия товара и цены
        try:
            self.product_data['title'] = soup.find('h1', class_='product-title').get_text(strip=True)
            self.product_data['price'] = soup.find('span', class_='price').get_text(strip=True)
            # Добавьте дополнительные поля по мере необходимости
        except AttributeError as e:
            print("Ошибка парсинга: убедитесь, что выбранные селекторы корректны.", e)

    def get_product_data(self):
        page_content = self.fetch_page()
        if page_content:
            self.parse(page_content)
        return self.product_data


# Использование парсера
url = 'https://www.wildberries.ru/catalog/242789289/detail.aspx'  # Вставьте ссылку на товар
parser = ProductParser(url)
product_info = parser.get_product_data()

if product_info:
    print(product_info)