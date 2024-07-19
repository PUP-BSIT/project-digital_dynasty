// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initializeCharts);

// Mapping chart types to their corresponding data-fetching PHP scripts
const chartData = {
  'Students': 'fetch_students_chart_data.php',
  'Programs': 'fetch_programs_chart_data.php',
  'Total Students': 'fetch_total_students_chart_data.php',
  'Professors': 'fetch_professors_chart_data.php'
};

// Initialize default charts or leave empty if no default
function initializeCharts() {
  // Optional: Initialize default chart if needed
}

// Show chart based on chartType
function showChart(chartType) {
  document.getElementById('chartTitle').innerText = chartType;
  fetch(chartData[chartType])
    .then(response => response.json())
    .then(data => {
      drawChart(chartType, data);
    })
    .catch(error => console.error('Error fetching chart data:', error));

  document.getElementById('chartModal').style.display = 'block';
}

// Draw the chart based on chartType and data
function drawChart(chartType, data) {
  let chart;
  const dataTable = google.visualization.arrayToDataTable(data);
  const options = { title: chartType, is3D: true };

  switch (chartType) {
    case 'Students':
    case 'Programs':
    case 'Professors':
      chart = new google.visualization.PieChart(document.getElementById('chart'));
      break;
    case 'Total Students':
      chart = new google.visualization.BarChart(document.getElementById('chart'));
      break;
    default:
      console.error('Unknown chart type:', chartType);
      return;
  }

  chart.draw(dataTable, options);
}

// Hide the chart modal
function hideChart() {
  document.getElementById('chartModal').style.display = 'none';
}

// Handle the list type change
function changeList() {
  const select = document.getElementById('listSelect');
  const selectedValue = select.value;
  const newUrl = `?listType=${selectedValue}`;
  window.location.href = newUrl;
}

// Event listener for the close button
document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.querySelector('.modal .close');
  if (closeButton) {
    closeButton.addEventListener('click', hideChart);
  }

  // Attach click event listeners to top menu items
  const topMenuItems = document.querySelectorAll('.top-menu div');
  topMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      const chartType = item.querySelector('p').innerText;
      showChart(chartType);
    });
  });
});
