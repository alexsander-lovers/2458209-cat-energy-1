let navigation = document.querySelector('.main-navigation');
let burger = document.querySelector('.burger-menu');
navigation.classList.remove('active');
burger.onclick = function() {
  this.classList.toggle('active');
  navigation.classList.toggle('active');
};
