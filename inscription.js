import fs from 'fs'
const inscription = async(req, res,mysql,origin) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "locationA"
    })
    if (req.body.type == 'add') {
        //--------------------- vérifions si le compte existe déja ----------------
        let result = await con.awaitQuery(`SELECT * FROM Compte
        WHERE password = ${JSON.stringify(req.body.password)} 
        AND (tel = ${JSON.stringify(req.body.tel)} OR 
            tel = ${JSON.stringify(req.body.name)} OR
            nom = ${JSON.stringify(req.body.tel)} OR
            nom = ${JSON.stringify(req.body.name)})`)
        if (result.length == 0) {
            //------------------ inscription du compte dans la bd -----------------------
            await con.awaitQuery(`INSERT INTO Compte(nom,tel,password,origin,bd,isAdmin)
                VALUES (${JSON.stringify(req.body.name)},
                ${JSON.stringify(req.body.tel)},
                ${JSON.stringify(req.body.password)},
                ${JSON.stringify(origin)},'',1)`)
        } else {
            res.send('exist');
        }
        //--------------------- récupéront l'id et utilisons le pour le nom de la bd ----------------
        result = await con.awaitQuery(`SELECT id FROM Compte WHERE 
                    nom = ${JSON.stringify(req.body.name)} AND
                    password = ${JSON.stringify(req.body.password)}`)

        let bd = "location"+result[0].id+Math.random().toString(36).substring(2, 15)
        await con.awaitQuery(`UPDATE Compte SET bd = ${JSON.stringify(bd)} WHERE
            nom = ${JSON.stringify(req.body.name)} AND
            password = ${JSON.stringify(req.body.password)}
        `)

        //-------------- creation de la nouvelle base de donnée-----------------------------
        await con.awaitQuery(`CREATE DATABASE ${bd}`)
        //await con.awaitQuery(`USE ${bd}`)
        console.log(bd)
        const con1 = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: bd,
            multipleStatements: true
        })
        const query = fs.readFileSync('./location.sql', 'utf8')
        await con1.awaitQuery(query) // create column of data base
        res.send('done!!!')
    }
    else if(req.body.type == 'log') {
        //--------------------- vérifions si le compte existe déja --------------
        let result = await con.awaitQuery(`SELECT * FROM Compte
        WHERE password = ${JSON.stringify(req.body.password)} 
        AND (tel = ${JSON.stringify(req.body.tel)} OR 
            nom = ${JSON.stringify(req.body.tel)})`)

        if (result.length == 0) {
            res.send('nothing')
        } else {
        let datas = {};
        datas = {...datas, login: result[0].nom}
        datas = {...datas, id: result[0].id}
        datas = {...datas, isAdmin: result[0].isAdmin}
        datas = {...datas, origin: result[0].origin}
        datas = {...datas, bd: result[0].bd}
        req.session.login = datas

        req.session.db = result[0].bd // saving db name to reuse

        res.send(datas)
        }
    }
    else if (req.body.type == 'get') {
        //----------- get admin ------------------------------------------------
        let result = await con.awaitQuery(`SELECT * FROM Compte WHERE bd = ${JSON.stringify(req.session.login.bd)} 
        AND id != ${req.session.login.id}`)
        res.send(result)
    }
    else if (req.body.type == 'addCompte') {
        //--------------------- vérifions si le compte existe déja ----------------
        let result = await con.awaitQuery(`SELECT * FROM Compte
        WHERE password = ${JSON.stringify(req.body.password)} 
        AND (tel = ${JSON.stringify(req.body.tel)} OR 
            tel = ${JSON.stringify(req.body.login)} OR
            nom = ${JSON.stringify(req.body.tel)} OR
            nom = ${JSON.stringify(req.body.login)})`)
        if (result.length == 0) {
            //------------------ inscription du compte dans la bd -----------------------
            await con.awaitQuery(`INSERT INTO Compte(nom,tel,password,origin,bd,isAdmin)
                VALUES (${JSON.stringify(req.body.login)},
                ${JSON.stringify(req.body.tel)},
                ${JSON.stringify(req.body.password)},
                ${JSON.stringify(req.session.login.origin)},
                ${JSON.stringify(req.session.login.bd)},
                ${JSON.stringify(req.body.isAdmin)})`)
            

            //----------- get admin -----------------------------------------------
            let result = await con.awaitQuery(`SELECT * FROM Compte WHERE bd = ${JSON.stringify(req.session.login.bd)} 
            AND id != ${req.session.login.id}`)
            res.send(result)
        } else {
            res.send('exist');
        }
    }
    else if (req.body.type == 'modify') {
        //--------------------- vérifions si le compte existe déja ----------------
        let result = await con.awaitQuery(`SELECT * FROM Compte
        WHERE password = ${JSON.stringify(req.body.password)} 
        AND (tel = ${JSON.stringify(req.body.tel)} OR 
            tel = ${JSON.stringify(req.body.login)} OR
            nom = ${JSON.stringify(req.body.tel)} OR
            nom = ${JSON.stringify(req.body.login)})`)

        if (result.length == 0) {
            await con.awaitQuery(`UPDATE Compte SET 
            nom = ${JSON.stringify(req.body.login)} , 
            password = ${JSON.stringify(req.body.password)},
            tel = ${JSON.stringify(req.body.tel)}
            WHERE id = ${JSON.stringify(req.session.login.id)}`)
            res.send('fait')
        } else {
            res.send('exist');
        }
    }
    else if (req.body.type == 'delete') {
        await con.awaitQuery(`DELETE FROM Compte WHERE id = ${JSON.stringify(req.body.id)} 
        AND bd = ${JSON.stringify(req.session.login.bd)}`)
        //----------- get admin ------------------------------------------------
        
        let result = await con.awaitQuery(`SELECT * FROM Compte WHERE bd = ${JSON.stringify(req.session.login.bd)} 
        AND id != ${req.session.login.id}`)
        res.send(result)
    }
}
export default inscription