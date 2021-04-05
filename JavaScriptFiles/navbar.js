$(window).scroll(function(){
$('nav').toggleClass('scrolled',$(this).scrollTop()> 100);
$('nav').toggleClass('navbar-dark',$(this).scrollTop()> 100);
});