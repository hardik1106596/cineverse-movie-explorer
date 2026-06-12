const API_KEY =
"cdb498494cf56e2d7c791d55d8837ff1";

function renderTrending(movies)
{
    const container =
    document.querySelector(
    "#trending-container"
    );

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
        <div
        class="movie-card"
        data-id="${movie.id}">

            <img
            src="${poster}">

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

    document
    .querySelectorAll(".movie-card")
    .forEach((card,index)=>{

        card.addEventListener("click",()=>{

            localStorage.setItem(
                "selectedMovie",
                JSON.stringify(
                movies[index]
                )
            );

            window.location.href =
            "movie.html";

        });

    });

}

fetch(
`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    renderTrending(
        data.results
    );

})
.catch((error)=>{

    console.log(error);

});
