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

function setIframeHeight() {
    const viewportHeight = window.innerHeight;
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(function(iframe) {
        iframe.style.height = 0.75*viewportHeight + 'px';
    });
}

window.addEventListener('resize', setIframeHeight);
window.addEventListener('load', setIframeHeight);
document.addEventListener('DOMContentLoaded', () => {
    openTab('welcome');
});
