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
            const loadingElement = document.getElementById('loading');
            loadingElement.style.display = "none";
            data.forEach(student => {
                const student_card = document.createElement('div');
                student_card.className = 'student_card';
                
                student_card.innerHTML = `
                    <div class="img">
                        <img src="${student.art_photo_url}" alt="Student Image">
                    </div>
                    <h3 class="student_name ${student.gender}">${student.student_name}</h3>
                `;
                student_card.addEventListener('click', () => {
                    window.location.href = `/src/HTML/art_student_profile.html?art_form_no=${student.art_form_no}`;
                });
                studentsContainer.appendChild(student_card);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            loadingElement.style.display = "none";
        });
}

window.onload = loadArtStudents;
