from selenium.webdriver.common.by import By
from Pages.page import Page

from profile import Profile


class TransactionPage(Page):

    url = "transaction"

    def __init__(self, driver):
        super().__init__(driver)

    def get_back_button(self):
        return self.driver.find_element(By.ID, "back")

    def get_modal_boutton_supprimer(self):
        return self.driver.find_element(By.XPATH, "//button[@class='btn btn-danger']")

    def get_transaction_by_prix(self, prix):
        return self.driver.find_element(By.XPATH, f"//td[contains(text(), '{prix.replace('.', ',')}')]/..")

    def get_date_transaction_by_prix(self, prix):
        return self.driver.find_element(
            By.XPATH, f"//td[contains(text(), '{prix.replace('.', ',')}')]/../td[1]")

    def get_krypto_transaction_by_prix(self, prix):
        return self.driver.find_element(
                By.XPATH, f"//td[contains(text(), '{prix.replace('.', ',')}')]/../td[2]")