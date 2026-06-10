// watchlist.js placeholder
const API_KEY =
"cdb498494cf56e2d7c791d55d8837ff1";

const watchlist =

JSON.parse(
localStorage.getItem(
"watchlist"
)) || [];

const container =
document.querySelector(
"#watchlist-container"
);

watchlist.forEach((movieId)=>{

    fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    )
    .then((response)=>response.json())
    .then((movie)=>{

        const poster =
        "https://image.tmdb.org/t/p/w500" +
        movie.poster_path;

        container.innerHTML +=
        `
        <div class="movie-card">

            <img
            src="${poster}">

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
