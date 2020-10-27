const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}

//day 1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonCloseAuth = document.querySelector(".close-auth")
const logInForm = document.querySelector("#logInForm")
const buttonOut = document.querySelector(".button-out")
const modalDialogAuth = document.querySelector(".modal-dialog-auth")
let login = localStorage.getItem("login");
let userName = document.querySelector(".user-name");
let alert = document.createElement("alert");
alert.className = "alert";
alert.innerHTML = "Введите логин";
alert.style.marginLeft = "33%";
alert.style.font = "20px Tahoma";
alert.style.color = "#000";

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open')
    document.querySelector("#login").style.borderColor = ""
    alert.remove()
}

buttonAuth.addEventListener('click', toggleModalAuth);
buttonCloseAuth.addEventListener('click', toggleModalAuth);
modalDialogAuth.addEventListener("click", function () {
    document.querySelector("#login").style.borderColor = ""
    alert.remove()
})

function authorized() {
    function logOut() {
        login = null;
        buttonAuth.style.display = ""
        userName.style.display = ""
        buttonOut.style.display = ""
        buttonOut.removeEventListener('click', logOut)
        document.querySelector("#login").value = "";
        localStorage.removeItem("login")
        checkAuth()
    }

    userName.textContent = login
    buttonAuth.style.display = "none"
    userName.style.display = "inline"
    buttonOut.style.display = "block"
    buttonOut.addEventListener('click', logOut)
}

function noAuthorized() {
    function logIn(event) {
        event.preventDefault()
        login = document.querySelector("#login").value
        localStorage.setItem("login", login)
        if (login === "") {
            document.querySelector("#login").style.borderColor = "red"
            document.querySelector(".label-auth").before(alert)
            setTimeout(function (){
                document.querySelector("#login").style.borderColor = ""
                alert.remove()
            },1500)


        } else {
            toggleModalAuth()
            buttonAuth.removeEventListener('click', toggleModalAuth);
            buttonCloseAuth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener("submit", logIn)
            checkAuth()
        }
    }

    buttonAuth.addEventListener('click', toggleModalAuth);
    buttonCloseAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener("submit", logIn)
}

function checkAuth() {
    if (login) {
        authorized()
    } else {
        noAuthorized()
    }
}

checkAuth()
