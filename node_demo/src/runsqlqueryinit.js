const mysql = require('mysql2/promise');
const queryarray = require('./database/initialquery/querytable')
const bluebird = require('bluebird');
const logger = require('node-color-log');




const run = async () => {
    const data = reader.readFile(path.join(__dirname, "./Business Capabilities and Apps Mapping_Consolidated_v3.0_28062021.xlsx"))
    const datais = reader.utils.sheet_to_json(data.Sheets[data.SheetNames[4]])
    const apmappdata =reader.utils.sheet_to_json(data.Sheets[data.SheetNames[5]])
   
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "RJ@$BORN@$26012001",
        database: 'bucapdb',
        Promise: bluebird
    });
    global.connection = connection
    // global.love="love"
    if (connection) {
        logger.color("white").bgColor("green").bold().log("connection sucessfukky established")
    }

    // // adding a querytable
    for (let i of queryarray) {
        const [result, fields] = await connection.execute(i)
        if (result) {
            logger.color("blue").bold().log(i)
        }
    }

    // adding BU
    const bu_object = [
        "AEML",
        "Airport",
        "City Gas",
        "Corp Services",
        "FinServe",
        "Natural Resources",
        "Natural Resources - Intl",
        "Ports & Logistics",
        "Real Estate",
        "Renewables",
        "Solar Mfg.",
        "Thermal",
        "Transmission",
        "Adani Defence"
    ]

    for(let i of bu_object){
        try {
            const [result,fields]=await connection.execute(`insert into bu (buname) values("${i}")`)
        } catch (error) {
            // console.log(error.sqlMessage)
        }
        
    }

    // adding l1
    
        for (let i of datais){
            try {
                // console.log(i)
                const buis=i["Business Unit"]
                const l1is=i["Business Area (L0)"]
                const type=i["Bus Cap ID"][0] ==="C" ? "Core" : "Support"
                const [findid,fields]=await connection.execute(`select buid from bu where buname="${buis}";`) 
                const [result,fieldss]=await connection.execute(`insert into L1_Capabilities (l1name,buid,ctype) values("${l1is}","${findid[0].buid}","${type}")`)
            } catch (error) {
                // console.log(error.sqlMessage) 
            }
           
        }
    
    //adding l2
    
    for(let i of datais){
        try {
            const buis=i["Business Unit"]
            const l1is=i["Business Area (L0)"]
            const l2is=i["Business Capablity (L1)"]
            const type=i["Bus Cap ID"][0] ==="C" ? "Core" : "Support"
            const [findid,fieldss]=await connection.execute(`select buid from bu where buname="${buis}";`)
            const [l1idis,fields]=await connection.execute(`select l1id from L1_Capabilities where l1name="${l1is}" and ctype="${type}" and buid="${findid[0].buid}"`)
            // console.log(l1idis[0].l1id)
            const [result,fields1]=await connection.execute(`insert into L2_Capabilities (l2name,BUid,parentid,ctype) values ("${l2is}","${findid[0].buid}","${l1idis[0].l1id}","${type}")`)
        } catch (error) {
            // console.log(error)
        }
    }

    // adiing l3
    for(let i of datais){
        try {
            const buis=i["Business Unit"]
            const l2is=i["Business Capablity (L1)"]
            const l3is=i["Sub Capablity (L2)"]
            const type=i["Bus Cap ID"][0] ==="C" ? "Core" : "Support"
            
            const [findid,fieldss]=await connection.execute(`select buid from bu where buname="${buis}";`)
            const [l2idis,fields]=await connection.execute(`select l2id from L2_Capabilities where l2name="${l2is}" and ctype="${type}" and buid="${findid[0].buid}"`)
            // console.log(l2idis[0].l2id)
            const [l3insert,fields2]=await connection.execute(`insert into L3_Capabilities (l3name,BUid,parentid,ctype) values("${l3is}","${findid[0].buid}","${l2idis[0].l2id}","${type}")`)
        } catch (error) {
            // console.log(error)
        }
    }
    

    






















    



}
run()