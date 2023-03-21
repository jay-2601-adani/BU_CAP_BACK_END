const express = require("express")
const router=new express.Router()

// get all l2
router.get("/getalll2",async(req,res)=>{
    try {
        const [result,fields]=await connection.execute(`select * from L2_Capabilities l2 inner join L1_Capabilities l1 on l1.l1id=l2.parentid  inner join bu b on l2.buid=b.buid ;`)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})


// getl2 by parent l1
router.get('/getl2byl1/:l1id',async(req,res)=>{
    try {
        const l1parentid=req.params.l1id
        const [result,fields]=await connection.execute(`select * from L2_Capabilities l2 inner join L1_Capabilities l1 on l1.l1id=l2.parentid where l1.l1id="${l1parentid}"`)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
      res.send(error)   
    }
})



// send l2 bu by buid
router.get('/getl2/:id',async(req,res)=>{
    try {
        const buidis=req.params.id
        console.log(buidis)
        const [result,fields]=await connection.execute(`select * from L2_Capabilities where buid="${buidis}"`)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports=router