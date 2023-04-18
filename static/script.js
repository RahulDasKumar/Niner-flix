//END POINTS FOR GENRE FILTERING
const allMoviesEndPoint = 'http://127.0.0.1:5000/movies';
const actionMoviesEndPoint = 'http://127.0.0.1:5000/movies/action';
const horrorMoviesEndPoint = 'http://127.0.0.1:5000/movies/horror';
const comedyMoviesEndPoint = 'http://127.0.0.1:5000/movies/comedy';
const historyMoviesEndPoint = 'http://127.0.0.1:5000/movies/history';
//
function scrollHandler(idName) {
    function leftButton() {
        document.getElementById(idName).scrollLeft -= 1000
    }
    function rightButton() {
        document.getElementById(idName).scrollLeft += 1000
    }
    return { leftButton, rightButton }
}
//GENERATES JSON DATA AND INPUTS THEM IN MOVIE GENERATOR
const generateMovies = async (url, divID) => {
    const response = await fetch(url).
        then().
        catch(err => console.log(err))
    const jsonData = await response.json()
    for (let i = 0; i < jsonData.length; i++) {
        movieGenerator(jsonData[i].genre, jsonData[i].movie_title, jsonData[i].picture, jsonData[i].summary, jsonData[i].rating, divID)
    }
}
//Creates the movies you see in the first section of the website
function movieGenerator(genre, title, picture, summary, rating, divID) {
    // creating elements needed
    const movieDiv = document.createElement('div')
    movieDiv.className = 'movie-container'
    movieDiv.setAttribute('id', title)
    const movie_title = document.createElement('h5')
    const movie_picture = document.createElement('img')
    const description = document.createElement('div')
    const movie_genre = document.createElement('h5')
    const movie_rating = document.createElement('h2')
    const divButton = document.createElement('div')
    const button = document.createElement('button')
    const pictureDiv = document.createElement('div')
    description.className = 'summary-container'
    divButton.className = 'purchase-div'
    pictureDiv.className = 'picture-container'
    //appending the data to the elements
    movie_title.textContent = title
    movie_picture.src = picture
    description.textContent = summary
    movie_genre.textContent = genre
    movie_rating.textContent = rating
    button.textContent = 'Purchase'
    //appending elements to main div
    divButton.append(button)
    pictureDiv.append(movie_picture)
    movieDiv.append(pictureDiv, movie_title)
    document.getElementById(divID).appendChild(movieDiv)
}
//Used to scroll left and right on the webpage
//Refatored buttons using closure to debloat the code and makes it easier to read
document.getElementById('left-all-movies').onclick = () => scrollHandler('scroll-bar').leftButton()
document.getElementById('right-all-movies').onclick = () => scrollHandler('scroll-bar').rightButton()
document.getElementById('left-horror-movies').onclick = () => scrollHandler('horror-bar').leftButton()
document.getElementById('right-horror-movies').onclick = () => scrollHandler('horror-bar').rightButton()
document.getElementById('left-history-movies').onclick = () => scrollHandler('history-bar').leftButton()
document.getElementById('right-history-movies').onclick = () => scrollHandler('history-bar').rightButton()
document.getElementById('left-comedy-movies').onclick = () => scrollHandler('comedy-bar').leftButton()
document.getElementById('right-comedy-movies').onclick = () => scrollHandler('comedy-bar').rightButton()
document.getElementById('left-action-movies').onclick = () => scrollHandler('action-bar').leftButton()
document.getElementById('right-action-movies').onclick = () => scrollHandler('action-bar').rightButton()
//-------- USING SETTIMEOUT TO PREVENT THIS ERROR FROM THE BACKEND-----ProgrammingError: Recursive use of cursors not allowed.
generateMovies(allMoviesEndPoint, 'scroll-bar')
setTimeout(async () => await generateMovies(horrorMoviesEndPoint, 'horror-bar'), 500)
setTimeout(async () => await generateMovies(comedyMoviesEndPoint, 'comedy-bar'), 1000)
setTimeout(async () => await generateMovies(historyMoviesEndPoint, 'history-bar'), 1500)
setTimeout(async () => await generateMovies(actionMoviesEndPoint, 'action-bar'), 2000)




