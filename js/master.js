/* start of local storage */
// Get Items from Local Storage At The Beggining
let mainColor = localStorage.getItem("color_option");

// check if there an saved value in the local storage
if (mainColor !== null) {
  // get the value
  document.documentElement.style.setProperty("--main-color", mainColor);

  // remove active class from all list items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// variable to randamize the images
let backgroundInterval;

// notice this value is string not boolean
let backgroundState = localStorage.getItem("random_option");

// check if there an saved value in the local storage
if (backgroundState !== null) {
  // remove active class from all list items
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundState === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
  }
}
/* end of local storage */

/* Start of landing section */
// select Landing section
let landing = document.querySelector(".landing");

// define array of images
const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function to randamize the images
function randamizeImages() {
  if (backgroundOption) {
    // change background image url randomly after 5 seconds
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imgsArray.length);
      landing.style.backgroundImage = 'url("imgs/' + imgsArray[random] + '")';
    }, 10000);
  }
}
randamizeImages(); // call the function
/* end of landing section */

/* start of settings box section */

// toggle spin class on icon
document.querySelector(".settings-box .icon .fa-gear").onclick = function () {
  // toggle the icon [add class open & remove]
  this.classList.toggle("fa-spin");

  // toggle the box [add class open & remove]
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch the page colors
const colorLis = document.querySelectorAll(".colors-list li");

colorLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set the clicked color to be the main color of the page
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // save the value into the local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    /*
    Function Desciption:
      - function responsible to set active location on clicked element & remove it from others
    */
    handleActiveClass(e);
  });
});

// Switch the background options
const backgroundSpans = document.querySelectorAll(".random-background span");

backgroundSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    /*
    Function Desciption:
      - function responsible to set active location on clicked element & remove it from others
    */
    handleActiveClass(e);

    // if the person click on yes
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randamizeImages();
      // save the value into the local storage
      localStorage.setItem("random_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      // save the value into the local storage
      localStorage.setItem("random_option", false);
    }
  });
});
/* end of settings box section */

/* start of skills secion */
// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // get the skill offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // get the outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // get the window height
  let windowHeight = this.innerHeight;

  // get the scrolled value
  let windowScrollTop = this.pageYOffset;

  // check if the window scrolled to the skills section
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // get all the skills
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    // loop on each skill then make its width equal to its data-progress
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
/* end of skills secion */

/* start of gallery section */
// create a popup with the image
let gallery = document.querySelectorAll(".gallery img");

// loop on each image
gallery.forEach((img) => {
  // check if the image clicked
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // add class to the overlay
    overlay.className = "popup-overlay";

    // append the overlay div to the body
    document.body.appendChild(overlay);

    // create a popup box
    let popupBox = document.createElement("div");

    // add class to popup box
    popupBox.className = "popup-box";

    // add the image into the popup box
    let popupImage = document.createElement("img");

    // set the image source to this popup box
    popupImage.src = img.src;

    // append the image to the popup box
    popupBox.appendChild(popupImage);

    // append the popup box to the body
    document.body.appendChild(popupBox);

    // check if the image has an alternative
    if (img.alt != null) {
      // create an heading to display the alternate value
      let imgHeading = document.createElement("h3");

      // create text node for the head of the image
      let imgText = document.createTextNode(img.alt);

      // append the text node to the heading of the image
      imgHeading.appendChild(imgText);

      // append the heading to the popup box
      popupBox.prepend(imgHeading);

      // create closing span
      let closeButton = document.createElement("span");

      // add class to the closing span
      closeButton.className = "close-button";

      // create text node for the closing span
      let closeButtonTextNode = document.createTextNode("X");

      // append the text node to the closing span of the span
      closeButton.appendChild(closeButtonTextNode);

      // append the closing span to the popup box
      popupBox.prepend(closeButton);
    }
  });
});

// check if the user clicked the close button
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    // remove the current popup [notice that the popup is the parent of the clicked button]
    e.target.parentNode.remove();

    // also remove the popup overlay
    document.querySelector(".popup-overlay").remove();
  }
});
/* end of gallery section */

/* start bullets navigation section */
// select all the bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
/*
  Function Desciption:
    - function responsible to scroll to specific location depend on where u clicked
*/
scrollToLocation(allBullets);

// select all the Links @ Header
const allLinks = document.querySelectorAll(".links a");
/*
  Function Desciption:
    - function responsible to scroll to specific location depend on where u clicked
*/
scrollToLocation(allLinks);

// get all bullets spans
const bulletsSpans = document.querySelectorAll(".bullets-options span");

// get the bullets container
const bulletContainer = document.querySelector(".nav-bullets");

// get the local item to save it into the local storage
let bulletLocalItem = localStorage.getItem("bullets_option");

// Check if there is an item into the local storage
if (bulletLocalItem !== null) {
  // loop on all the spans to remove the active class
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
  });

  // check if the value in the local storage is 'block' this means that the bullets will be shown
  if (bulletLocalItem === "block") {
    bulletContainer.style.display = "block";
    document.querySelector(".bullets-options .yes").classList.add("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".bullets-options .no").classList.add("active");
  }
}

// Loop on all spans to check which span has been clicked
bulletsSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    /*
    Function Desciption:
      - function responsible to set active location on clicked element & remove it from others
    */
    handleActiveClass(e);

    // If the user clicked on yes on option then shows the bullets
    if (span.dataset.display === "show") {
      bulletContainer.style.display = "block";
      // save the value into the local storage
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
  });
});

/* end bullets navigation section */

/* Start of reset Button */
document.querySelector(".reset-options").onclick = () => {
  // Option 1: If u want to clear all the local storage
  // localStorage.clear();

  // Option 2: If u want to reset specific values
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("random_option");
  localStorage.removeItem("color_option");

  // Reload the window to get the cleared values
  window.location.reload();
};
/* End of reset Button */

/* start of creating Generic Functions */
/*
  Function Desciption:
    - function responsible to scroll to specific location depend on where u clicked
*/
function scrollToLocation(locations) {
  locations.forEach((location) => {
    location.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

/*
  Function Desciption:
    - function responsible to set active location on clicked element & remove it from others
*/
function handleActiveClass(event) {
  // Remove all active class from all its siblings
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class to the element its self
  event.target.classList.add("active");
}
/* end of creating Generic Functions */

/* start of menu toggle logic */

// get the toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let links = document.querySelector(".links-container .links");

// check if the button has been clicked
toggleButton.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  // toggle the class 'menu-active' on the button
  this.classList.toggle("menu-active");

  // toggle the class 'open' on the links
  links.classList.toggle("open");
};

// click anywhere outside menu and the toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== links) {
    // check if the menu is opened
    if (links.classList.contains("open")) {
      // toggle the class 'menu-active' on the button
      toggleButton.classList.toggle("menu-active");

      // toggle the class 'open' on the links
      links.classList.toggle("open");
    }
  }
});

// stop propagation on menu
links.onclick = function (e) {
  e.stopPropagation();
};

/* end of menu toggle logic */
