require('./global')
// require('./databaseconector')
require('./runsqlqueryinit')
const express = require('express')
const fs=require("fs")
const path=require("path")
const route1=require('./route/getroute')
const l1route=require('./route/l1route')
const l2route=require('./route/l2route')
const l3route=require('./route/l3route')
const approute=require('./route/approute')
const cors=require("cors")

const app = express()
const port = 3001

app.use(route1)
app.use(l1route)
app.use(l2route)
app.use(l3route)
app.use(approute)


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