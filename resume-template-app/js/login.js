let username = document.getElementById("username");
let password = document.getElementById("password");
let form = document.getElementById("form");
let error = document.getElementById("error");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  for (let cred of credentials) {
    console.log(cred.username, username.value);
    if (cred.username === username.value && cred.password === password.value) {
      location.replace("../pages/template.html");
    }
  }
  error.style.display = "block";
}
