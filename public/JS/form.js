// document.querySelector('input[type="file"]').addEventListener('change', function (event) {
//     const file = event.target.files[0];
//     const photoPreview = document.querySelector('.photo-preview');

//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             const img = document.createElement('img');
//             img.src = e.target.result;

//             photoPreview.innerHTML = '';

//             photoPreview.appendChild(img);
//         };
//         reader.readAsDataURL(file);
//     }
// });

function logCurrentLine() {
    try {
        throw new Error();
    } catch (e) {
        const stackLines = e.stack.split('\n');
        console.log(`I am in line: ${stackLines[2]}`);
    }
}

window.onload=logCurrentLine;

// const show_art = () => {
//     const plan5Radio = document.getElementById('plan5');
//     const daysLabel = document.getElementById('label_days');

//     if (plan5Radio.checked) {
//         daysLabel.classList.remove('hidden');
//     } else {
//         daysLabel.classList.add('hidden');
//     }
// }


// const radioButtons = document.querySelectorAll('input[name="plan"]');
// radioButtons.forEach(radio => {
//     radio.addEventListener('change', show_art);
// });

const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('birthdate').addEventListener('input', (event) => {
        const birthdate = event.target.value;
        if (birthdate) {
            const calculatedAge = calculateAge(birthdate);
            const labelAge = document.getElementById('label_age');
            labelAge.classList.remove('hidden');
            const age = document.getElementById('age');
            age.value = calculatedAge;
        } else {
            // Hide the label if birthdate is not provided
            document.getElementById('label_age').classList.add('hidden');
        }
    });

    const setBirthdate = () => {
        const today = new Date();
        const fourYearsAgo = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
        const formattedDate = fourYearsAgo.toISOString().split('T')[0];
        document.getElementById('birthdate').setAttribute('max', formattedDate);
    };

    const setMindate = () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const joiningDateInput = document.getElementById('joining_date');
        const admissionDateInput = document.getElementById('admission_date');

        if (joiningDateInput) {
            joiningDateInput.setAttribute('min', formattedDate);
        }

        if (admissionDateInput) {
            admissionDateInput.setAttribute('min', formattedDate);
        }
    };

    setBirthdate();
    setMindate();
});

document.getElementById('birthdate').addEventListener('input', (event) => {
    const birthdate = event.target.value;
    if (birthdate) {
        const calculatedAge = calculateAge(birthdate);
        console.log('Birthdate:', birthdate);
        console.log('Calculated Age:', calculatedAge);
        const labelAge = document.getElementById('label_age');
        labelAge.classList.remove('hidden');
        const age = document.getElementById('age');
        age.value = calculatedAge;
    } else {
        // Hide the label if birthdate is not provided
        document.getElementById('label_age').classList.add('hidden');
    }
});

const setBirthdate=()=> {
    const today = new Date();
    const fourYearsAgo = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
    const formattedDate = fourYearsAgo.toISOString().split('T')[0];
    document.getElementById('birthdate').setAttribute('max', formattedDate);
}

// const setMindate=()=>{
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     document.getElementById('joining_date').setAttribute('min', formattedDate);
//     document.getElementById('admission_date').setAttribute('min', formattedDate);
// }
// window.onload=()=>{
//     setBirthdate();
//     setMindate();
// }

const restrictKeys=(event)=> {
    const restrictedKeys = ["e", "E", "+", "-"];
    if (restrictedKeys.includes(event.key)) {
        event.preventDefault();
    }
}

