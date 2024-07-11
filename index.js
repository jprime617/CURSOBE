const express = require('express')
require("dotenv").config()
const {connectDB} = require('./db')
const rotas = require('./routes')

const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

connectDB()

app.use("/usuarios", rotas)

app.listen(8000)






// function filtrarPares(arr){
//     nova_arr = []
//     for(let i = 0; i < arr.length; i++){
//         if (arr[i] % 2 == 0){
//             nova_arr.push(arr[i])
//         }
//     }
//     return console.log(nova_arr);
// }

// filtrarPares([1,2,3,4,5,6,7,8])