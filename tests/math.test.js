const { calcilateTip } = require('../src/calc')

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





// test('Hello world', () => {
//
// })
//
//
//
// test('test failure', () => {
//     throw new Error("Failure!!")
// })