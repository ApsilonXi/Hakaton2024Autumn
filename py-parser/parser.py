from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def parse(url):
    service = Service('py-parser/msedgedriver.exe')
    driver = webdriver.Edge(service=service)
    driver.get(url)

    wait = WebDriverWait(driver, 10)
    product = {}
    try:
        product['name'] = (wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, 'product-page__header'))
        ).text).split("\n")[1]

        price_element = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, 'price-block__final-price'))
        )
        price_text = price_element.text.replace('\u00a0', '').replace('₽', '').strip()
        product['price'] = int(price_text.replace(" ", ''))

        product['image'] = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, 'photo-zoom__preview'))
        ).get_attribute("src")
        product['link'] = url  
    except Exception as e:
        print(f"Error occurred: {e}")
    driver.quit()
    return product

def search_by_name(name):
    service = Service('py-parser/msedgedriver.exe')
    driver = webdriver.Edge(service=service)
    url = f"https://www.wildberries.ru/catalog/0/search.aspx?search={name}"
    driver.get(url)

    wait = WebDriverWait(driver, 10)
    links = []

    try:
        product_elements = wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a.product-card__link.j-card-link.j-open-full-product-card'))
        )

        for element in product_elements[:2]:  
            try:
                product_link = element.get_attribute("href")
                if product_link:
                    links.append(product_link)
            except Exception as e:
                print(f"Error occurred while parsing product: {e}")
                continue
    except Exception as e:
        print(f"Error occurred: {e}")
    
    driver.quit()
    return links


def search_by_name_and_parse(name):
    links = search_by_name(name)
    parsed_products = []

    for link in links:
        product_data = parse(link)
        parsed_products.append(product_data)

    return parsed_products
