let navMain = document.querySelector('.main-navigation');
let navBurger = document.querySelector('.navigation__burger');

navMain.classList.remove('main-navigation--nojs');

navBurger.addEventListener('click', function () {
  if (navMain.classList.contains('main-navigation--closed')) {
    navMain.classList.remove('main-navigation--closed');
    navMain.classList.add('main-navigation--opened');
  } else {
    navMain.classList.add('main-navigation--closed');
    navMain.classList.remove('main-navigation--opened');
  }
});
