//END POINTS FOR GENRE FILTERING
const allMoviesEndPoint = '/movies';
const actionMoviesEndPoint = '/movies/action';
const horrorMoviesEndPoint = '/movies/horror';
const comedyMoviesEndPoint = '/movies/comedy';
const historyMoviesEndPoint = '/movies/history';

//scroll function
function scrollHandler(idName) {
    function leftButton() {
        //document.getElementById(idName).scrollLeft -= 300
        scrollBy(document.getElementById(idName), -1000, 0, 0.05);
    }
    function rightButton() {
        scrollBy(document.getElementById(idName), 1000, 0, 0.05);
        //document.getElementById(idName).scrollLeft += 300
    }
    return { leftButton, rightButton }
}
// doesnt work on chrome or edge
async function scrollBy(target, x, y, speed) {
    if (target.classList.contains("scrolling"))
        return;
    target.classList.toggle("scrolling");
    let holdX = target.scrollLeft;
    let targetX = target.scrollLeft + x;

    let holdY = target.scrollTop;
    let targetY = target.scrollTop + y;

    let dirX = (targetX >= holdX);
    let dirY = (targetY >= holdY);

    let maxX = target.scrollWidth - target.offsetWidth;
    let maxY = target.scrollHeight - target.offsetHeight;

    let stop = false;
    let then = Date.now();

    let f = (target) => {

        if (stop)
            return;
        window.requestAnimationFrame(() => {
            f(target);
        });

        let now = Date.now();
        if (now - then > 1000/120) {
            then = now;

            let dirs = 0;

            target.scrollLeft += x*speed;

            if (dirX && (target.scrollLeft >= targetX || target.scrollLeft >= maxX)) {
                dirs++;
            } else if (dirX == false && (target.scrollLeft <= targetX || target.scrollLeft <= 0)) {
                dirs++;
            }

            if (dirY && (target.scrollTop <= targetY || target.scrollTop >= maxY)) {
                dirs++;
            } else if (dirY == false && (target.scrollTop >= targetY || target.scrollTop <= 0)) {
                dirs++;
            }

            if (dirs >= 2) {
                console.log(dirs);
                target.classList.toggle("scrolling");
                target.scrollTo(targetX, targetY);
                stop = true;
            }
            console.log("frame");
        }
    };
    window.requestAnimationFrame(() => {
        f(target);
    });

}

//gets the movie card for the movies purchased
async function findMoviesPurchased() {
    var purchasedMovies = document.getElementById('purchased-movies');
    //deleted the movies from the purchased movies div
    while (purchasedMovies.firstChild) {
        purchasedMovies.removeChild(purchasedMovies.firstChild);
        console.log("removing")
    }
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
    for (let i = 0; i < data.length; i++) {
        movieIdArray.push(data[i].movie_id)
    }
    for (let i = 0; i < movieIdArray.length; i++) {
        const allMovies = await fetch(`/movies/id/${movieIdArray[i]}`).
            then().
            catch(err => console.log(err))
        const data = await allMovies.json()
        movieGenerator(data[0].movies_id, data[0].genre, data[0].movie_title, data[0].picture, data[0].summary, data[0].rating, "purchased-movies")
    }

}
//updates the users amount purchased
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
//GENERATES JSON DATA AND INPUTS THEM IN MOVIE GENERATOR
const generateMovies = async (url, divID) => {
    const response = await fetch(url).
        then().
        catch(err => console.log(err))
    const jsonData = await response.json()
    for (let i = 0; i < jsonData.length; i++) {
        movieGenerator(jsonData[i].movies_id, jsonData[i].genre, jsonData[i].movie_title, jsonData[i].picture, jsonData[i].summary, jsonData[i].rating, divID)
    }
}
//Creates the movies you see in the first section of the website
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
    const purchaseSummary = document.createElement('p')
    const purchaseButton = document.createElement('button')
    //adding classes and other attributes to purchase div elements
    closeButton.className = 'movie-button'
    closeButton.textContent = 'O'
    purchasePictureDiv.className = 'picture-container'
    purchasePicture.src = picture
    purchaseSummary.className = 'desc-box'
    purchaseSummary.textContent = summary
    purchaseButton.textContent = 'Buy'
    purchaseButton.className = 'purchase-button'
    purchaseDiv.append(purchaseSummary, purchaseButton)
    // event listener for closing button, expands and collapses movie container
    closeButton.addEventListener('click', () => {
        console.log('i am being clicked')
        if (purchaseDiv.style.display === 'block') {
            movieDiv.style.flex = '0 0 0'
            movieDiv.style.flexDirection = 'column'
            purchaseDiv.style.display = 'none'
            closeButton.textContent = 'O'
            movieDiv.classList.toggle("visible");
            movieDiv.classList.toggle("hoverable");
        } else {
            movieDiv.style.flex = '0 0 auto'
            purchaseDiv.style.display = 'block'
            movieDiv.style.flexDirection = 'column'
            closeButton.textContent = '<'
            movieDiv.classList.toggle("visible");
            movieDiv.classList.toggle("hoverable")
        }
    })
    movieDiv.className = 'movie-container'
    movieDiv.classList.add("hoverable")
    purchaseDiv.className = 'purchase-container'
    movieDiv.setAttribute('id', title)
    const movie_title = document.createElement('h5')
    const movie_picture = document.createElement('img')
    const pictureDiv = document.createElement('div')
    pictureDiv.className = 'picture-container'
    //appending the data to the elements
    movie_title.textContent = title
    movie_picture.src = picture
    //adds item to the users cart
    purchaseButton.addEventListener('click', async () => {
        // prevents inconsistencies with api calls
        // without timeout it shows a multithreading error with sqlite3
        findMoviesPurchased();
        console.log("im running")
        //this post method adds the movie container info to the db to the user currently logged in
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
            .catch(err => console.log(err));
    })
    //appending elements to main div
    pictureDiv.append(movie_picture)
    //purchaseDiv.appendChild(movie_picture)
    movieDiv.append(pictureDiv, movie_title, purchaseDiv, closeButton)

    document.getElementById(divID).appendChild(movieDiv)
}
document.addEventListener('DOMContentLoaded', () => {
    //Refatored buttons using closure to debloat the code and makes it easier to read
    //scroll button event listeners
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

    // shows the pop up div that has the information on your cart like amount purchased and the movies you bought
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
    //resets data after purchasing items in the store
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

    generateMovies(allMoviesEndPoint, 'scroll-bar')
    generateMovies(horrorMoviesEndPoint, 'horror-bar')
    generateMovies(comedyMoviesEndPoint, 'comedy-bar')
    generateMovies(historyMoviesEndPoint, 'history-bar')
    generateMovies(actionMoviesEndPoint, 'action-bar')
})
    //pullMovies();



