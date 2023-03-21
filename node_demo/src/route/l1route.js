const express = require("express")
const router=new express.Router()



// get all l1
router.get("/getalll1",async(req,res)=>{
    try {
        const [result,fields]=await connection.execute(`select * from L1_Capabilities l1 inner join bu b on b.buid=l1.buid;`)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

// send l1 by bu id
router.get('/getl1/:id',async(req,res)=>{
    try {
        const buidis=req.params.id
       
        const [result,fields]=await connection.execute(`select * from L1_Capabilities where buid="${buidis}" order by ctype`)
        res.setHeader('Access-Control-Allow-Origin',"*")
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})


module.exports=router