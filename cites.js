const cites = async(req, res,con) => {
    
    if(req.session.login.role != "superuser") {
        res.send(null)
        return
    }


    if (req.body.type == 'login') {
        //--------------------- vérifions si le compte existe déja --------------
        let result = await con.awaitQuery(`SELECT * FROM Manager 
                     WHERE login = ${JSON.stringify(req.body.login)} 
                     AND password = ${JSON.stringify(req.body.password)}`)
        if (result.length == 0) {
            res.send('nothing')
        } else {
            let datas = {};
            datas = {...datas, login: result[0].login}
            datas = {...datas, id: result[0].id}
            datas = {...datas, isAdmin: result[0].isAdmin}
            req.session.login = datas
            //console.log(req.session.id)
            res.send(datas)
        }
    }
    if (req.body.type == 'add') {
        //--------------------- vérifions si la cite existe déja ----------------
        let result = await con.awaitQuery(`SELECT id FROM Cite WHERE 
                    nom = ${JSON.stringify(req.body.nom)} AND deleted = 0`)
        if (result.length == 0) {
            //------------------ inscription du compte dans la bd -----------------------
            await con.awaitQuery(`INSERT INTO Cite(nom, location, description)
                VALUES (${JSON.stringify(req.body.nom)},
                ${JSON.stringify(req.body.location)},
                ${JSON.stringify(req.body.description)})`)
            res.send('done');
        } else {
            res.send('exist');
        }
    }
    else if (req.body.type == 'modify') {
        //--------------------- vérifions si la cite existe déja ---------------
        let result = await con.awaitQuery(`SELECT id FROM Cite WHERE 
                    nom = ${JSON.stringify(req.body.nom)} AND deleted = 0`)
        if(result.length > 0) {
            res.send('exist')
            return
        }
        
        await con.awaitQuery(`UPDATE Cite SET 
                nom = ${JSON.stringify(req.body.nom)}, 
                location = ${JSON.stringify(req.body.location)}, 
                description = ${JSON.stringify(req.body.description)} 
                WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send('fait')
    }
    else if (req.body.type == 'delete') {
        await con.awaitQuery(`UPDATE Cite SET deleted = 1 WHERE id = ${JSON.stringify(req.body.id)}`)
        await con.awaitQuery(`DELETE FROM Access
        WHERE cite = ${JSON.stringify(req.body.id)}
        `)
        res.send('fait')
    }
}
export default cites