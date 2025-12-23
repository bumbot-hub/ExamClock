// Returns first visible section (active) besides header
export function getVisibleSection(){
    const children = Array.from(document.body.children).slice(1);
    return children.find(child => !child.classList.contains("hidden"));
}


export function createContrastColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    if (max !== min) {
        const d = max - min;
        if (max === r)       h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g)  h = (b - r) / d + 2;
        else                 h = (r - g) / d + 4;
        h *= 60;
    }

    return `hsl(${Math.round(h)}, 100%, 50%)`;
}

export function toggleClasses(element, class1, class2){
    if(element.classList.contains(class1)){
        element.classList.remove(class1);
        element.classList.add(class2);
    }else if(element.classList.contains(class2)){
        element.classList.remove(class2);
        element.classList.add(class1);
    }else{
        element.classList.add(class1);
    }
}