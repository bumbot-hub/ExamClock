import {updateAccessibility, updateInfo} from "./app.js";

const { ipcRenderer } = require('electron');

const DOM = {
    dataForm: document.forms['data-settings-form'],
    accessibilityForm: document.forms['accessibility-settings-form'],
    accentColorInput: document.forms['accessibility-settings-form'].elements['accent-color'],
    accentColorResetBtn: document.getElementById('reset-accent'),
}

async function getSettingsData(){
    try{
        const data = await ipcRenderer.invoke('get-settings-data');
        return data;
    } catch(error){
        console.error('Unable to download settings: ', error);
        return null;
    }
}

function initExamForm(data){
    for(const cell of DOM.dataForm.elements){
        cell.value = data.settings[cell.name];
    }

    for (const cell of DOM.dataForm.elements){
        cell.addEventListener('change',  () => {
            data.settings[cell.name] = cell.value;
            updateInfo(data.settings);
            ipcRenderer.send('updated-settings', data);
        });
    }

    updateInfo(data.settings);
}

function initAccessibilityForm(data){
    for(const cell of DOM.accessibilityForm.elements){
        switch (cell.type){
            case 'checkbox':
                cell.checked = Boolean(data.accessibility[cell.name]);
                break;
            case 'color':
            case 'text':
            case 'number':
                cell.value = data.accessibility[cell.name];
                break;
        }
    }

    for(const cell of DOM.accessibilityForm.elements){
        const eventType = cell.type === 'color' ? 'input' : 'change';
        cell.addEventListener(eventType,  () => {
            switch (cell.type){
                case 'checkbox':
                    data.accessibility[cell.name] = cell.checked;
                    break;
                case 'color':
                case 'text':
                case 'number':
                    data.accessibility[cell.name] = cell.value;
                    break;
            }
            ipcRenderer.send('updated-settings', data);
            updateAccessibility(data.accessibility);
        });
    }

    DOM.accentColorResetBtn.addEventListener('click', () => {
        const defaultColor = '#F27938';
        data.accessibility['accent-color'] = defaultColor;

        ipcRenderer.send('updated-settings', data);
        updateAccessibility(data.accessibility);

        DOM.accentColorInput.value = defaultColor;
        DOM.accentColorResetBtn.classList.add("hidden");
    })

    updateAccessibility(data.accessibility);
}

async function initSettings(){
    const data = await getSettingsData();
    if(!data) return;

    initExamForm(data);
    initAccessibilityForm(data);
}

document.addEventListener('DOMContentLoaded', () => {
    initSettings();
});