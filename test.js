// const dotenv = require('dotenv')
// dotenv.config()
// console.log(process.env.PORT)
// console.log(process.env.NODE_ENV)

// console.log(process.argv)

// if(Math.random() > 0.5){
//     while(true){

//     }
// }   else {
//     console.log('Finally')
//     process.exit()
// }

const path = require('path')
console.log(path.join('first','second'))
const siteURL = 'https://vk.com/legiontalgar'

const url = new URL(siteURL)
console.log(url)
