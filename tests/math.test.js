const { calcilateTip, celciusToFarenheight, fahrenheightToCelsius } = require('../src/calc')

test('should calculate total with tip', () => {
    const total = calcilateTip(10, .3)
    expect(total).toBe(13)

    // if(total !== 13){
    //     throw new Error("Total tip should be 13. we got " + total)
    // }
})

test('Should calculate total with default tip', () => {
    const total = calcilateTip(10)
    expect(total).toBe(12.5)
})


test('should convert 32 F to 0 c', () => {
    const temp = fahrenheightToCelsius(32)
    expect(temp).toBe(0)
})


test('should convert 0 c to 0 c', () => {

})



// test('Hello world', () => {
//
// })
//
//
//
// test('test failure', () => {
//     throw new Error("Failure!!")
// })