const fix_art_form_number=()=>{
    fetch('/api/art')
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was bad');
            }
            return response.json();
        })
        .then(data=>{
            const form_no = document.getElementById('art_form_no');
            const paddedNumber = String(parseInt(data.length) + 1).padStart(3, '0');
            form_no.value = "Art"+"_"+ paddedNumber ;
        })
}

window.onload=()=>{
    fix_art_form_number();
}