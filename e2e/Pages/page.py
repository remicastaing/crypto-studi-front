
from configuration import Configuration

from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.common.by import By
from urllib.parse import urlparse
from datetime import date
from selenium.webdriver.common.keys import Keys


class Page:
    """
    Classe mère des pages.
    Cette classe a pour but de définir les fonctions récurrentes pour éviter la duplication de code.
    """

    base_url = Configuration.home_url
    url = ''

    def __init__(self, driver: WebDriver):
        self.driver = driver

    def get(self):
        """
        Ouvre une page et attend qu'elle soit prête.
        :return:
        """

        self.driver.get(self.base_url + self.url)

    def is_current_page(self):
        browser_path = urlparse(self.driver.current_url).path
        page_path = urlparse(self.url).path

        if (browser_path in ['/', '/index.php']) and (page_path in ['/', '/index.php']):
            return True

        return browser_path == '/' + self.url

    def clear_and_input(self, element, data):
        """
        :param field: Champ à remplir
        :param data: Donnée à mettre dans l’input
        """

        if isinstance(data, date):
            data = data.strftime('%d/%m/%Y')

        element.clear()
        element.send_keys(15 * Keys.BACK_SPACE + data)

    def select(self, element, choice):
        """
        Choisis une option dans les champs de type select
        :param select:
        :param choice:
        :return:
        """

        option = element.find_element(By.XPATH, f"//option[@value='{choice}']")
        assert option, f"L'option {choice} n'a pas été trouvé."
        option.click()
