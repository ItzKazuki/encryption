export default function checkKey(dataKey) {
    if(isNaN(dataKey)) {
        console.log('something error, are you sure the key is integer?');
    }

    if(dataKey >= 94) {
        console.log('key must under 94, please try again later');
    }

    return isNaN(dataKey) || dataKey >= 94 ? true : false;
}

function checkNum(num) {
    return /^[0-9]+$/.test(num)
}