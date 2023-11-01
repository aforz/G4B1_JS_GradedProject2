let resumeData = { resume: [] };
let allCandResumes = resumeData["resume"];
let currResumeIndex = 0;

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const searchBar = document.getElementById("search");

const loader = document.getElementById("loader");
const noResultId = document.getElementById("noResultId");
const resumeTemplateId = document.getElementById("resumeTemplateId");
const employeeName = document.getElementById("name");
const appliedFor = document.getElementById("appliedFor");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const linkedin = document.getElementById("linkedin");
const technicalSkills = document.getElementById("technicalSkills");
const hobbies = document.getElementById("hobbies");
const prevCompanyDetails = document.getElementById("prevCompDetId");
const projectDetails = document.getElementById("projectDetails");
const education = document.getElementById("education");
const internship = document.getElementById("internship");
const achievements = document.getElementById("achievements");

const checkBtnsToDisplay = () => {
  if (currResumeIndex + 1 >= allCandResumes.length) {
    nextBtn.style.visibility = "hidden";
  } else {
    nextBtn.style.visibility = "visible";
  }
  if (currResumeIndex === 0) {
    previousBtn.style.visibility = "hidden";
  } else {
    previousBtn.style.visibility = "visible";
  }
};

const fillUpData = () => {
  const currentResume = allCandResumes[currResumeIndex];
  employeeName.innerText = currentResume["basics"]["name"];
  appliedFor.innerText = currentResume["basics"]["AppliedFor"];
  email.innerText = currentResume["basics"]["email"];
  phone.innerText = currentResume["basics"]["phone"];
  linkedin.href = currentResume["basics"]["profiles"]["url"];
  technicalSkills.innerHTML = `<div>${currentResume["skills"]["keywords"].map(
    (keyword) => `<p>${keyword}</p>`
  )}</div>`.replaceAll(",", "");
  hobbies.innerHTML = `<div>${currentResume["interests"]["hobbies"].map(
    (keyword) => `<p>${keyword}</p>`
  )}</div>`.replaceAll(",", "");
  prevCompanyDetails.innerHTML = `<div>${Object.keys(
    currentResume["work"]
  ).map(
    (key) =>
      `<p class="detail-padding"><b>${key}</b>: ${currentResume["work"][key]}</p>`
  )}</div>`.replaceAll(",", "");
  projectDetails.innerHTML = `<p class="detail-padding"><b>${currentResume["projects"]["name"]}</b>:${currentResume["projects"]["description"]}</p>`;
  education.innerHTML = `<ul>${Object.keys(currentResume["education"]).map(
    (education) =>
      `<li><b>${education}:</b> ${Object.keys(
        currentResume["education"][education]
      ).map(
        (eduDataKey) =>
          `<span> ${currentResume["education"][education][eduDataKey]}</span>`
      )}</li>`
  )}</ul>`.replaceAll(",", "");
  internship.innerHTML = `<ul>${Object.keys(currentResume["Internship"]).map(
    (key) => `<li><b>${key}</b>: ${currentResume["Internship"][key]}</li>`
  )}</ul>`.replaceAll(",", "");
  achievements.innerHTML = `<ul>${currentResume["achievements"]["Summary"].map(
    (achievement) => `<li>${achievement}</li>`
  )}</ul>`.replaceAll(",", "");
};

const validateUser = () => {
  const username = window.localStorage.getItem("username");
  const password = window.localStorage.getItem("password");
  if (!username || !password) {
    window.location.href = "./login.html";
  }
};

const checkResumes = () => {
  if (allCandResumes.length > 0) {
    noResultId.style.display = "none";
    resumeTemplateId.style.display = "block";
  } else {
    noResultId.style.display = "flex";
    resumeTemplateId.style.display = "none";
  }
};

validateUser();

fetch("../resources/data/Data.json")
  .then((response) => response.json())
  .then((respData) => {
    loader.style.display = "none";
    resumeData = respData;
    allCandResumes = resumeData["resume"];
    checkResumes();
    checkBtnsToDisplay();
    fillUpData();
  })
  .catch((error) => {
    alert(
      "Page Unable to load file, Please click on OK to Load the data from local."
    );
    loader.style.display = "none";
    resumeData = data;
    allCandResumes = resumeData["resume"];
    checkResumes();
    checkBtnsToDisplay();
    fillUpData();
  });

searchBar.oninput = function (event) {
  const searchInput = event.target.value;
  if (searchInput.length > 0) {
    allCandResumes = resumeData["resume"].filter((resume) =>
      resume["basics"]["AppliedFor"]
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
  } else {
    allCandResumes = resumeData["resume"];
  }
  currResumeIndex = 0;
  if (allCandResumes.length > 0) fillUpData();
  checkResumes();
  checkBtnsToDisplay();
};

const previousButton = () => {
  currResumeIndex -= 1;
  fillUpData();
  checkBtnsToDisplay();
};

const nextButton = () => {
  currResumeIndex += 1;
  fillUpData();
  checkBtnsToDisplay();
};

checkBtnsToDisplay();
