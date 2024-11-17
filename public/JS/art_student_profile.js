
const form_no_int = (form_no) => {
    const numberPart = form_no.replace('Art_', '');
    const integerFormNo = parseInt(numberPart, 10);
    return integerFormNo;
}
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const art_form_no = params.get("art_form_no");
    console.log("Art Form No: ", art_form_no);
    const student_id = form_no_int(art_form_no);
    console.log("Student ID (converted): ", student_id);
    function loadArtStudents() {
        fetch('/api/art')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                if (student_id > 0 && student_id <= data.length) {
                    const student = data[student_id - 1];

                    console.log("Loaded student:", student);

                    if (student) {
                        document.querySelector('.form_no').textContent = student.art_form_no;
                        document.querySelector('.name').textContent = student.student_name;
                        console.log(student.birthdate);
                        document.querySelector('.birthdate').textContent = student.birthdate;
                        document.querySelector('.photo').style.backgroundImage = `url(${student.art_photo_url})`;
                        document.querySelector('#address').textContent = student.address;
                        document.querySelector('#gender').textContent = student.gender;
                        document.querySelector('#guardian_name').textContent = student.guardian_name;
                        document.querySelector('#age').textContent = student.age;
                        document.querySelector('#mobile_1').textContent = student.mobile_1;
                        document.querySelector('#mobile_2').textContent = student.mobile_2;
                        document.querySelector('#email_id').textContent = student.email_id;
                        document.querySelector('#school_name').textContent = student.school_name;
                        document.querySelector('#school_address').textContent = student.school_address;
                        document.querySelector('#class_plans').textContent = student.class_plans;
                        document.querySelector('#joining_date').textContent = student.joining_date;
                        document.querySelector('#admission_date').textContent = student.admission_date;
                        document.querySelector('#number_of_days').textContent = student.number_of_days;
                        document.querySelector('#subscription_fee').textContent = student.subscription_fee;
                        document.querySelector('#admission_fee').textContent = student.admission_fee;
                        document.querySelector('#class_duration').textContent = student.class_duration;
                    } else {
                        console.log("Student data is missing.");
                    }
                } else {
                    console.log("Invalid student ID or out of bounds:", student_id);
                }
            })
            .catch(error => {
                console.error('Error loading student data:', error);
            });
    }
    loadArtStudents();
});


document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById('art_go_back');

    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back();
            setTimeout(function () {
                location.reload();
            }, 500);
        });
    } else {
        console.error("Back button not found.");
    }

});