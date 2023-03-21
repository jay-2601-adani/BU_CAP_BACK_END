const express = require("express")
const router=new express.Router()

// get all l3
router.get("/getalll3",async(req,res)=>{
    try {
        const [result,fields]=await connection.execute(`select * from L3_Capabilities l3 inner join L2_Capabilities l2 on l2.l2id=l3.parentid inner join L1_Capabilities l1 on l1.l1id=l2.parentid inner join bu b on b.buid=l1.buid`)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})


// getl2 by parent l2
router.get('/getl3byl2/:l2id',async(req,res)=>{
    try {
        const l2parentid=req.params.l2id
        const [result,fields]=await connection.execute(`select * from L3_Capabilities l3 inner join L2_Capabilities l2 on l2.l2id=l3.parentid where l2.l2id="${l2parentid}"`)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
      res.send(error)   
    }
})



// send l3 bu by buid
router.get('/getl3/:id',async(req,res)=>{
    try {
        const buidis=req.params.id
        console.log(buidis)
        const [result,fields]=await connection.execute(`select * from L3_Capabilities where buid="${buidis}"`)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports=router