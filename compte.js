const compte = async(req, res,con) => {
    
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
    //----- in case of adding new user ----
    else if (req.body.type == 'add') {
        await con.awaitQuery(`INSERT INTO Manager(login, password, isAdmin)
        VALUES (${JSON.stringify(req.body.login)},
        ${JSON.stringify(req.body.password)},
        ${JSON.stringify(req.body.isAdmin)})`)
    
        //----------- get admin -----------------------------------------------

        let result = await con.awaitQuery(`SELECT * FROM Manager WHERE id != ${req.session.login.id}`)
        res.send(result)
    }
    else if (req.body.type == 'modify') {
        await con.awaitQuery(`UPDATE Manager SET 
        login = ${JSON.stringify(req.body.login)} , 
        password = ${JSON.stringify(req.body.password)} 
        WHERE id = ${JSON.stringify(req.session.login.id)}`)
        res.send('fait')
    } 
    else if (req.body.type == 'get') {
        //----------- get admin ------------------------------------------------
        let result = await con.awaitQuery(`SELECT * FROM Manager WHERE id != ${req.session.login.id}`)
        res.send(result)
    }
    else if (req.body.type == 'delete') {
        await con.awaitQuery(`DELETE FROM Manager WHERE id = ${JSON.stringify(req.body.id)}`)
        //----------- get admin ------------------------------------------------
        
        let result = await con.awaitQuery(`SELECT * FROM Manager WHERE id != ${req.session.login.id}`)
        res.send(result)
    }
}
export default compte