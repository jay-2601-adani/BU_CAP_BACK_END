const mysql = require('mysql2/promise');
const queryarray = require('./database/initialquery/querytable')
const bluebird = require('bluebird');
const logger = require('node-color-log');




const run = async () => {
    const data = reader.readFile(path.join(__dirname, "./Business Capabilities and Apps Mapping_Consolidated_v3.0_28062021.xlsx"))
    const datais = reader.utils.sheet_to_json(data.Sheets[data.SheetNames[3]])
    const apmappdata =reader.utils.sheet_to_json(data.Sheets[data.SheetNames[5]])
    // console.log(apmappdata)
    const objinsert = {
        core: {},
        support: {}
    }
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

    // adding l1
    for (let i of datais) {
        const type = i["Capability Type"]
        const l1 = i["Business Area (L0)"].trim()
        if (type == "Core") {
            objinsert.core[l1] = {
                l2: {}
            }
        } else {
            objinsert.support[l1] = {
                l2: {}
            }
        }
    }

    // adding l2
    for (let i of datais) {
        const type = i["Capability Type"]
        const l1 = i["Business Area (L0)"].trim()
        const l2 = i["Business Capablity (L1)"].trim()
        try {
            if (type == "Core") {
                objinsert.core[l1].l2[l2] = {
                    l3: {}
                }
            } else {
                objinsert.support[l1].l2[l2] = {
                    l3: {}
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    // adding l3
    for (let i of datais) {
        const type = i["Capability Type"]
        const l1 = i["Business Area (L0)"].trim()
        const l2 = i["Business Capablity (L1)"].trim()
        const l3 = i["Sub Capablity (L2)"].trim()
        try {
            if (type == "Core") {
                objinsert.core[l1].l2[l2].l3[l3] = {
                    app: {}
                }
            } else {
                objinsert.support[l1].l2[l2].l3[l3] = {
                    app: {}
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(objinsert.core["Power Generation"].l2['Generation Corporate'])

    // adding l1 to database
    // adding core

    // console.log(Object.keys(objinsert.core))
    for (let i of Object.keys(objinsert.core)) {
        try {
            const [result, fields] = await connection.execute(`insert into L1_Capabilities (l1name,ctype) values ("${i}","Core")`)
        } catch (error) {
            console.log(error)   
        }
       
    }

    for (let i of Object.keys(objinsert.support)) {
        try {
            const [result, fields] = await connection.execute(`insert into L1_Capabilities (l1name,ctype) values ("${i}","Support")`)
        } catch (error) {
            console.log(error)
        }
    }

    // adding l2
    // adding core
    for (let i of Object.keys(objinsert.core)) {
        try {
            const [results, fileds] = await connection.execute(`select l1id from L1_Capabilities where l1name="${i}" and ctype="Core";`)
            // console.log(result[0].l1id)
            for (let j of Object.keys(objinsert.core[i].l2)) {
                const [result, fields] = await connection.execute(`insert into L2_Capabilities (l2name,ctype,parentid) values ("${j}","Core","${results[0].l1id}")`)
            }
        } catch (error) {
            console.log(error.sqlMessage)
        }
    }
    // // adding support
    for (let i of Object.keys(objinsert.support)) {
        try {
            const [results, fileds] = await connection.execute(`select l1id from L1_Capabilities where l1name="${i}" and ctype="Support";`)
            // console.log(result[0].l1id)
            for (let j of Object.keys(objinsert.support[i].l2)) {
                const [result, fields] = await connection.execute(`insert into L2_Capabilities (l2name,ctype,parentid) values ("${j}","Support","${results[0].l1id}")`)
            }
        } catch (error) {
            console.log(error.sqlMessage)
        }
    }


    // adding l3
    // core

    for (let i of Object.keys(objinsert.core)) {
        try {
            for (let j of Object.keys(objinsert.core[i].l2)) {
                const [results, fields] = await connection.execute(`select l2id from L2_Capabilities where l2name="${j}" and ctype="Core";`)
                // console.log(results[0].l2id)
                for (let k of Object.keys(objinsert.core[i].l2[j].l3)) {
                    const [result, fields] = await connection.execute(`insert into L3_Capabilities (l3name,ctype,parentid) values ("${k}","Core","${results[0].l2id}")`)
                }
            }
        } catch (error) {
            console.log(error.sqlMessage)
        }
    }
    // adding support
    for (let i of Object.keys(objinsert.support)) {
        try {
            for (let j of Object.keys(objinsert.support[i].l2)) {
                const [results, fields] = await connection.execute(`select l2id from L2_Capabilities where l2name="${j}" and ctype="Support";`)
                // console.log(results[0].l2id)
                for (let k of Object.keys(objinsert.support[i].l2[j].l3)) {
                    const [result, fields] = await connection.execute(`insert into L3_Capabilities (l3name,ctype,parentid) values ("${k}","Support","${results[0].l2id}")`)
                }
            }
        } catch (error) {
            console.log(error.sqlMessage)
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
            console.log(error)
        }
        
    }

    // add apmapp data

    // for(let i of apmappdata){
    //     // console.log(i["Business Unit"])
    //     try {
    //         const [results,fieldss]=await connection.execute(`select buid from bu where buname="${i["Business Unit"]}"`)
    //         // console.log(results)
           
    //         const [result,fields]=await connection.execute(`insert into applications (appname,buid,apmid) values ("${i["Name"]}",${results[0].buid},${i["Asset ID"]})`)
    //     } catch (error) {
    //         console.log(error.sqlMessage)
    //     }
        
    // }























    



}
run()