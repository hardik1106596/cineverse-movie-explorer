const API_KEY = "cdb498494cf56e2d7c791d55d8837ff1";


const genreMap = {

    Action:28,

    Adventure:12,

    Animation:16,

    Comedy:35,

    Crime:80,

    Drama:18,

    Fantasy:14,

    Horror:27,

    Mystery:9648,

    Romance:10749,

    "Sci-Fi":878,

    Thriller:53

};

let heroMovie = null;


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

                <button
                class="watch-btn"
                data-id="${movie.id}">
                    Watch Now
                </button>

                <button
                class="watchlist-btn"
                data-id="${movie.id}">
                    + Watchlist
                </button>

            </div>

        </div>
        `;
    });



    container
    .querySelectorAll(".watchlist-btn")
    .forEach((btn)=>{

        btn.addEventListener("click",()=>{

            const movieId =
            btn.dataset.id;

            let watchlist =
            JSON.parse(
                localStorage.getItem("watchlist")
            ) || [];

            if(!watchlist.includes(movieId))
            {
                watchlist.push(movieId);

                localStorage.setItem(
                    "watchlist",
                    JSON.stringify(watchlist)
                );

                alert("Added To Watchlist");
            }

        });

    });

}






function loadHero(movie)
{
    heroMovie = movie;

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







document.querySelectorAll(".list-btn")
.forEach((btn)=>{

    btn.addEventListener("click",()=>{

        const movieId =
        btn.dataset.id;

        let watchlist =
        JSON.parse(
        localStorage.getItem(
        "watchlist"
        )) || [];

        if(
        !watchlist.includes(
        movieId
        ))
        {

            watchlist.push(
            movieId
            );

            localStorage.setItem(
            "watchlist",
            JSON.stringify(
            watchlist
            )
            );

            btn.innerText =
            "✓ Added";

            btn.disabled = true;

        }

    });

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

        if(text==="Anime")
        {
            window.location.href =
            "anime.html";
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




const heroWatchBtn =
document.querySelector(
"#hero-watch-btn"
);

heroWatchBtn.addEventListener(
"click",
()=>{

    if(!heroMovie)
    {
        return;
    }

    localStorage.setItem(
        "selectedMovie",
        JSON.stringify(heroMovie)
    );

    window.location.href =
    "movie.html";

});

const heroWatchlistBtn =
document.querySelector(
"#hero-watchlist-btn"
);

heroWatchlistBtn.addEventListener(
"click",
()=>{

    if(!heroMovie)
    {
        return;
    }

    let watchlist =

    JSON.parse(
    localStorage.getItem(
    "watchlist"
    )) || [];

    if(
    !watchlist.includes(
    heroMovie.id
    ))
    {

        watchlist.push(
        heroMovie.id
        );

        localStorage.setItem(
        "watchlist",
        JSON.stringify(
        watchlist
        )
        );

        heroWatchlistBtn.innerText =
        "✓ Added";

    }

});



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





const movie =

JSON.parse(
localStorage.getItem(
"selectedMovie"
));

console.log(movie);




const themeBtn =
document.querySelector("#theme-btn");

if(themeBtn)
{
    themeBtn.addEventListener(
    "click",
    ()=>{

        document.body.classList.toggle(
        "light-mode"
        );

    });
}



let notifications = 5;
const notificationCount =
document.querySelector(
"#notification-count"
);

if(notificationCount)
{
    notificationCount.innerText =
    notifications;
}


document
.querySelectorAll(".genre-container button")
.forEach((button)=>{

    button.addEventListener("click",()=>{



    console.log(button.innerText);

        const genreId =
        genreMap[
            button.innerText
        ];

        console.log(
button.innerText
);

console.log(
genreMap[
button.innerText
]

);

        fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
        )
        .then(res=>res.json())
        .then(data=>{

            document.querySelector(
"#genre-title"
).innerText =
`🎭 ${button.innerText} Movies`;

renderMovies(
    data.results,
    "#genre-container"
);
        });

    });

});
