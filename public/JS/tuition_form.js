const fix_tuition_form_number = () => {
    fetch('/api/tuition')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was bad');
            }
            return response.json();
        })
        .then(data => {
            const form_no = document.getElementById('tuition_form_no');
            const paddedNumber = String(parseInt(data.length) + 1).padStart(3, '0');
            form_no.value = "Tuition_" + paddedNumber;
        })
}

const updateSubjectSelection = () => {
    const dedicatedClassRadio = document.getElementById('dedicated_class');
    const subjectSelectionDiv = document.getElementById('subject_selection');

    if (!dedicatedClassRadio) {
        console.error('Element with ID "dedicated_class" not found.');
        return;
    }

    if (!subjectSelectionDiv) {
        console.error('Element with ID "subject_selection" not found.');
        return;
    }

    if (dedicatedClassRadio.checked) {
        subjectSelectionDiv.classList.remove('hidden');
    } else {
        subjectSelectionDiv.classList.add('hidden');
    }
}
const getClassDuration=()=>{
    const five_to_six = document.getElementById("five_to_six");
    const six_to_seven = document.getElementById("six_to_seven");
    const five_to_seven = document.getElementById("five_to_seven");
    const label_class_duration = document.getElementById("label_class_duration");
    const class_duration = document.getElementById("class_duration");
    if (five_to_six.checked || six_to_seven.checked){
        label_class_duration.classList.remove('hidden');
        class_duration.value = 1 + " hour";
    }
    else if (five_to_seven.checked){
        label_class_duration.classList.remove('hidden');
        class_duration.value = 2 + " hours";
    }
    else{
        label_class_duration.classList.add('hidden');
    }
}
window.onload=()=>{
    fix_tuition_form_number();
    updateSubjectSelection();
    getClassDuration();
    const regular_class_radio = document.querySelectorAll('input[name="regular_class"]');
    regular_class_radio.forEach(radio => {
        radio.addEventListener('change', updateSubjectSelection);
    });
    const preferred_time_radio = document.querySelectorAll("input[name='preferred_time']");
    preferred_time_radio.forEach(radio => {
        radio.addEventListener('change', getClassDuration);
    });
}
