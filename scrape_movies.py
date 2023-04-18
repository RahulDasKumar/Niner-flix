
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from database.db import Database
import time
from database.utils2 import create_driver, get_chromedriver_path
def scraping(chromedriver_path,genre:str):
    url = f"https://www.imdb.com/search/title/?genres={genre}&sort=user_rating,desc&title_type=feature&num_votes=25000"+","
    driver = create_driver(chromedriver_path)
    driver.get(url)
    y = 1000
    for timer in range(0,50):
         driver.execute_script("window.scrollTo(0, "+str(y)+")")
         y += 500  
         time.sleep(1)
    #wait until the images are loaded so it prevents the defualt image link
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.lister-item-header')))
    movies = driver.find_elements(By.CSS_SELECTOR, '.lister-item')
    moviesList = []
    for movie in movies:
        title = movie.find_element(By.CSS_SELECTOR, '.lister-item-header a').text
        summary = movie.find_element(By.CSS_SELECTOR, '.ratings-bar + p').text.strip()
        rating = movie.find_element(By.CSS_SELECTOR, '.ratings-bar strong').text
        poster_elem = movie.find_element(By.CSS_SELECTOR, '.loadlate')
        poster = poster_elem.get_attribute('src')
        moviesDictionary = {
            "title": title,
            "genre":genre,
            "rating":rating,
            "summary":summary,
            "picture":poster
        }
        moviesList.append(moviesDictionary)
        #PUT THIS LIST INTO A DICTIONARY AND RETURN IT
    return moviesList        
        
        

if __name__ == "__main__":
    chromedriver_path = get_chromedriver_path()
    moviesList = scraping(chromedriver_path,"action")
    horrorMoviesList = scraping(chromedriver_path,"horror")
    comedyMoviesList = scraping(chromedriver_path,"comedy")
    historyMoviesList = scraping(chromedriver_path,"history")
    db = Database('database/storeRecords.db') #in the parameter use the scraping method
    for movieItems in moviesList:
        db.insert_new_movies(movieItems)
    for horrorMovies in horrorMoviesList:
        db.insert_new_movies(horrorMovies)   
    for comedyMovies in comedyMoviesList:
        db.insert_new_movies(comedyMovies)
    for historyMovies in historyMoviesList:
        db.insert_new_movies(historyMovies)    
