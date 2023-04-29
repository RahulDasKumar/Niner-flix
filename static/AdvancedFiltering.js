const allMoviesEndPoint = '/movies';
const lowestRatedURL = '/movies/rating/ASC';
const highestRatedURL = '/movies/rating/DESC';


function scrollHandler(idName) {
    function leftButton() {
        document.getElementById(idName).scrollLeft -= 300
    }
    function rightButton() {
        document.getElementById(idName).scrollLeft += 300
    }
    return { leftButton, rightButton }
}


/*
*Finds the movies a certain user has purchased, generates those movies to the cart
*
*/
async function findMoviesPurchased() {
    var purchasedMovies = document.getElementById('purchased-movies');
    //deleted the movies from the purchased movies div
    while (purchasedMovies.firstChild) {
        purchasedMovies.removeChild(purchasedMovies.firstChild);
        console.log("removing")
    }
    //array that holds the id in the array
    let movieIdArray = [];
    const response = await fetch('/cart', {
        method: "POST",
        body: JSON.stringify({
            username: localStorage.getItem("username"),
            session: localStorage.getItem("session")
        }), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .catch(err => console.log(err))
    const data = await response.json()
    //pushes the movie ids into the array
    for (let i = 0; i < data.length; i++) {
        movieIdArray.push(data[i].movie_id)
    }
    //references the array with movie ids to output the corresponding movies
    for (let i = 0; i < movieIdArray.length; i++) {
        const allMovies = await fetch(`/movies/id/${movieIdArray[i]}`).
            then().
            catch(err => console.log(err))
        const data = await allMovies.json()
        movieGenerator(data[0].movies_id, data[0].genre, data[0].movie_title, data[0].picture, data[0].summary, data[0].rating, "purchased-movies")
    }

}
/*
*Updates the amount of movies bought
*/
async function updateAmountPurchased() {
    const modalInfo = document.getElementById('amount-text');
    modalInfo.textContent = '';
    const response = await fetch('/cart', {
        method: "POST",
        body: JSON.stringify({
            username: localStorage.getItem("username"),
            session: localStorage.getItem("session")
        }), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .catch(err => console.log(err));
    const data = await response.json();
    let totalAmount = 0;
    for (let i = 0; i < data.length; i++) {
        totalAmount += data[i].amount;
    }
    modalInfo.textContent = totalAmount;


}

/*
*Outputs the movie card by reading through the movie api
*args-url, divID(The div where the movies will be generated)
*/
const generateMovies = async (url, divID) => {
    const response = await fetch(url).
        then().
        catch(err => console.log(err))
    const jsonData = await response.json()
    for (let i = 0; i < jsonData.length; i++) {
        movieGenerator(jsonData[i].movies_id, jsonData[i].genre, jsonData[i].movie_title, jsonData[i].picture, jsonData[i].summary, jsonData[i].rating, divID)
    }
}

/*
*Generates the movie cards
*args- id,genre,title,picture,summary,divID- All movie attributes
*appends to specified divID
*/
function movieGenerator(id, genre, title, picture, summary, rating, divID) {
    // creating elements needed
    const movieDiv = document.createElement('div')
    const purchaseDiv = document.createElement('div')
    purchaseDiv.className = 'pop-up'
    //**************purchase div contents***************
    // needed so other elements wont get deleted
    const closeButton = document.createElement('button')
    const purchasePictureDiv = document.createElement('div')
    const purchasePicture = document.createElement('img')
    const purchaseSummary = document.createElement('a')
    //changing text to white
    purchaseSummary.style.color = 'white'
    const purchaseButton = document.createElement('button')
    //adding classes and other attributes to purchase div elements
    closeButton.className = 'movie-button'
    closeButton.textContent = 'O'
    purchasePictureDiv.className = 'picture-container'
    purchasePicture.src = picture
    purchaseSummary.textContent = summary
    purchaseButton.textContent = 'Buy'
    purchaseButton.className = 'purchase-button'
    purchaseDiv.append(purchaseSummary, purchaseButton)
    //*Allows to expand and collapse to see movie info */
    closeButton.addEventListener('click', () => {
        console.log('i am being clicked')
        if (purchaseDiv.style.display === 'block') {
            movieDiv.style.flex = '0 0 0'
            movieDiv.style.flexDirection = 'column'
            purchaseDiv.style.display = 'none'
            closeButton.textContent = 'O'
        } else {
            movieDiv.style.flex = '0 0 auto'
            purchaseDiv.style.display = 'block'
            movieDiv.style.flexDirection = 'column'
            movieDiv.classList.toggle("visible");
            closeButton.textContent = '<'
        }
    })

    movieDiv.className = 'movie-container'
    purchaseDiv.className = 'purchase-container'
    movieDiv.setAttribute('id', title)
    const movie_title = document.createElement('h5')
    const movie_picture = document.createElement('img')
    const pictureDiv = document.createElement('div')
    pictureDiv.className = 'picture-container'
    //appending the data to the elements
    movie_title.textContent = title
    movie_picture.src = picture
    // buy button functionality
    purchaseButton.addEventListener('click', async () => {
        await fetch('/purchase',
            {
                method: 'POST',
                body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    session: localStorage.getItem("session"),
                    id: id,
                    title: title,
                    picture: picture,
                    amount: 1
                }), headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    })
    //appending elements to main div
    pictureDiv.append(movie_picture)
    //purchaseDiv.appendChild(movie_picture)
    movieDiv.append(pictureDiv, movie_title, purchaseDiv, closeButton)
    document.getElementById(divID).appendChild(movieDiv)
}
/*
*Outputs the movies by rating by descending order
*/
document.getElementById('highest-rated').onclick = () => {
    let ratingSection = document.getElementById('rating-bar')
    while (ratingSection.firstChild) {
        ratingSection.removeChild(ratingSection.firstChild);
    }
    generateMovies(highestRatedURL, 'rating-bar')
}
/*
*Outputs the movies by rating by ascending order
*/
document.getElementById('lowest-rated').onclick = () => {
    //deletes the previously searched movies
    let ratingSection = document.getElementById('rating-bar');
    while (ratingSection.firstChild) {
        ratingSection.removeChild(ratingSection.firstChild);
    }
    generateMovies(lowestRatedURL, 'rating-bar')
}
/*
*Search by title function
*appends event value into the api title parameter
*/
document.getElementById('input').addEventListener('input', (event) => {
    //deletes the previously searched movies
    let searchSection = document.getElementById('search-container')
    while (searchSection.firstChild) {
        searchSection.removeChild(searchSection.firstChild);
    }
    //generates search movies
    generateMovies(`/movies/title/${event.target.value}`, 'search-container')
})

document.getElementById('left-all-movies').onclick = () => scrollHandler('rating-bar').leftButton()
document.getElementById('right-all-movies').onclick = () => scrollHandler('rating-bar').rightButton()

/*
*Duplicate function from script.js, opens up the div to see cart
*/
document.getElementById('cart-button').onclick = () => {
    updateAmountPurchased();
    findMoviesPurchased();
    const viewCartButton = document.getElementById('modal-container')
    if (viewCartButton.style.display === 'flex') {
        viewCartButton.style.display = 'none'
    }
    else {
        viewCartButton.style.display = 'flex'
    }
}
//completes transaction for users
document.getElementById('cart-purchase').onclick = () => {
    const priceTotal = document.getElementById('amount-text')
    //resets price to 0 after clicking on purchase button
    priceTotal.textContent = '0'
    //this deletes all the items from the cart
    fetch('/delete', {
        method: 'DELETE',
        body: JSON.stringify({
            username: localStorage.getItem("username"),
            session: localStorage.getItem("session")
        }), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then().catch(err => console.log(err))
    var purchasedMovies = document.getElementById('purchased-movies');
    //deletes the movies from the purchased movies div, since you buy all the movies, they leave your cart
    while (purchasedMovies.firstChild) {
        purchasedMovies.removeChild(purchasedMovies.firstChild);
        console.log("removing")
    }
}

generateMovies(allMoviesEndPoint, 'rating-bar')
generateMovies(allMoviesEndPoint, 'search-container')