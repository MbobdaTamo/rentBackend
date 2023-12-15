import fs from 'fs'
const inscription = async(req, res,mysql,origin) => {
    if(typeof req.session.login === 'undefined')  {
        req.session.login = {role:''}
    }
    if(req.session.login.role != "superuser" &&  req.body.type != 'log' && req.body.type != 'add') {
        res.send(null)
        return
    }



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

        if (result.length > 0) {
            res.send('exist');
            return
        }
        //------------------ inscription du compte dans la bd -----------------------
        await con.awaitQuery(`INSERT INTO Compte(nom,tel,password,origin,bd,role)
            VALUES (${JSON.stringify(req.body.name)},
            ${JSON.stringify(req.body.tel)},
            ${JSON.stringify(req.body.password)},
            ${JSON.stringify(origin)},'','superuser')`)
        // role : superAdmin => ha
    
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
        await con1.awaitQuery(query) // create columns of data base

        /*------- inscrivons aussi le compte dans la bd -----------------------------*/
        await con1.awaitQuery(`INSERT INTO Manager(nom,tel,password,role)
        VALUES (${JSON.stringify(req.body.name)},
        ${JSON.stringify(req.body.tel)},
        ${JSON.stringify(req.body.password)},
        'superuser')`)
        
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
            return
        } else {

        req.session.db = result[0].bd // saving db name to reuse
        //----------- gettin from the bd admin ------------------------------------------------
          const con1 = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: req.session.db
        })
        let result1 = await con1.awaitQuery(`SELECT * FROM Manager
        WHERE password = ${JSON.stringify(req.body.password)} 
        AND (tel = ${JSON.stringify(req.body.tel)} OR 
            nom = ${JSON.stringify(req.body.tel)})`)
        req.session.login = result1[0]
        let datas = {login: result1[0].nom, id: result1[0].id,
        tel: result1[0].tel,role: result1[0].role}

        res.send(datas)
        }
    }
    else if (req.body.type == 'get') {
        //----------- get admin ------------------------------------------------
        const con1 = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: req.session.db
        })

        let comptes = await con1.awaitQuery(`SELECT Manager.*, Access.cite as cite FROM Manager, Access
        WHERE Manager.id = Access.manager
        AND Manager.id != ${req.session.login.id}`)
        res.send(comptes)
    }


    else if (req.body.type == 'addCompte') {
        //--------------------- vérifions si le compte existe déja ----------------
        let result = await con.awaitQuery(`SELECT * FROM Compte
        WHERE password = ${JSON.stringify(req.body.password)} 
        AND (tel = ${JSON.stringify(req.body.tel)} OR 
            tel = ${JSON.stringify(req.body.login)} OR
            nom = ${JSON.stringify(req.body.tel)} OR
            nom = ${JSON.stringify(req.body.login)})`)
        if (result.length > 0) {
            res.send('exist')
            return
        }
        //------------------ inscription du compte dans la bd -----------------------
        await con.awaitQuery(`INSERT INTO Compte(nom,tel,password,origin,bd,role)
            VALUES (${JSON.stringify(req.body.login)},
            ${JSON.stringify(req.body.tel)},
            ${JSON.stringify(req.body.password)},
            '',
            ${JSON.stringify(req.session.db)},
            ${JSON.stringify(req.body.role)})`)
        


        //-------------- inscription dans la bd du compte  -----------------------------
        
        const con1 = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: req.session.db
        })

        await con1.awaitQuery(`INSERT INTO Manager(nom,tel,password,role)
        VALUES (${JSON.stringify(req.body.login)},
        ${JSON.stringify(req.body.tel)},
        ${JSON.stringify(req.body.password)},
        ${JSON.stringify(req.body.role)})`)

        if(req.body.role != 'superuser') {
        
            //-------- adding the relation with the cities that the account has access to ----
            //---récupéront l'id et utilisons le pour le nom de la bd ----------------
            let manager = await con1.awaitQuery(`SELECT id FROM Manager WHERE 
                        nom = ${JSON.stringify(req.body.login)} AND
                        tel = ${JSON.stringify(req.body.tel)} AND
                        password = ${JSON.stringify(req.body.password)}`)

            let i = 0, cities = req.body.cities
            for(i=0;i<cities.length;i++) {
                await con1.awaitQuery(`INSERT INTO Access(manager,cite)
                VALUES (${JSON.stringify(manager[0].id)},
                ${JSON.stringify(cities[i])})`)
            }
        }

        //----------- get admin ------------------------------------------------
        let comptes = await con1.awaitQuery(`SELECT Manager.*, Access.cite as cite FROM Manager, Access
        WHERE Manager.id = Access.manager
        AND Manager.id != ${req.session.login.id}`)
        res.send(comptes)

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
        await con.awaitQuery(`DELETE FROM Compte
        WHERE nom = ${JSON.stringify(req.body.nom)} 
        AND bd = ${JSON.stringify(req.session.db)}
        AND tel = ${JSON.stringify(req.body.tel)}
        AND password = ${JSON.stringify(req.body.password)}
        `)
        //----------- delete also in the account db ------------------------------------------------
        const con1 = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: req.session.db
        })
        await con1.awaitQuery(`DELETE FROM Access
        WHERE manager = ${JSON.stringify(req.body.id)}
        `)
        await con1.awaitQuery(`DELETE FROM Manager
        WHERE nom = ${JSON.stringify(req.body.nom)} 
        AND tel = ${JSON.stringify(req.body.tel)}
        AND password = ${JSON.stringify(req.body.password)}
        `)
        //----------- get admin ------------------------------------------------
        let comptes = await con1.awaitQuery(`SELECT Manager.*, Access.cite as cite FROM Manager, Access
        WHERE Manager.id = Access.manager
        AND Manager.id != ${req.session.login.id}`)
        res.send(comptes)
    }
}
export default inscription