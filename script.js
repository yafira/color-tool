const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider')

hexInput.addEventListener('keyup', () => {

    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');

    inputColor.style.backgroundColor = "#" + strippedHex;
})

const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#','');

    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }
    const r  = parseInt(strippedHex.substring(0,2), 16);
    const g  = parseInt(strippedHex.substring(2,4), 16);
    const b  = parseInt(strippedHex.substring(4,6), 16);

    return {r,g,b}
}

const convertRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

const alteredColor = (hex, percemtage) => {
    const {r,g,b} = convertHexToRGB(hex);

    const amount = Math.floor((percemtage / 100) * 255);

    const newR = increaseWithin0To255(r + amount);
    const newG = increaseWithin0To255(g + amount);
    const newB = increaseWithin0To255(b + amount);
    return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    // const newHex = hex + amount;
    // if(newHex > 255) return 255;
    // if(newHex < 255) return 0;
    // return newHex;
    return Math.min(255, Math.max(0, hex + amount));
}

console.log(alteredColor('fff', 10));

slider.addEventListener('input', () => {
    console.log(slider.value);
    sliderText.textContent = `${slider.value}%`;
})