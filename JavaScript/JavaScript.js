// sets cookies
function setCookie(cname, cvalue, exminutes) { // inside brackets = parameter
    var d = new Date();
    d.setTime(d.getTime() + (exminutes * 60 * 1000)); //sets time to now + minutes after which cookies are suppose to expire
    var expires = "expires="+d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
}

// gets cookies
function getCookie(cname) {
var name = cname + "="; 
var ca = document.cookie.split(';'); //split = every time it finds ; it will make it a new string in an array
// checking for the cname to be displayed
for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
    }
}
return "";
}

// loads cookies input text field
function checkCookie(){
    var user = getCookie("username");
    var organisation = getCookie("organisation");
    if (user != "" && organisation != "") {
    } else {
        user = prompt ("Please enter your name:", "");
        organisation = prompt ("Please enter your organisation:", "");
        if (user != "" && user != null && organisation != "" && organisation != null) {
            setCookie("username", user, 60); //defines minutes
            setCookie("organisation", organisation, 60);
        }
    }
}

//deletes cookies
function deleteCookie() {
    setCookie("username", "", -1); //-1 sets expire date to 1 min ago
    setCookie("organisation", "", -1);
}  

function deleteCookieRefreshFinal () {
    deleteCookie();
}

//displays mainDIV when display buttons are clicked
function showSection(id){ // takes id of section that is suppose to be displayed
    var getDiv = document.getElementById(id); // make ID shown/hidden when button is clicked
    //check state of the div
    if(getDiv.style.display === "block") { // check if ID is shown
        getDiv.style.display = "none";    // if above yes this will make it hidden
    } else {
        getDiv.style.display = "block";  //make ID shown
    }

    // when new button clicked old ID won't disappear, that why we need to add another if clause
    var getEdu = document.getElementById('educationDisplay');
    var getWork = document.getElementById('workDisplay');
    var getPro = document.getElementById('projectsDisplay');

    if(id === 'educationDisplay'){
        getWork.style.display = "none"; //hides Work when Edu button is clicked
        getPro.style.display = "none";  //hides Projects when Edu button is clicked
    } else if(id === 'workDisplay'){
        getEdu.style.display = "none";  //hides Edu when Work button is clicked
        getPro.style.display = "none";  //hides Project when Work button is clicked

    } else if(id === 'projectsDisplay'){
        getEdu.style.display = "none";  //hides Projects when Edu button is clicked
        getWork.style.display = "none"; //hides Projects when Work button is clicked
    }
}

// clear button
function clearSections(){
    var getDiv1 = document.getElementById('educationDisplay');
    var getDiv2 = document.getElementById('workDisplay');
    var getDiv3 = document.getElementById('projectsDisplay');

    getDiv1.style.display = "none"; // hides ID
    getDiv2.style.display = "none";
    getDiv3.style.display = "none";
}

// Declare a variable to keep track of the current project index
let currentProjectIndex = 0;

//gets JSON file
function showData(){
    fetch("JSON/Education.json")
    // converts json file to a useable data type
        .then(response => response.json()) 
        .then(data => createEduList(data));
    fetch("JSON/WorkExperience.json")
    // converts json file to a useable data type
        .then(response => response.json()) 
        .then(data => createWorkList(data));
    fetchProjects();
}

//Education Display
function createEduList(data) {
    const eduOL = document.createElement('ol'); //creating an ordered list (displaying json in a list format)

    //for loop that will iterate for the number of items in json. This will create a list for each item in this json.
    for (let i = 0; i <data.education.length; i++) { 
        // Create Course element
        const courseLI = document.createElement('li');
        courseLI.innerHTML = data.education[i].course; 

        // Add semester to course element
        const semesterUL = document.createElement('ul');
        const semesterLI = document.createElement('li');
        semesterLI.innerHTML = data.education[i].semester;  
        semesterUL.appendChild(semesterLI);

        // Add semester to courseLI
        courseLI.appendChild(semesterUL);
        // Append course list to eduOL
        eduOL.appendChild(courseLI);
    }
    // Add mainUL to educationDisplay
    document.getElementById("educationDisplay").appendChild(eduOL); //when button is clicked, json is displayed
}

//Work Experience Display 
function createWorkList(data) {
    const workOL = document.createElement('ol'); //creating an ordered list (displaying json in a list format)

    //for loop that will iterate for the number of items in json. This will create a list for each item in this json.
    for (let i = 0; i <data.workExperience.length; i++) { 
        // Create company element
        const companyLI = document.createElement('li');
        companyLI.innerHTML = data.workExperience[i].company;  

        // Add dates to company element
        const datesUL = document.createElement('ul');
        const datesLI = document.createElement('li');
        datesLI.innerHTML = data.workExperience[i].dates;  
        datesUL.appendChild(datesLI);

        // Add dates to companyLI
        companyLI.appendChild(datesUL);

        // Append company list to workOL
        workOL.appendChild(companyLI);
    }
    // Add mainUL to workDisplay
    document.getElementById("workDisplay").appendChild(workOL); //when button is clicked, json is displayed
}

