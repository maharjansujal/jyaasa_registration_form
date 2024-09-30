function loadArtStudents() {
    fetch('/api/art')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const artStudentsBody = document.getElementById('artStudentsBody');
            artStudentsBody.innerHTML = ''; // Clear previous entries

            // Create rows for each student
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.student_name}</td>
                    <td>${student.guardian_name}</td>
                `;
                artStudentsBody.appendChild(row);
            });
            form_no = data.length
            console.log(form_no)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Call loadArtStudents when the page loads
window.onload = loadArtStudents;
