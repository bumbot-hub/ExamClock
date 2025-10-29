const contrast_BTN = document.getElementById("contrast");
const back_BTN = document.getElementById("back");

let historyStack = []; // Stack of visited sites

// Returns first visible section (active) besides header
function getVisibleSection(){
    const children = Array.from(document.body.children).slice(1);
    return children.find(child => !child.classList.contains("hidden"));
}

contrast_BTN.addEventListener("click", () => {
    document.body.classList.toggle("high_contrast");
    contrast_BTN.classList.toggle("fa-flip-horizontal");
})

function updateHeader(section){
    const backBTN = document.getElementById("back");
    if(section.classList.contains("homepage")){
        backBTN.classList.add('hidden');
    }else{
        backBTN.classList.remove('hidden');
    }
}

const page_changer_BTN = [
    document.getElementById("settings"),
    document.getElementById("clock"),
    document.getElementById("timer")
];

page_changer_BTN.forEach(btn => {
    if(btn){
        btn.addEventListener("click", () => {
            const currentSection = getVisibleSection();
            if (currentSection) {
                historyStack.push(currentSection.className); //Add current section to history
                currentSection.classList.add("hidden");
            }

            const newSection = document.querySelector(`.${btn.id}`);
            if(newSection){
                newSection.classList.remove("hidden");
                updateHeader(newSection);
            }
        });
    }
});

function goBack(){
    if (historyStack.length === 0) return;

    const currentSection = getVisibleSection();
    if(currentSection){
        currentSection.classList.add("hidden");
    }

    const prevSection = document.querySelector(`.${historyStack.pop()}`);
    if(prevSection){
        prevSection.classList.remove("hidden");
        updateHeader(prevSection);
    }
}

back_BTN.addEventListener("click", goBack);