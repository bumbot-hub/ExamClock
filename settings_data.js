import { updateInfo } from "./renderer.js";

const { ipcRenderer } = require('electron');

const data_form = document.forms['data-settings-form'];
const accessibility_form = document.forms['accessibility-settings-form'];

async function getSettingsFromJSON(){
    try{
        const settings_data = await ipcRenderer.invoke('get-settings-data');
        let JSON_file = settings_data;
        for(const cell of data_form.elements){
            cell.value = settings_data.settings[cell.name];
        }

        for (const cell of data_form.elements){
            cell.addEventListener('change',  () => {
                JSON_file.settings[cell.name] = cell.value;
                updateInfo(JSON_file.settings);
                ipcRenderer.send('updated-settings', JSON_file);
            })
        }
        return settings_data;
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