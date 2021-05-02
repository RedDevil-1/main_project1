$(window).scroll(function () {
  $(".nav1").toggleClass("scrolled", $(this).scrollTop() > 40);
  $(".nav1").toggleClass("nav2", $(this).scrollTop() > 40);
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
