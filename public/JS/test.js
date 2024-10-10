document.querySelector('input[type="file"]').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const photoPreview = document.querySelector('.photo-preview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;

            photoPreview.innerHTML = '';

            photoPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});