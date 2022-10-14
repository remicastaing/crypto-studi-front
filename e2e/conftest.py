import os
import pathlib
import pytest
from selenium.webdriver.chrome.webdriver import WebDriver as ChromeWebDriver
from selenium.webdriver.edge.webdriver import WebDriver as EdgeWebDriver
from selenium.webdriver.firefox.webdriver import WebDriver as FirefoxWebDriver
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.safari.webdriver import WebDriver as SafariWebDriver

import logging


from configuration import Configuration
from pytest import Item


@pytest.fixture(scope='session', params=Configuration.drivers)
def driver(request):
    """
    Fixture fournissant le driver pour manipuler le browser.
    Si l'argument pytest '-x' est utilisé, le navigateur reste
    ouvert et le dernier utilisateur connecté.
    """
    webdriver = request.param
    if request.config.getoption("-x"):
        User.inhibe_deconnexion()

    webdriver.implicitly_wait(10)
    yield webdriver

    if not request.config.getoption("-x"):
        webdriver.close()



# def pytest_make_parametrize_id(config, val, argname):
#     return webdriver_name(val)

# def webdriver_name(webdriver: WebDriver):
#     if isinstance(webdriver, ChromeWebDriver):
#         return 'Chrome'
#     if isinstance(webdriver, EdgeWebDriver):
#         return 'Edge'
#     if isinstance(webdriver, FirefoxWebDriver):
#         return 'Firefox'
#     if isinstance(webdriver, SafariWebDriver):
#         return 'Safari'


# @pytest.hookimpl(hookwrapper=True)
# def pytest_runtest_makereport(item: Item, call: CallInfo):
#     """
#     Messages d’erreur
#     """
#     outcome = yield
#     report = outcome.get_result()

#     test_fn = getattr(item, 'obj')
#     test_cls = getattr(item.parent, 'obj')

#     try:
#         # Commentaire de classe
#         cls_docstring = getattr(test_cls, '__doc__').replace("\n", " ").strip()
#     except Exception:
#         cls_docstring = 'Commentaire de classe absent du test'

#     try:
#         # Commentaire de fonction
#         fn_docstring = getattr(test_fn, '__doc__').replace("\n", " ").strip()
#     except Exception:
#         fn_docstring = item.name[0:item.name.index('[')] if item.name.index('[') else item.name

#     # Fonction
#     try:
#         func = item.name[0:item.name.index('[')]
#     except Exception:
#         func = item.name

#     # Navigateur
#     try:
#         # cas où il y plusieurs paramètres
#         browser = item.name[item.name.index('['): item.name.index('-')] + ']'
#     except Exception:
#         # cas avec un seul paramètre
#         try:
#             browser = item.name[item.name.index('['): item.name.index(']')+1]
#         except Exception:
#             browser = ''

#     user = f"[user: {User.connected_user.email}]" if User.connected_user else ''

#     report.nodeid = f"{browser}{user}  {func}: \n {cls_docstring}: {fn_docstring}\n"