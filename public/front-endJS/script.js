//slideshow-dots
//https://www.w3schools.com/howto/howto_js_slideshow.asp
let slideIndex = 1;
showSlides(slideIndex);

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
};

function showSlides(n) {
  let slides = document.getElementsByClassName("country");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += "active";
};
