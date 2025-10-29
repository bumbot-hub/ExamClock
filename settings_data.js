const { ipcRenderer } = require('electron');

const data_form = document.forms['settings-form'];

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
                console.log(JSON_file);
                ipcRenderer.send('updated-settings', JSON_file);
            })
        }

    } catch(error){
        console.error('Unable to download settings: ', error);
    }
}

getSettingsFromJSON();
