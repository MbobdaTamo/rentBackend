const chambres = async(req, res,con) => {
    
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
        //--------------------- vérifions si la chambre existe déja ---------------------
        let result = await con.awaitQuery(`SELECT id FROM Chambre WHERE 
                nom = ${JSON.stringify(req.body.nom)} AND deleted = 0`)

        if (result.length == 0) {
            //------------------ inscription du compte dans la bd -------------------
            await con.awaitQuery(`INSERT INTO 
                Chambre(nom, location, cite,loyerParDefaut, description)
                VALUES (${JSON.stringify(req.body.nom)},
                ${JSON.stringify(req.body.location)},
                ${JSON.stringify(req.body.cite)},
                ${JSON.stringify(req.body.loyerParDefaut)},
                ${JSON.stringify(req.body.description)})`)
            res.send(null)
        }
        else {
            res.send('exist');
        }
    }
    else if (req.body.type == 'modify') {
        //--------------------- vérifions si le compte existe déja ---------------------
        let result = await con.awaitQuery(`SELECT id FROM Chambre WHERE 
        nom = ${JSON.stringify(req.body.nom)} AND deleted = 0`)
        if(result.length > 0) {
            res.send('exist')
            return
        }

        await con.awaitQuery(`UPDATE Chambre SET 
        nom = ${JSON.stringify(req.body.nom)}, 
        location = ${JSON.stringify(req.body.location)},
        loyerParDefaut = ${JSON.stringify(req.body.loyerParDefaut)}, 
        description = ${JSON.stringify(req.body.description)} 
        WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send('done')
    }
    else if (req.body.type == 'delete') {
        await con.awaitQuery(`UPDATE Chambre SET deleted = 1 WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send(null)
    } 
}
export default chambres