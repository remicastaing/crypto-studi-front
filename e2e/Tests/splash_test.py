import pytest



from Pages.splash_page import SplashPage
from Pages.actifs_page import ActifsPage

from urllib.parse import urlparse
import time


class TestSplash:
    """
    Sur la page d'accueil
    """

    def test_clic_bouton(self, driver):
        splash = SplashPage(driver)
        actifs = ActifsPage(driver)

        splash.get()

        bouton  = splash.get_bouton()

        assert bouton, "Le bouton n'a pas été trouvé"

        bouton.click()

        assert actifs.is_current_page(), "La page /actifs n'a pas été affichée"
