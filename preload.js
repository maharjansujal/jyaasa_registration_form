const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    submitForm: (formData) => ipcRenderer.send('submit-form', formData),
    onFormSubmitResponse: (callback) => ipcRenderer.on('form-submit-response', callback)
});
