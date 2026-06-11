const API_KEY =
"cdb498494cf56e2d7c791d55d8837ff1";

function renderAnime(anime)
{
    const container =
    document.querySelector(
    "#anime-container"
    );

    container.innerHTML = "";

    anime.forEach((show)=>{

        if(!show.poster_path)
        {
            return;
        }

        const poster =
        "https://image.tmdb.org/t/p/w500" +
        show.poster_path;

        container.innerHTML +=
        `
        <div
        class="anime-card"
        onclick='openAnime(${JSON.stringify(show)})'>

            <img
            src="${poster}">

            <div class="anime-info">

                <h3>
                    ${show.title}
                </h3>

                <p>
                    ⭐ ${show.vote_average}
                </p>

            </div>

        </div>
        `;
    });
}

function openAnime(show)
{
    localStorage.setItem(
    "selectedMovie",
    JSON.stringify(show)
    );

    window.location.href =
    "movie.html";
}

fetch(
`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`
)
.then((response)=>response.json())
.then((data)=>{

    renderAnime(
        data.results
    );

})
.catch((error)=>{

    console.log(error);

});
