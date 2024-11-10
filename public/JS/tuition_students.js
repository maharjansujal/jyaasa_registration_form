function loadTuitionStudents() {
    fetch('/api/tuition')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.sort((a, b) => a.student_name.localeCompare(b.student_name));
            const tuitionStudentsBody = document.getElementById('tuitionStudentsBody');
            tuitionStudentsBody.innerHTML = '';
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.student_name}</td>
                    <td>${student.Age}</td>
                    <td>${student.joining_date}</td>
                `;
                tuitionStudentsBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

window.onload = loadTuitionStudents;