//Projects Display
function createProjectsList(data) {
    const projectsUL = document.createElement('ul'); // creates ann unordered list

    // Clear existing projects before displaying new ones
    document.getElementById("projectSection").innerHTML = "";

    // Create title element for the current project
    const titleLI = document.createElement('li');
    titleLI.innerHTML = data.projects[currentProjectIndex].title;

    // Add year to title element
    const yearUL = document.createElement('ul');
    const yearLI = document.createElement('li');
    yearLI.innerHTML = data.projects[currentProjectIndex].year;
    yearUL.appendChild(yearLI);
    titleLI.appendChild(yearUL);
    
    // Add summary to title element
    const summaryUL = document.createElement('ul');
    const summaryLI = document.createElement('li');
    summaryLI.innerHTML = data.projects[currentProjectIndex].summary;
    summaryUL.appendChild(summaryLI);
    titleLI.appendChild(summaryUL);

    // Add link to title element;
    const aTag = document.createElement('a');
    aTag.innerHTML = 'Link to my website'; //this is what will be displayed on the html page
    aTag.setAttribute('href', data.projects[currentProjectIndex].link); //where its getting it from and what type
    aTag.setAttribute('target', '_blank'); // opens in new tab
    //Append to title element
    titleLI.appendChild(aTag); 

    // Add image to title element
    const imageUL = document.createElement('ul');

    const imageLI = document.createElement("img");
    imageLI.src = data.projects[currentProjectIndex].image;
    imageLI.style.width = "50%";
    imageLI.style.height = "50%";

    // Add event listener for "mouseenter" event on image element
    imageLI.addEventListener('mouseenter', function() {
        hover(); // when mouse enters picture, hover function will be called
    });
    // Add event listener for "mouseleave" event on image element
    imageLI.addEventListener('mouseleave', function() {
        hover(); // when mouse leaves picture, hover function will be called
    });

    //Add image to imageUL
    imageUL.appendChild(imageLI);
    //Append image list to titleLI
    titleLI.appendChild(imageUL);

    // Add description to title element
    const descriptionUL = document.createElement('ul');
    descriptionUL.setAttribute('id', 'descriptionUL'); // Add an ID for easy reference
    const descriptionLI = document.createElement('li');
    descriptionLI.innerHTML = data.projects[currentProjectIndex].description;
    //Appends descriptions to description element (unordered list in itself)
    descriptionUL.appendChild(descriptionLI);
    descriptionUL.style.display = "none"; // hides descriptionUL as a default

    //Append description list to titleLI
    titleLI.appendChild(descriptionUL);

    // Add title list to projectsUL
    projectsUL.appendChild(titleLI);

    // Add mainUL to projectsDisplay
    document.getElementById("projectSection").appendChild(projectsUL);
}

//displays description on mouse hovering
//when the cursor is placed over the image to show the description and hide it when the mouse leaves
function hover() {
    // checks current state
    if (descriptionUL.style.display === "block") {
        descriptionUL.style.display = "none"; // shows descriptionUL
    } else {
        descriptionUL.style.display = "block"; // hides descriptionUL
    }
}

//gets JSON file
// gave it its own function for the projects.json file bc we need to fetch it multiple times during our code
function fetchProjects() {
    fetch("JSON/Projects.json")
    // converts json file to a useful data type
        .then(response => response.json()) 
        .then(data => createProjectsList(data));
}

// Function to move to the next project
function next() {
    currentProjectIndex++; //we will add 1 to the currentProjectIndex
    if (currentProjectIndex >= 3) { // never greater than 3 as we have 3 elements in our json file
        currentProjectIndex = 0;
    }
    fetchProjects(); //call functions every time button is clicked
}

// Function to move to the previous project
function previous() {
    currentProjectIndex--;
    if (currentProjectIndex <0) {
        currentProjectIndex = 3 - 1;
    }
    fetchProjects();
}

// On page load, show data and attach event listeners to next and previous buttons (makes sure showData runs every time page is loaded)
window.addEventListener("load", (event) => {
    showData(); //fetched all JSON files
});

//when button is pressed while show random project and replaced with another random project after 30 sec
function surprise(max) { //max = maximum number of elements it can choose from 
    var getDiv = document.getElementById('projectsDisplay'); // make ID shown/hidden when button is clicked
    //get elements of the div ‘projectDisplay'
    getDiv.style.display = "block"; //shows the ‘projectDisplay' div
    console.log("running");
    var lastProjectIndex = currentProjectIndex; //will store what the CurrentProjectIndex is as a variable of lastProjectIndex for the use in comparisons

    // Keep picking a new random project index until it is different from the last project shown
    console.log("Start Picking:");
    // do while loop so same project doesn't get called twice
    do {
        currentProjectIndex = Math.floor(Math.random() * max); //choose a random integer for our currentProjectIndex
        console.log(currentProjectIndex);
    } while (currentProjectIndex === lastProjectIndex); //if that is the same as the lastProjectIndex, we will continue the loop but if it is changed, it will break out the loop
    console.log("Choice:");
    console.log(currentProjectIndex);
    fetchProjects(); //fetches project again to update the page
    timeoutId = setTimeout(() => { // store the timeout ID; wait 30 sec before suprise function gets called again
        surprise(max); 
    }, 30000);
}

//stops 30 sec random rotation between projects
function stop(){
    clearTimeout(timeoutId); // clear the timeout using the stored timeout ID
}