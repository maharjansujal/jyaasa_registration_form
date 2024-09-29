document.getElementById('student-form').addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent the default form submission behavior

    const formData = {
        student_name: document.getElementById('student_name').value,
        guardian_name: document.getElementById('guardian_name').value,
        birthdate: document.getElementById('birthdate').value,
        address: document.getElementById('address').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value
    };

    // Send the form data to the main process
    window.electron.submitForm(formData);
});

// Handle the response from the main process
window.electron.onFormSubmitResponse((event, response) => {
    // Only display the alert if this is the first time receiving a response
    if (!window.responseHandled) {
        alert(response.message);
        window.responseHandled = true;
    }
});
