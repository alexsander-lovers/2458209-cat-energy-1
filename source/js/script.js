document.querySelector('.burger-menu').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.main-navigation').classList.toggle('active');
})
