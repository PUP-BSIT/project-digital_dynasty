document.addEventListener("DOMContentLoaded", function () {
  changeList(); // Load initial data
});

function changeList() {
  const listType = document.getElementById("listSelect").value;
  const title = listType === "professor" ? "Professor List" : "Student List";
  document.getElementById("listTitle").textContent = title;

  const tableHeader = document.getElementById("tableHeader");
  tableHeader.innerHTML = `
    <tr>
      <th>#</th>
      <th>Last Name</th>
      <th>First Name</th>
      <th>Email</th>
      <th>Phone Num</th>
      <th>Gender</th>
      <th>Age</th>
    </tr>
  `;

  fetchAttendanceData(listType);
}

function fetchAttendanceData(listType) {
  const url = `../php/admin_connect.php?type=${listType}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("attendance-data");
      tableBody.innerHTML = "";

      data.forEach((item, index) => {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = index + 1;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = item.lastname;
        row.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.textContent = item.firstname;
        row.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.textContent = item.email;
        row.appendChild(cell4);

        const cell5 = document.createElement("td");
        cell5.textContent = item.phone_num;
        row.appendChild(cell5);

        const cell6 = document.createElement("td");
        cell6.textContent = item.gender;
        row.appendChild(cell6);

        const cell7 = document.createElement("td");
        cell7.textContent = item.age;
        row.appendChild(cell7);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

document.getElementById("logout").addEventListener("click", function () {
  window.location = "../index.html";
});

function showChart(category) {
  document.getElementById("chartTitle").innerText = category + " Chart";
  document.getElementById("chartModal").style.display = "block";

  const ctx = document.getElementById("myChart").getContext("2d");

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: category,
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function hideChart() {
  document.getElementById("chartModal").style.display = "none";
}
