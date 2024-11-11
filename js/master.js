// localStorage.clear();

/* Get Items from Local Storage At The Beggining */
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
let backgroundState = localStorage.getItem("random_state");

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

/* Start of landing section */

// select Landing section
let landing = document.querySelector(".landing");

// define array of images
const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function to randamize the images
function randamizeImages() {
  if (backgroundOption === true) {
    // change background image url randomly after 5 seconds
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imgsArray.length);
      landing.style.backgroundImage = 'url("imgs/' + imgsArray[random] + '")';
    }, 1000);
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

    // remove active class from all list items
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });

    // add active class to the clicked list item [color]
    e.target.classList.add("active");
  });
});

// Switch the background options
const backgroundSpans = document.querySelectorAll(".random-background span");

backgroundSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    // remove active class from all spans items
    e.target.parentElement.querySelectorAll(".active").forEach((span) => {
      span.classList.remove("active");
    });

    // add active class to the clicked list item [color]
    e.target.classList.add("active");

    // if the person click on yes
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randamizeImages();
      // save the value into the local storage
      localStorage.setItem("random_state", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      // save the value into the local storage
      localStorage.setItem("random_state", false);
    }
  });
});

/* end of settings box section */
