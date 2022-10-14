from selenium.webdriver.common.by import By
from Pages.page import Page

from profile import Profile

class SplashPage(Page):

    url = ""

    def __init__(self, driver):

        super().__init__(driver)

    def get_bouton(self):
        return self.driver.find_element(By.CLASS_NAME, "btn")