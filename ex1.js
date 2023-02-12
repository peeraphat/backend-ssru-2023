// // // num1 คือ ตัวเลขที่ 1
// // // num2 คือ ตัวเลขที่ 2
// // // callback คือ function ที่จะรับ result ต่อไป

// // function calculate (num1, num2, callback) {
// //   setTimeout(() => {
// //     const result = num1 + num2
// //     return result
// //   }, 3000);
// //   callback(result)
// // }

// // // const calculated = calculate(1, 2)
// // // console.log(calculated)

// // calculate(10, 20, (data) => {
// //   console.log('ผลลัพธ์', data)
// // })


// // Promise

// const calculate = new Promise((resove, reject) => {
//   setTimeout(() => {
//     // logic
//     // const result = 100
//     resove('Work Fine !!!')
//     // reject('something error!!')
//   } , 1000)
// })

// // calculate
// //   .then((data) => {
// //     console.log('Log in Then', data)
// //   }).catch((e) => {
// //     console.log('Error in Catch', e)
// //   })

// const fn1 = () => {
//   console.log('work')
//   return 'work'
// }

// const main = async () => {
//   const result = await fn1()
//   console.log('result', result)
// }

// main()
console.log('worked')