const API_KEY =
"cdb498494cf56e2d7c791d55d8837ff1";

console.log("movie.js loaded");


const movie =
JSON.parse(
localStorage.getItem(
"selectedMovie"
));

if(!movie)
{
    window.location.href =
    "home.html";
}

const banner =
"https://image.tmdb.org/t/p/original" +
movie.backdrop_path;

const poster =
"https://image.tmdb.org/t/p/w500" +
movie.poster_path;

document.querySelector(
"#movie-banner"
).style.backgroundImage =
`url(${banner})`;

document.querySelector(
"#movie-poster"
).src =
poster;

document.querySelector(
"#movie-title"
).innerText =
movie.title ||
movie.name;

document.querySelector(
"#movie-rating"
).innerText =
`⭐ ${movie.vote_average}`;

document.querySelector(
"#movie-date"
).innerText =
movie.release_date ||
movie.first_air_date;

document.querySelector(
"#movie-overview"
).innerText =
movie.overview;

document.querySelector(
"#movie-popularity"
).innerText =
movie.popularity;

document.querySelector(
"#movie-language"
).innerText =
movie.original_language.toUpperCase();

fetch(
`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    const genres =
    data.genres
    .map((genre)=>genre.name)
    .join(", ");

    document.querySelector(
    "#movie-genres"
    ).innerText =
    genres;

});

document.querySelector(
"#add-watchlist-btn"
)
.addEventListener(
"click",
()=>{

    let watchlist =

    JSON.parse(
    localStorage.getItem(
    "watchlist"
    )) || [];

    if(
    !watchlist.includes(
    movie.id
    ))
    {

        watchlist.push(
        movie.id
        );

        localStorage.setItem(
        "watchlist",
        JSON.stringify(
        watchlist
        )
        );

        document.querySelector(
        "#add-watchlist-btn"
        ).innerText =
        "✓ Added";

    }

});

fetch(
`https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    const container =
    document.querySelector(
    "#recommendation-container"
    );

    data.results
    .slice(0,10)
    .forEach((movie)=>{

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
            alt="${movie.title}">

            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>

                <p>
                    ⭐ ${movie.vote_average}
                </p>

            </div>

        </div>
        `;
    });

});

document.querySelector(
"#watch-trailer-btn"
)
.addEventListener(
"click",
()=>{

    fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
    )
    .then((response)=>response.json())
    .then((data)=>{

        const trailer =
        data.results.find(
        (video)=>

        video.type ===
        "Trailer"

        &&
        video.site ===
        "YouTube"
        );

        if(trailer)
        {
            window.open(
            `https://www.youtube.com/watch?v=${trailer.key}`,
            "_blank"
            );
        }
        else
        {
            alert(
            "Trailer Not Available"
            );
        }

    });

});
// movies.js placeholder
