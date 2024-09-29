function openTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');

    document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    openTab('welcome');
});
