import pytest



from Pages.transaction_page import TransactionPage
from Pages.actifs_page import ActifsPage

from urllib.parse import urlparse
import time


class TestTransaction:
    """
    Sur la page d'accueil
    """

    def test_back_bouton(self, driver):
        transaction = TransactionPage(driver)
        actifs = ActifsPage(driver)

        transaction.get()

        back  = transaction.get_back_button()

        assert back, "Le bouton back n'a pas été trouvé"

        back.click()

        assert actifs.is_current_page(), "La page /actifs n'a pas été affichée"
