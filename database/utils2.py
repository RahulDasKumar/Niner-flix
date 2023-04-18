from selenium import webdriver
import os

def get_chromedriver_path():
    """Returns the path to the chromedriver executable"""
    return os.path.join(os.getcwd(), 'chromedriver/chromedriver')


def create_driver(path_to_chromedriver: str = get_chromedriver_path()) -> webdriver.Chrome:
    """Creates a driver object"""
    return webdriver.Chrome(path_to_chromedriver)