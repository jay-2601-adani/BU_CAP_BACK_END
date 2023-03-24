const express = require("express")

const router=new express.Router()


// all applist
router.get('/getapplist',async(req,res)=>{
    try {
        const [result,fields]=await connection.execute(`select c.id,l1.l1name,l1.l1id,l2.l2id,l3.l3id,l2.l2name,l3.l3name,b.buname,b.buid,c.appnameinmaping,l1.ctype,app.appid from capappmaping c inner join L1_Capabilities l1 on l1.l1id=c.l1id inner join L2_Capabilities l2 on l2.l2id=c.l2id inner join L3_Capabilities l3 on l3.l3id=c.l3id inner join bu b on b.buid=c.buid inner join applications app on app.appid=c.appid `)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})


// get list by l1 , l2 and l3

router.get("/getapp/:l1id/:l2id/:l3id",async(req,res)=>{
    try {
        const [result,fields]=await connection.execute(`select c.id,l1.l1name,l1.l1id,l2.l2id,l3.l3id,l2.l2name,l3.l3name,b.buname,b.buid,c.appnameinmaping,l1.ctype,app.appid from capappmaping c inner join L1_Capabilities l1 on l1.l1id=c.l1id inner join L2_Capabilities l2 on l2.l2id=c.l2id inner join L3_Capabilities l3 on l3.l3id=c.l3id inner join bu b on b.buid=c.buid inner join applications app on app.appid=c.appid where l1.l1id="${req.params.l1id}" and l2.l2id="${req.params.l2id}" and l3.l3id="${req.params.l3id}" `)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})


module.exports=router