function loadTuitionStudents() {
    fetch('/api/tuition')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const loadingElement = document.getElementById('loading');
            loadingElement.style.display = "none";
            const studentsContainer = document.getElementById('students');
            
            data.forEach(student => {
                const div = document.createElement('div');
                div.className = 'student_card';
                
                div.innerHTML = `
                    <div class="img">
                        <img src="${student.tuition_photo_url}" alt="Student Image">
                    </div>
                    <h3 class="student_name ${student.gender}">${student.student_name}</h3>
                `;
                
                studentsContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            loadingElement.style.display = "none";
        });
}

window.onload = loadTuitionStudents;
