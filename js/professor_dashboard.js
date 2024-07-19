document.addEventListener('DOMContentLoaded', () => {
    let isEditingAll = false;

    // Fetch initial data
    fetch('../php/prof_dashboard.php')
        .then(response => response.json())
        .then(data => {
            if (data.prof_name !== 'Not found') {
                document.getElementById('prof_name').textContent = data.prof_name;
                document.getElementById('class_no').textContent = data.class_no;
                document.getElementById('course_name').textContent = data.course_code;

                const attendanceTable = document.getElementById('attendance_table').getElementsByTagName('tbody')[0];
                data.attendance.forEach(record => {
                    const row = attendanceTable.insertRow();
                    row.setAttribute('data-student-no', record.student_no); // Store student_no for update

                    row.insertCell(0).textContent = record.firstname;
                    row.insertCell(1).textContent = record.lastname;

                    const statusCell = row.insertCell(2);
                    const statusSelect = document.createElement('select');
                    statusSelect.innerHTML = `
                        <option value="Present" ${record.status === 'Present' ? 'selected' : ''}>Present</option>
                        <option value="Absent" ${record.status === 'Absent' ? 'selected' : ''}>Absent</option>
                    `;
                    statusSelect.style.display = 'none'; // Hide the select element initially
                    statusCell.appendChild(statusSelect);
                    statusCell.insertAdjacentHTML('beforeend', `<span>${record.status}</span>`); // Display the status

                    const actionCell = row.insertCell(3);
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.classList.add('edit-btn');
                    actionCell.appendChild(editButton);

                    const saveButton = document.createElement('button');
                    saveButton.textContent = 'Save';
                    saveButton.classList.add('save-btn');
                    saveButton.style.display = 'none'; // Initially hidden
                    actionCell.appendChild(saveButton);

                    // Add event listener to row edit button
                    editButton.addEventListener('click', () => {
                        if (!isEditingAll && confirm('Do you want to edit this row?')) {
                            toggleRowEditing(row, true);
                            document.getElementById('save_all_button').disabled = false; // Enable "Save All" button
                        }
                    });

                    // Add event listener to row save button
                    saveButton.addEventListener('click', () => {
                        if (confirm('Do you want to save changes to this row?')) {
                            saveRowChanges(row);
                        }
                    });
                });

                // Add event listener to "Edit All" button
                document.getElementById('edit_all_button').addEventListener('click', () => {
                    if (!isEditingAll && confirm('Do you want to edit all rows?')) {
                        isEditingAll = true;
                        toggleAllEditing(true);
                        document.getElementById('save_all_button').disabled = false; // Enable "Save All"
                    }
                });

                // Add event listener to "Save All" button
                document.getElementById('save_all_button').addEventListener('click', () => {
                    if (isEditingAll && confirm('Do you want to save all changes?')) {
                        saveAllChanges();
                    }
                });
            } else {
                console.error('Professor information not found.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    function toggleRowEditing(row, isEditing) {
        const statusSelect = row.querySelector('select');
        const statusSpan = row.querySelector('span');
        const saveButton = row.querySelector('.save-btn');
        const editButton = row.querySelector('.edit-btn');

        if (statusSelect) {
            statusSelect.style.display = isEditing ? 'inline' : 'none';
        }
        if (statusSpan) {
            statusSpan.style.display = isEditing ? 'none' : 'inline';
        }
        if (saveButton) {
            saveButton.style.display = isEditing ? 'inline' : 'none';
        }
        if (editButton) {
            editButton.style.display = isEditing ? 'none' : 'inline';
        }
    }

    function toggleAllEditing(isEditing) {
        document.querySelectorAll('#attendance_table select').forEach(select => select.style.display = isEditing ? 'inline' : 'none');
        document.querySelectorAll('#attendance_table span').forEach(span => span.style.display = isEditing ? 'none' : 'inline');
        document.querySelectorAll('.edit-btn').forEach(button => button.style.display = isEditing ? 'none' : 'inline');
        document.querySelectorAll('.save-btn').forEach(button => button.style.display = isEditing ? 'inline' : 'none');
    }

    function saveRowChanges(row) {
        const studentNo = row.getAttribute('data-student-no');
        const statusSelect = row.querySelector('select');
        const statusSpan = row.querySelector('span');

        if (!statusSelect || !statusSpan) {
            console.error('Status select or span element not found for student number:', studentNo);
            return;
        }

        const newStatus = statusSelect.value;

        fetch('../php/update_attendance.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                student_no: studentNo,
                class_no: document.getElementById('class_no').textContent,
                status: newStatus
            })
        })
        .then(response => response.text())
        .then(responseText => {
            if (responseText.trim() === 'success') {
                statusSpan.textContent = newStatus;
                statusSelect.style.display = 'none';
                statusSpan.style.display = 'inline';
                // Update row to "Edit" state after saving
                row.querySelector('.save-btn').style.display = 'none';
                row.querySelector('.edit-btn').style.display = 'inline';
                checkIfAllSaved(); // Check if all changes are saved
            } else {
                console.error('Failed to update status for student number:', studentNo);
            }
        })
        .catch(error => console.error('Error updating status for student number:', studentNo, error));
    }

    function saveAllChanges() {
        const promises = Array.from(document.querySelectorAll('#attendance_table tr')).map(row => {
            const studentNo = row.getAttribute('data-student-no');
            const statusSelect = row.querySelector('select');
            const statusSpan = row.querySelector('span');

            if (!statusSelect || !statusSpan) {
                console.error('Status select or span element not found for student number:', studentNo);
                return Promise.resolve(); // Skip this row
            }

            const newStatus = statusSelect.value;

            return fetch('../php/update_attendance.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    student_no: studentNo,
                    class_no: document.getElementById('class_no').textContent,
                    status: newStatus
                })
            })
            .then(response => response.text())
            .then(responseText => {
                if (responseText.trim() === 'success') {
                    statusSpan.textContent = newStatus;
                    statusSelect.style.display = 'none';
                    statusSpan.style.display = 'inline';
                    // Update row to "Edit" state after saving
                    row.querySelector('.save-btn').style.display = 'none';
                    row.querySelector('.edit-btn').style.display = 'inline';
                } else {
                    console.error('Failed to update status for student number:', studentNo);
                }
            })
            .catch(error => console.error('Error updating status for student number:', studentNo, error));
        });

        Promise.all(promises)
            .then(() => {
                // Once all updates are complete, reset editing state and button
                toggleAllEditing(false);
                isEditingAll = false;
                document.getElementById('save_all_button').disabled = true; // Disable "Save All"
            })
            .catch(error => console.error('Error saving all changes:', error));
    }

    function checkIfAllSaved() {
        const allRows = Array.from(document.querySelectorAll('#attendance_table tr'));
        const anyRowEditing = allRows.some(row => row.querySelector('.save-btn').style.display === 'inline');

        if (!anyRowEditing) {
            document.getElementById('save_all_button').disabled = true;
        }
    }
});
