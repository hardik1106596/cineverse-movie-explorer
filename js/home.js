const user =
JSON.parse(
localStorage.getItem("cineverseUser")
);

if(user){

    document.querySelector(
        "#welcome-text"
    ).innerText =
    `Welcome Back, ${user.fullName} 👋`;

    document.querySelector(
        "#profile-name"
    ).innerText =
    user.fullName;

}

const movieContainer =
document.querySelector(
    "#movie-container"
);

movies.forEach((movie)=>{

    movieContainer.innerHTML +=

    `
    <div class="movie-card">

        <img
            src="${movie.image}"
            alt="${movie.title}">

        <h3>${movie.title}</h3>

        <p>⭐ ${movie.rating}</p>

        <p>${movie.genre}</p>

    </div>
    `;

});
