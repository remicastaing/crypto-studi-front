from selenium.webdriver.common.by import By
from Pages.page import Page

from profile import Profile

class EvolutionPage(Page):

    url = "evolution"

    def __init__(self, driver):
        super().__init__(driver)


    def get_back_button(self):
        return self.driver.find_element(By.ID, "back")


