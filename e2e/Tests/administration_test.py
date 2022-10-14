import pytest

from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

from Pages.administration_page import AdministrationPage
from Pages.transaction_page import TransactionPage
from Pages.actifs_page import ActifsPage


from datetime import date
import time
import random

date_test = date(2022, 9, 22).strftime('%d/%m/%Y')
crypto_test = random.choice(['BTC', 'ETH', 'XRP'])
quantite_test = str(random.randrange(1, 5, 1))
prix_test = str(round(random.random() * 1000, 2))



class TestAdministration:
    """
    Sur la page d'accueil
    """

    def test_back_bouton(self, driver):
        administration = AdministrationPage(driver)
        actifs = ActifsPage(driver)

        administration.get()

        back = administration.get_back_button()

        assert back, "Le bouton back n'a pas été trouvé"

        back.click()

        assert actifs.is_current_page(), "La page /actifs n'a pas été affichée"

    def test_saisie_transaction(self, driver):

        administration = AdministrationPage(driver)
        transaction = TransactionPage(driver)

        administration.get()

        date_input = administration.get_date_input()
        administration.clear_and_input(date_input, date_test)

        crypto_input = administration.get_crypto_input()
        administration.select(crypto_input, crypto_test)

        quantite_input = administration.get_quantite_input()
        administration.clear_and_input(quantite_input, quantite_test)

        prix_input = administration.get_prix_input()
        administration.clear_and_input(prix_input, prix_test)

        submit = administration.get_submit()
        submit.click()

        time.sleep(1)

        assert transaction.is_current_page(), "La transaction n'a pu être saisie."

    def test_enregistrement_transaction(self, driver):

        tp = TransactionPage(driver)

        try:
            td_prix = tp.get_transaction_by_prix(prix_test)
        except NoSuchElementException:
            assert False, f"La transaction avec pour prix {prix_test} n'a pas pas été trouvée"

        try:
            td_date = tp.get_date_transaction_by_prix(prix_test)
        except NoSuchElementException:
            assert False, f"La transaction n'a pas la bonne date n'a pas pas été trouvée"

        assert td_date.text == date_test, f"La date {date_test} n'a pas été retrouvée"


        try:
            td_crypto = tp.get_krypto_transaction_by_prix(prix_test)
        except NoSuchElementException:
            assert False, f"La transaction n'a pas la bonne date n'a pas pas été trouvée"

        assert td_crypto.text == crypto_test, f"La crypto {crypto_test} n'a pas été retrouvée"

    def test_suppression_transaction(self, driver):
        tp = TransactionPage(driver)

        try:
            tr_transaction = tp.get_transaction_by_prix(prix_test)
        except NoSuchElementException:
            assert False, f"La transaction avec pour prix {prix_test} n'a pas pas été trouvée"

        tr_transaction.click()

        boutton_supprimer = tp.get_modal_boutton_supprimer()

        boutton_supprimer.click()

        time.sleep(1)

        trouve = True
        driver.implicitly_wait(1)
        try:
            td_prix =  tp.get_transaction_by_prix(prix_test)

            trouve = False
        except NoSuchElementException:
            assert True, f"La transaction avec pour prix {prix_test} n'a pas pas été trouvée"

        driver.implicitly_wait(10)

        assert trouve, f"La transaction avec pour prix {prix_test} n'a pas pas été supprimée"
