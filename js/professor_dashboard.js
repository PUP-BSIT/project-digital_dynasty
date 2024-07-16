document.addEventListener("DOMContentLoaded", function() {
  var dropdown = document.querySelector(".dropdown");
  var dropdownContent = document.querySelector(".dropdown-content");

  dropdown.addEventListener("click", function() {
      dropdownContent.classList.toggle("show");
  });

  
  window.addEventListener("click", function(event) {
      if (!event.target.matches(".dropbtn")) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          for (var i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains("show")) {
                  openDropdown.classList.remove("show");
              }
          }
      }
  });
});
