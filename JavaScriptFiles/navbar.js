$(window).scroll(function () {
  $("nav").toggleClass("scrolled", $(this).scrollTop() > 100);
  $("nav").toggleClass("navbar-dark", $(this).scrollTop() > 100);
});
function openNav() {
  document.getElementById("mySidebar").style.width = "100%";
  document.getElementById("main").style.marginRight = "0";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
