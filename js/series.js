const API_KEY =
"cdb498494cf56e2d7c791d55d8837ff1";

function renderSeries(series)
{
    const container =
    document.querySelector(
    "#series-container"
    );

    container.innerHTML = "";

    series.forEach((show)=>{

        if(!show.poster_path)
        {
            return;
        }

        const poster =
        "https://image.tmdb.org/t/p/w500" +
        show.poster_path;

        container.innerHTML +=
        `
        <div class="series-card">

            <img
            src="${poster}">

            <div class="series-info">

                <h3>
                    ${show.name}
                </h3>

                <p>
                    ⭐ ${show.vote_average}
                </p>

            </div>

        </div>
        `;
    });
}

fetch(
`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
)
.then((response)=>response.json())
.then((data)=>{

    renderSeries(
        data.results
    );

})
.catch((error)=>{

    console.log(error);

});
