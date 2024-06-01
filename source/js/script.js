let navigation = document.querySelector('.main-navigation');
let navigationList = document.querySelector('.main-navigation__list');
let burger = document.querySelector('.burger-menu');
navigationList.classList.remove('no-js');
navigation.classList.remove('no-js');
burger.classList.remove('no-js-burger');
navigation.classList.remove('active');
burger.onclick = function() {
  this.classList.toggle('active');
  navigation.classList.toggle('active');
};
