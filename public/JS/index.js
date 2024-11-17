function reloadIframe(tabId) {
    const iframe = document.querySelector(`#${tabId} iframe`);
    if (iframe) {
        iframe.contentWindow.location.reload();
    }
}

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
    reloadIframe(tabId);
}
window.openTab = openTab;

function setIframeHeight() {
    const viewportHeight = window.innerHeight;
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(function(iframe) {
        iframe.style.height = 0.75 * viewportHeight + 'px';
    });
}

window.addEventListener('resize', setIframeHeight);
window.addEventListener('load', setIframeHeight);
document.addEventListener('DOMContentLoaded', () => {
    openTab('art_students');
});
