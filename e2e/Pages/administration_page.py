from selenium.webdriver.common.by import By
from Pages.page import Page

from profile import Profile

class AdministrationPage(Page):

    url = "administration"

    def __init__(self, driver):
        super().__init__(driver)


    def get_back_button(self):
        return self.driver.find_element(By.ID, "back")

    def get_date_input(self):
        return self.driver.find_element(By.ID, "date-input")

    def get_crypto_input(self):
        return self.driver.find_element(By.ID, "crypto-input")

    def get_quantite_input(self):
        return self.driver.find_element(By.ID, "quantite-input")

    def get_prix_input(self):
        return self.driver.find_element(By.ID, "prix-input")

    def get_submit(self):
        return self.driver.find_element(By.ID, "submit")