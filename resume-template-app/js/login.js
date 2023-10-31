const userValidation = [
  {
    username: "Afroz",
    password: "Alam",
  },
  {
    username: "Nikita",
    password: "Sirvi",
  },
  {
    username: "admin",
    password: "admin",
  },
  {
    username: "user",
    password: "user",
  },
];


const loginForm = document.getElementById("lForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error");

// always clear error message when user change the value
usernameInput.onfocus = clearError;
passwordInput.onfocus = clearError;

// will prevent the user to go back to login page
window.history.forward();
function noBack() {
  window.history.forward();
}

function clearError() {
  errorMessage.innerText = "";
}

loginForm.onsubmit = function (event) {
  onLoginClick(event);
};

function onLoginClick(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const currentUser = userValidation.find((userData) => {
    return userData.username === username;
  });
  if (!currentUser) {
    errorMessage.innerText = "invalid username/password";
  } else if (currentUser.password === password) {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);
    window.location.href = "./resume-template.html";
  } else {
    errorMessage.innerText = "Invalid Credentials";
  }
}
