require('./global')
require('./databaseconector')
const express = require('express')
const fs=require("fs")
const path=require("path")
const route1=require('./route/getroute')
const cors=require("cors")

const app = express()
const port = 3001

app.use(route1)
app.use(express.json())
app.use(cors())
// console.log(connection)
// Requiring the module
// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin',"*")
//     next()
// })


app.get('/', (req, res) => {
    const data=reader.readFile(path.join(__dirname,"./Business Capabilities and Apps Mapping_Consolidated_v3.0_28062021.xlsx"))
    const datais=reader.utils.sheet_to_json(
        data.Sheets[data.SheetNames[3]])
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.send(datais)
})



app.listen(port, () =>
  logger
    .color("white")
    .bgColor("green")
    .bold()
    .log("server starting at port 3001")
);