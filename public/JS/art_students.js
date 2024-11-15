function loadArtStudents() {
    fetch('/api/art')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const studentsContainer = document.getElementById('students');
            
            data.forEach(student => {
                const div = document.createElement('div');
                div.className = 'student_card';
                
                div.innerHTML = `
                    <div class="img">
                        <img src="${student.art_photo_url}" alt="Student Image">
                    </div>
                    <h3 class="student_name ${student.gender}">${student.student_name}</h3>
                `;
                
                studentsContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

window.onload = loadArtStudents;
