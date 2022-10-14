import pathlib
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.edge.service import Service as EdgeServices
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.firefox.service import Service as FirefoxServices
from selenium.webdriver.safari.options import Options as SafariOptions
from selenium.webdriver.safari.service import Service as SafariService

from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from webdriver_manager.firefox import GeckoDriverManager


# chrome_options.add_argument("--headless")

download_path = str(pathlib.Path(
    __file__).parent.parent.resolve()) + '/Downloads/'

driver_path = str(pathlib.Path(
    __file__).parent.resolve()) + '/driver/'


def getChromeDriver():
    """
    Paramétrage et récupération du webdriver pour Chrome
    """

    chrome_service = ChromeService(driver_path + 'chromedriver')
    # chrome_service = ChromeService(ChromeDriverManager().install())
    chrome_options = ChromeOptions()
    chrome_options.add_experimental_option(
        'prefs', {'download.default_directory': download_path + '/'})
    # chrome_options.page_load_strategy = 'none'
    return webdriver.Chrome(service=chrome_service, options=chrome_options)


def getEdgeDriver():
    """
    Paramétrage et récupération du webdriver pour Edge
    """
    edge_service = EdgeServices(EdgeChromiumDriverManager().install())
    edge_options = EdgeOptions()
    edge_options.add_experimental_option(
        'prefs', {'download.default_directory': download_path + '/'})
    return webdriver.Edge(service=edge_service, options=edge_options)


def getFirefoxDriver():
    """
    Paramétrage et récupération du webdriver pour Firefox
    """
    firefox_service = FirefoxServices(
        executable_path=GeckoDriverManager().install())
    firefox_options = FirefoxOptions()
    firefox_options.set_preference("browser.download.useDownloadDir", True)
    firefox_options.set_preference("browser.download.folderList", 2)
    firefox_options.set_preference(
        "browser.download.manager.showWhenStarting", False)
    firefox_options.set_preference("browser.download.dir", download_path)
    firefox_options.set_preference(
        "browser.download.viewableInternally.enabledTypes", "")
    firefox_options.set_preference(
        "browser.helperApps.neverAsk.saveToDisk",
        "application/vnd.oasis.opendocument.spreadsheet;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    return webdriver.Firefox(service=firefox_service, options=firefox_options)


def getSafariDriver():
    """
    Paramétrage et récupération du webdriver pour Safari
    """
    safari_options = SafariOptions()
    # ne sert à rien car ne marche pas
    safari_options.set_capability(
        'safari.options.dataDir',  download_path + '/')
    return webdriver.Safari(options=safari_options)


class Configuration:

    # Récupération des webdrivers de chaque navigateur
    # Par défaut, on utilise Firefox
    drivers = [
        getChromeDriver(),
        # getEdgeDriver(),
        # getFirefoxDriver(),
        # getSafariDriver(),
        # webdriver.Ie(IEDriverManager().install()),
    ]

    # Environnement de tests
    home_url = "http://localhost:3000/"
