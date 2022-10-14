import pytest



from Pages.splash_page import SplashPage
from Pages.administration_page import AdministrationPage
from Pages.transaction_page import TransactionPage
from Pages.evolution_page import EvolutionPage
from Pages.actifs_page import ActifsPage

from urllib.parse import urlparse
import time


class TestSplash:
    """
    Sur la page d'accueil
    """

    def test_goto_administration(self, driver):

        actifs = ActifsPage(driver)



        adminstration = AdministrationPage(driver)


        actifs.get()


        bouton  = actifs.get_admin_link()

        assert bouton, "Le bouton n'a pas été trouvé"

        bouton.click()

        assert adminstration.is_current_page(), "La page /administration n'a pas été affichée"


    def test_goto_transaction(self, driver):

        actifs = ActifsPage(driver)
        transaction = TransactionPage(driver)

        actifs.get()

        bouton  = actifs.get_transaction_link()

        assert bouton, "Le bouton n'a pas été trouvé"

        bouton.click()

        assert transaction.is_current_page(), "La page /transaction n'a pas été affichée"


    def test_goto_evolution(self, driver):

        actifs = ActifsPage(driver)
        evolution = EvolutionPage(driver)

        actifs.get()

        total  = actifs.get_total()

        assert total, "Le total n'a pas été trouvé"

        total.click()

        assert evolution.is_current_page(), "La page /evolution n'a pas été affichée"