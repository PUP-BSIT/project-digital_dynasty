document.addEventListener('DOMContentLoaded', function() {
  const navButton = document.getElementById('nav_button');
  const navMenu = document.getElementById('nav_menu');
  let isOpen = false;

  navButton.addEventListener('click', function() {
    isOpen = !isOpen;
    if (isOpen) {
      navMenu.style.left = '-20%';
      navButton.style.transform = 'translateX(calc(335% - 90px))';
    } else {
      navMenu.style.left = '-100%';
      navButton.style.transform = 'none';
    }
  });
});