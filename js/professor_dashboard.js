function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      if (section.id === sectionId) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }
  
  function logout() {
    alert('Logging out...');
  }
  
  document.getElementById('course_Form').addEventListener
    ('submit', function (e) {
    e.preventDefault();
  
    const courseName = document.getElementById('courseName').value;
    const courseCode = document.getElementById('courseCode').value;
    const studentsEnrolled = document.getElementById('studentsEnrolled').value;
  
    const table = document.querySelector('#courses table tbody');
    const newRow = document.createElement('tr');
  
    newRow.innerHTML = `
      <td>${courseName}</td>
      <td>${courseCode}</td>
      <td>${studentsEnrolled}</td>
      <td><button onclick="editCourse(this)">Edit</button> 
      <button onclick="deleteCourse(this)">Delete</button></td>
    `;
  
    table.appendChild(newRow);
  
    document.getElementById('course_Form').reset();
    document.getElementById('course_Form').style.display = 'none';
  });
  
  function showCourseForm() {
    document.getElementById('course_Form').style.display = 'block';
  }
  
  function editCourse(button) {
    const row = button.parentNode.parentNode;
    const courseName = row.children[0].textContent;
    const courseCode = row.children[1].textContent;
    const studentsEnrolled = row.children[2].textContent;
  
    document.getElementById('courseName').value = courseName;
    document.getElementById('courseCode').value = courseCode;
    document.getElementById('studentsEnrolled').value = studentsEnrolled;
  
    row.remove();
    document.getElementById('course_Form').style.display = 'block';
  }
  
  function deleteCourse(button) {
    button.parentNode.parentNode.remove();
  }
  
  document.getElementById('profileForm').addEventListener
    ('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    alert(`Profile updated:\nName: ${name}\nEmail: ${email}`);
  
    document.getElementById('profileForm').reset();
  });
  
  document.getElementById('settingsForm').addEventListener
    ('submit', function (e) {
    e.preventDefault();
  
    const password = document.getElementById('password').value;
    const notifications = document.getElementById('notifications').value;
  
    alert(`Settings updated:\nPassword: ${password}\nEmail Notifications: 
        ${notifications}`);
  
    document.getElementById('settingsForm').reset();
  });
  
  document.getElementById('announcementForm').addEventListener
    ('submit', function (e) {
    e.preventDefault();
  
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;
  
    const announcementsContainer = document.getElementById('announcements');
    const announcementBox = document.createElement('div');
    announcementBox.classList.add('announcement-box');
  
    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
  
    const contentElement = document.createElement('p');
    contentElement.textContent = content;
  
    announcementBox.appendChild(titleElement);
    announcementBox.appendChild(contentElement);
  
    announcementsContainer.appendChild(announcementBox);
  
    // Reset form
    document.getElementById('announcementForm').reset();
  });
  