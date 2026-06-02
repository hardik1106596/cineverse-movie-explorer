const loginTab =
document.querySelector("#login-tab");

const registerTab =
document.querySelector("#register-tab");

const loginForm =
document.querySelector("#login-form");

const registerForm =
document.querySelector("#register-form");



registerTab.addEventListener("click", () => {

    registerTab.classList.add("active");

    loginTab.classList.remove("active");

    loginForm.style.display = "none";

    registerForm.style.display = "block";

});



loginTab.addEventListener("click", () => {

    loginTab.classList.add("active");

    registerTab.classList.remove("active");

    registerForm.style.display = "none";

    loginForm.style.display = "block";

});

// ======================
// Genre Selection
// ======================

const genres =
document.querySelectorAll(".genre");

genres.forEach((genre)=>{

    genre.addEventListener("click",()=>{

        genre.classList.toggle("active");

    });

});


const joinBtn =
document.querySelector("#join-btn");

joinBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    const fullName =
    document.querySelector("#full-name").value;

    const email =
    document.querySelector("#email").value;

    const password =
    document.querySelector("#password").value;

    const favoriteMovie =
    document.querySelector("#favorite-movie").value;

    const favoriteActor =
    document.querySelector("#favorite-actor").value;

    const selectedGenres = [];

    document
    .querySelectorAll(".genre.active")
    .forEach((genre)=>{

        selectedGenres.push(
            genre.innerText
        );

    });

    const user = {

        fullName,
        email,
        password,
        favoriteMovie,
        favoriteActor,
        genres:selectedGenres

    };

    localStorage.setItem(
        "cineverseUser",
        JSON.stringify(user)
    );

    alert(
        "Registration Successful! Please Login."
    );

    registerForm.style.display = "none";

    loginForm.style.display = "block";

    registerTab.classList.remove("active");

    loginTab.classList.add("active");

});



const loginBtn =
document.querySelector("#join-btn");

loginBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    const loginEmail =
    document.querySelector("#join-email").value;

    const loginPassword =
    document.querySelector("#join-password").value;

    const storedUser =
    JSON.parse(
        localStorage.getItem("cineverseUser")
    );

    if(!storedUser){

        alert(
            "No account found. Please register first."
        );

        return;
    }

    if(
        loginEmail === storedUser.email &&
        loginPassword === storedUser.password
    ){

        alert(
            "Login Successful!"
        );

        window.location.href =
        "home.html";

    }
    else{

        alert(
            "Invalid Email or Password"
        );

    }

});
