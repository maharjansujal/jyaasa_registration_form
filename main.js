
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'src/HTML/index.html'));
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.on('submit-form', (event, formData) => {
        const filePath = path.join(__dirname, 'src/API/test.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            let jsonData = [];
            if (err && err.code === 'ENOENT') {
                // File does not exist, start with an empty array
                console.log('File does not exist, creating new file.');
            } else if (err) {
                console.error('Error reading file', err);
                event.reply('form-submit-response', { status: 'error', message: 'Error reading file' });
                return;
            } else {
                try {
                    // Handle empty file
                    if (data.trim() === '') {
                        console.warn('File is empty, initializing new array.');
                        jsonData = [];
                    } else {
                        jsonData = JSON.parse(data);
                        if (!Array.isArray(jsonData)) {
                            // If the data is not an array, initialize it as an empty array
                            console.warn('File data is not an array, initializing new array.');
                            jsonData = [];
                        }
                    }
                } catch (parseErr) {
                    console.error('Error parsing JSON', parseErr);
                    event.reply('form-submit-response', { status: 'error', message: 'Error parsing JSON' });
                    return;
                }
            }
            // Append new data
            jsonData.push(formData);
            // Write updated data back to file
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                    event.reply('form-submit-response', { status: 'error', message: 'Error writing to file' });
                } else {
                    event.reply('form-submit-response', { status: 'success', message: 'Form data saved to test.json' });
                }
            });
        });
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

