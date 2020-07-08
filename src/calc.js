const calcilateTip = (total, tipPercent = 0.25) => {
    const tip = total * tipPercent
    return total + tip
}


const fahrenheightToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celciusToFarenheight = (temp) => {
    return (temp * 1.8) + 32
}



module.exports = {
    calcilateTip, fahrenheightToCelsius, celciusToFarenheight
}