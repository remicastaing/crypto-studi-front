from selenium.webdriver.common.by import By
from Pages.page import Page

from profile import Profile

class ActifsPage(Page):

    url = "actifs"


    def __init__(self, driver):
        super().__init__(driver)

    def get_admin_link(self):
        return self.driver.find_element(By.ID, "goto-administration")

    def get_transaction_link(self):
        return self.driver.find_element(By.ID, "goto-transaction")

    def get_total(self):
        return self.driver.find_element(By.ID, "total")