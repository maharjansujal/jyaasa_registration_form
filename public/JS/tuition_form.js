const updateSubjectSelection = () => {
    const electiveClassRadio = document.getElementById('elective_class');
    const subjectSelectionDiv = document.getElementById('subject_selection');
    
    if (!electiveClassRadio) {
        console.error('Element with ID "elective_class" not found.');
        return;
    }
    
    if (!subjectSelectionDiv) {
        console.error('Element with ID "subject_selection" not found.');
        return;
    }

    if (electiveClassRadio.checked) {
        subjectSelectionDiv.classList.remove('hidden');
    } else {
        subjectSelectionDiv.classList.add('hidden');
    }
}
window.onload = () => {
    updateSubjectSelection();
    const radioButtons = document.querySelectorAll('input[name="regular_class"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateSubjectSelection);
    });
}