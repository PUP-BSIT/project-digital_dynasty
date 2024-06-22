document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackTextarea = document.getElementById('feedback');
    const feedbackMessage = document.getElementById('feedback-message');
    const selectedDetailsContent = document.getElementById
          ('selected-details-content');
  
    function addDetailToSelectedDetails(detail) {
      const detailElement = document.createElement('p');
      detailElement.textContent = detail;
      selectedDetailsContent.appendChild(detailElement);
    }
  
    const nameElement = document.getElementById('name');
    nameElement.addEventListener('click', function() {
      addDetailToSelectedDetails('Name: ' + nameElement.textContent);
    });
  
    const idElement = document.getElementById('id');
    idElement.addEventListener('click', function() {
      addDetailToSelectedDetails('ID: ' + idElement.textContent);
    });
  
    const programElement = document.getElementById('program');
    programElement.addEventListener('click', function() {
      addDetailToSelectedDetails('Program: ' + programElement.textContent);
    });
  
    const batchElement = document.getElementById('batch');
    batchElement.addEventListener('click', function() {
      addDetailToSelectedDetails('Batch: ' + batchElement.textContent);
    });
  
    feedbackForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const feedbackValue = feedbackTextarea.value.trim();
      if (feedbackValue !== '') {
        const feedbackEntry = document.createElement('p');
        feedbackEntry.textContent = 'Feedback: ' + feedbackValue;
        selectedDetailsContent.appendChild(feedbackEntry);
        feedbackMessage.textContent = 'Feedback submitted successfully!';
        feedbackTextarea.value = '';
      } else {
        feedbackMessage.textContent = 'Please enter your feedback.';
      }
    });
  });
  