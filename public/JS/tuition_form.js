const fix_tuition_form_number=()=>{
    fetch('/api/tuition')
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was bad');
            }
            return response.json();
        })
        .then(data=>{
            const form_no = document.getElementById('tuition_form_no');
            const paddedNumber = String(parseInt(data.length) + 1).padStart(3, '0');
            form_no.value = "Tuition"+"_"+ paddedNumber ;
        })
}

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
window.onload=()=>{
    fix_tuition_form_number();
    updateSubjectSelection();
    const radioButtons = document.querySelectorAll('input[name="regular_class"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateSubjectSelection);
    });
}