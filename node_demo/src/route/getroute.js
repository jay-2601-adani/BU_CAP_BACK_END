const express = require("express")
const router=new express.Router()


// router.get("/getl1",async(req,res)=>{
//     try {
//         const [result,fields]=await connection.execute('select * from L1_Capabilities order by l1id;')
//         res.setHeader('Access-Control-Allow-Origin',"*")
//         res.send(result)
//     } catch (error) {
//         console.log(error)
//     }
// })


// router.get("/getl2",async(req,res)=>{
//     try {
//         const [result,fields]=await connection.execute('select * from L2_Capabilities order by l2id;')
//         res.setHeader('Access-Control-Allow-Origin',"*")
//         res.send(result)
//     } catch (error) {
//         console.log(error)
//     }
// })


// router.get("/getl3",async(req,res)=>{
//     try {
//         const [result,fields]=await connection.execute('select * from L3_Capabilities order by l3id;')
//         res.setHeader('Access-Control-Allow-Origin',"*")
//         res.send(result)
//     } catch (error) {
//         console.log(error)
//     }
// })


// router.get('/getmasterdatal',async(req,res)=>{
//     try {
//         const [result,fields]=await connection.execute(`select * from l1_capabilities 
//         inner join l2_capabilities on l2_capabilities.parentid=l1_capabilities.l1id
//         inner join l3_capabilities on l3_capabilities.parentid=l2_capabilities.l2id
//         order by l1_capabilities.l1id`)
//         res.setHeader('Access-Control-Allow-Origin',"*")
//         res.send(result)
//     } catch (error) {
//         console.log(error)
//     }
// })

//send bu list

router.get('/getbulist',async(req,res)=>{
    try {
        const  [result,fields]=await connection.execute("select * from bu order by buid;")
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})


module.exports=router