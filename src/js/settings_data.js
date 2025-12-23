import { updateInfo } from "./app.js";

const { ipcRenderer } = require('electron');

const dataForm = document.forms['data-settings-form'];
const accessibilityForm = document.forms['accessibility-settings-form'];

async function getSettingsFromJSON(){
    try{
        const settingsData = await ipcRenderer.invoke('get-settings-data');
        let jsonFile = settingsData;
        for(const cell of dataForm.elements){
            cell.value = settingsData.settings[cell.name];
        }

        for (const cell of dataForm.elements){
            cell.addEventListener('change',  () => {
                jsonFile.settings[cell.name] = cell.value;
                updateInfo(jsonFile.settings);
                ipcRenderer.send('updated-settings', jsonFile);
            })
        }
        return settingsData;
    } catch(error){
        console.error('Unable to download settings: ', error);
        return null;
    }
}

getSettingsFromJSON().then((data) => {
    if(data){
        updateInfo(data.settings);
    }
});