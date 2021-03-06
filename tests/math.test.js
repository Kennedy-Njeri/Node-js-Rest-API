const { calcilateTip, celciusToFarenheight, fahrenheightToCelsius, add } = require('../src/calc')



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


test('should convert 0 c to 32 F', () => {
    const temp = celciusToFarenheight(0)
    expect(temp).toBe(32)
})


// test('Async func test', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })


// testing asynchronous func

test('Sum of two numbers', (done) => {
    add(4, 5).then((sum) => {
        expect(sum).toBe(9)
        done()
    })
})

test('Sum of two numbers', async () => {
    const sum = await add(2,3)
    expect(sum).toBe(5)
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