let currentResume;
let currentIndex = 0;
let resumeData;
let appliedFor = document.getElementById("applied-for");
let technicalSkillsUl = document.getElementById("technical-skills-ul");
let hobbiesUl = document.getElementById("hobbies-ul");
let workExperienceDiv = document.getElementById("work-experience-div");
let resumeName = document.getElementById("resume-name");
let phoneNo = document.getElementById("phone-no");
let email = document.getElementById("email");
let linkedin = document.getElementById("linkedin-href");

let error = document.getElementById("error");
let resumeDiv = document.getElementById("resume");

let userImage = document.getElementById("img");

let companyName = document.getElementById("company-name-p");
let companyPosition = document.getElementById("position-p");
let companyStartDate = document.getElementById("start-date-p");
let companyEndDate = document.getElementById("end-date-p");
let companySummary = document.getElementById("summary-p");

let projectDesc = document.getElementById("project-p");
let projectSpan = document.getElementById("project-span");

let educationUG = document.getElementById("ug-p");
let educationPU = document.getElementById("pu-p");
let educationHS = document.getElementById("hs-p");

let intCompanyName = document.getElementById("int-company-name-p");
let intCompanyPosition = document.getElementById("int-position-p");
let intCompanyStartDate = document.getElementById("int-start-date-p");
let intCompanyEndDate = document.getElementById("int-end-date-p");
let intCompanySummary = document.getElementById("int-summary-p");

let achievements = document.getElementById("achievements-ul");

let previousButton = document.getElementById("previous-button");
let nextButton = document.getElementById("next-button");

let search = document.getElementById("search");

window.onload = () => {
  if (data.resume.length != 0) {
    error.style.display = "none";

    resumeData = data.resume;
    currentResume = resumeData[currentIndex];
    previousButton.disabled = true;
    if (resumeData.length <= 1) { nextButton.disabled = true; }
    updateResumeHtml();
  } else {
    previousButton.disabled = true;
    nextButton.disabled = true;
    error.style.display = "block";
    resume.style.display = "none";
  }
};

function updateResumeHtml() {
  appliedFor.innerHTML = currentResume.basics.AppliedFor;
  resumeName.innerHTML = currentResume.basics.name;
  phoneNo.innerHTML = currentResume.basics.phone;
  email.innerHTML = currentResume.basics.email;
  linkedin.innerHTML = currentResume.basics.profiles.url;

  companyName.innerHTML =
    "<span class='company-name-span'>Company Name: </span>" +
    currentResume.work["Company Name"];
  companyPosition.innerHTML =
    "<span class='position-span'>Position: </span>" +
    currentResume.work.Position;
  companyStartDate.innerHTML =
    "<span class='start-date-span'>Start Date: </span>" +
    currentResume.work["Start Date"];
  companyEndDate.innerHTML =
    "<span class='end-date-span'>End Date: </span>" +
    currentResume.work["End Date"];
  companySummary.innerHTML =
    "<span class='summary-span'>Summary: </span>" + currentResume.work.Summary;

  projectSpan.innerHTML = currentResume.projects.name;
  projectDesc.innerHTML += ": " + currentResume.projects.description;

  educationUG.innerHTML =
    "<span class='education-span'>UG: </span>" +
    currentResume.education.UG.institute +
    ", " +
    currentResume.education.UG.course +
    ", " +
    currentResume.education.UG["Start Date"] +
    ", " +
    currentResume.education.UG["End Date"] +
    ", " +
    currentResume.education.UG["cgpa"];
  educationPU.innerHTML =
    "<span class='education-span'>PU: </span>" +
    currentResume.education["Senior Secondary"].institute +
    ", " +
    currentResume.education["Senior Secondary"].cgpa;
  educationHS.innerHTML =
    "<span class='education-span'>High School: </span>" +
    currentResume.education["High School"].institute +
    ", " +
    currentResume.education["High School"].cgpa;

  intCompanyName.innerHTML =
    "<span class='company-name-span'>Company Name: </span>" +
    currentResume.Internship["Company Name"];
  intCompanyPosition.innerHTML =
    "<span class='position-span'>Position: </span>" +
    currentResume.Internship.Position;
  intCompanyStartDate.innerHTML =
    "<span class='start-date-span'>Start Date: </span>" +
    currentResume.Internship["Start Date"];
  intCompanyEndDate.innerHTML =
    "<span class='end-date-span'>End Date: </span>" +
    currentResume.Internship["End Date"];
  intCompanySummary.innerHTML =
    "<span class='summary-span'>Summary: </span>" +
    currentResume.Internship.Summary;

  userImage.src = currentResume.basics.image
    ? currentResume.basics.image
    : "../assets/candidate.png";

  updateTechnicalSkills(currentResume.skills.keywords);
  updateHobbies(currentResume.interests.hobbies);
  updateAchievements(currentResume.achievements.Summary);
}

function updateTechnicalSkills(keywords) {
  let str = "";
  for (const skill of keywords) {
    str += `<li class='technical-skills-li'>${skill}</li>`;
  }
  technicalSkillsUl.innerHTML = str;
}

function updateHobbies(keywords) {
  let str = "";
  for (const hobby of keywords) {
    str += `<li class='hobbies-li'>${hobby}</li>`;
  }
  hobbiesUl.innerHTML = str;
}

function updateAchievements(keywords) {
  let str = "";
  for (const ach of keywords) {
    str += `<li class='ach-li'>${ach}</li>`;
  }
  achievements.innerHTML = str;
}

previousButton.addEventListener("click", (e) => {
  if (currentIndex > 0) {
    nextButton.disabled = false;
    currentIndex--;
    currentResume = resumeData[currentIndex];
    updateResumeHtml();
  }

  if (currentIndex == 0) previousButton.disabled = true;
});

nextButton.addEventListener("click", (e) => {
  if (currentIndex < resumeData.length - 1) {
    previousButton.disabled = false;
    currentIndex++;
    currentResume = resumeData[currentIndex];
    updateResumeHtml();
  }

  if (currentIndex == resumeData.length - 1) nextButton.disabled = true;
});

search.addEventListener("input", (e) => {
  previousButton.disabled = true;
  nextButton.disabled = true;

  let searchedValue = e.target.value;
  resumeData = [];
  for (const resume of data.resume) {
    if (resume.basics.AppliedFor.toLowerCase() === searchedValue.toLowerCase())
      resumeData.push(resume);
  }
  currentIndex = 0;
  if (resumeData.length != 0) {
    error.style.display = "none";
    resumeDiv.style.display = "flex";
    if (resumeData.length > 1) nextButton.disabled = false;
    currentResume = resumeData[currentIndex];
    updateResumeHtml();
  } else {
    error.style.display = "block";
    resumeDiv.style.display = "none";
  }
});
