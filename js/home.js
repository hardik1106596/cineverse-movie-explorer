const API_KEY = "cdb498494cf56e2d7c791d55d8837ff1";

const hero =
document.querySelector(".hero");

const heroTitle =
document.querySelector("#hero-title");

const heroDescription =
document.querySelector("#hero-description");

const heroRating =
document.querySelector("#hero-rating");

const heroYear =
document.querySelector("#hero-year");

function renderMovies(movies, containerId)
{
    const container =
    document.querySelector(containerId);

    container.innerHTML = "";

    movies.forEach((movie)=>{

        if(!movie.poster_path)
        {
            return;
        }

        const poster =
        "https://image.tmdb.org/t/p/w500" +
        movie.poster_path;

        container.innerHTML +=
        `
        <div class="movie-card">

            <img
            src="${poster}"
            alt="${movie.title || movie.name}">

            <div class="movie-info">

                <h3>
                    ${movie.title || movie.name}
                </h3>

                <p>
                    ⭐ ${movie.vote_average}
                </p>

            </div>

        </div>
        `;
    });
}

function loadHero(movie)
{
    const banner =
    "https://image.tmdb.org/t/p/original" +
    movie.backdrop_path;

    hero.style.backgroundImage =
    `url(${banner})`;

    heroTitle.innerText =
    movie.title || movie.name;

    heroDescription.innerText =
    movie.overview;

    heroRating.innerText =
    `⭐ ${movie.vote_average}`;

    heroYear.innerText =
    movie.release_date ||
    movie.first_air_date;
}

fetch(
`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    renderMovies(
        data.results,
        "#trending-container"
    );

    loadHero(
        data.results[0]
    );

})
.catch((error)=>{

    console.log(error);

});

fetch(
`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    renderMovies(
        data.results,
        "#top-rated-container"
    );

})
.catch((error)=>{

    console.log(error);

});

fetch(
`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    renderMovies(
        data.results,
        "#series-container"
    );

})
.catch((error)=>{

    console.log(error);

});

fetch(
`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    renderMovies(
        data.results,
        "#recommended-container"
    );

})
.catch((error)=>{

    console.log(error);

});

fetch(
`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    renderMovies(
        data.results,
        "#upcoming-container"
    );

})
.catch((error)=>{

    console.log(error);

});











document.querySelectorAll(".nav-links li")
.forEach((item)=>{

    item.addEventListener("click",()=>{

        const text =
        item.innerText;

        if(text==="Home")
        {
            window.location.href =
            "home.html";
        }

        if(text==="Movies")
        {
            window.location.href =
            "movies.html";
        }

        if(text==="Series")
        {
            window.location.href =
            "series.html";
        }

        if(text==="Trending")
        {
            window.location.href =
            "trending.html";
        }

        if(text==="My List")
        {
            window.location.href =
            "watchlist.html";
        }

    });

});





const searchInput =
document.querySelector("#search-input");

searchInput.addEventListener("keyup",()=>{

    const keyword =
    searchInput.value;

    if(keyword.length < 2)
    {
        return;
    }

    fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`
    )
    .then((response)=>response.json())
    .then((data)=>{

        console.log(data);

    });

});






function addFavorite(movieId)
{
    let favorites =

    JSON.parse(
    localStorage.getItem("favorites")
    ) || [];

    if(!favorites.includes(movieId))
    {
        favorites.push(movieId);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}





function removeFavorite(movieId)
{
    let favorites =

    JSON.parse(
    localStorage.getItem("favorites")
    ) || [];

    favorites =
    favorites.filter((id)=>{

        return id !== movieId;

    });

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}








function addWatchlist(movieId)
{
    let watchlist =

    JSON.parse(
    localStorage.getItem("watchlist")
    ) || [];

    watchlist.push(movieId);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );
}





const user =

JSON.parse(
localStorage.getItem(
"cineverseUser"
));

if(user)
{
    document.querySelector(
    "#profile-name"
    ).innerText =
    user.fullName;
}








card.addEventListener("click",()=>{

    localStorage.setItem(
    "selectedMovie",
    JSON.stringify(movie)
    );

    window.location.href =
    "movie.html";

});





const movie =

JSON.parse(
localStorage.getItem(
"selectedMovie"
));

console.log(movie);




const themeBtn =
document.querySelector(
"#theme-btn"
);

themeBtn.addEventListener(
"click",
()=>{

    document.body.classList.toggle(
    "light-mode"
    );

});




let notifications = 5;

document.querySelector(
"#notification-count"
).innerText =
notifications;





document
.querySelectorAll(
".genre-container button"
)
.forEach((button)=>{

    button.addEventListener(
    "click",
    ()=>{

        const genre =
        button.innerText;

        console.log(genre);

    });

});
