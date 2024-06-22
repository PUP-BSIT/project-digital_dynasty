document.addEventListener('DOMContentLoaded', function() {
    fetchAttendanceData();
  });
  
  function fetchAttendanceData() {
    fetch('../php/admin_connect.php')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('attendance-data');
        tableBody.innerHTML = ''; 
  
        data.forEach((item, index) => {
          const row = document.createElement('tr');
  
          const cell1 = document.createElement('td');
          cell1.textContent = index + 1;
          row.appendChild(cell1);
  
          const cell2 = document.createElement('td');
          cell2.textContent = item.lastname;
          row.appendChild(cell2);
  
          const cell3 = document.createElement('td');
          cell3.textContent = item.firstname;
          row.appendChild(cell3);
  
          const cell4 = document.createElement('td');
          cell4.textContent = item.student_number;
          row.appendChild(cell4);
  
          const cell5 = document.createElement('td');
          cell5.textContent = item.class_no;
          row.appendChild(cell5);
  
          const cell6 = document.createElement('td');
          cell6.textContent = item.date;
          row.appendChild(cell6);
  
          const cell7 = document.createElement('td');
          cell7.textContent = item.status;
          row.appendChild(cell7);
  
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  