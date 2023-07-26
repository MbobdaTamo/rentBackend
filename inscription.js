const user = async(req, res,con) => {
    
    if(req.body.type === "inscription") {
        let users = await con.awaitQuery(`SELECT * FROM User
            WHERE tel = ${JSON.stringify(req.body.contact)}`)
        if(users.length > 0) {
            res.send('exist')
            return
        }
        
        
        await con.awaitQuery(`INSERT INTO 
        User (name, password, tel)
        VALUES (${JSON.stringify(req.body.name)},
            ${JSON.stringify(req.body.password)},
            ${JSON.stringify(req.body.contact)})`)
        //------ let's get the id to have all information as the user will be connected now  -----------------
        let userInfos = await con.awaitQuery(`
            SELECT HEX(AES_ENCRYPT(id, 'benjaminmendy2000')) AS id, name, tel
            FROM User
            WHERE tel = ${JSON.stringify(req.body.contact)}
            AND password = ${JSON.stringify(req.body.password)}`)
        req.session.user = userInfos[0]
        res.send(userInfos[0])
    }
    else if (req.body.type === 'connexion') {
        let userInfos = await con.awaitQuery(`
            SELECT HEX(AES_ENCRYPT(id, 'benjaminmendy2000')) AS id, name, tel
            FROM User
            WHERE tel = ${JSON.stringify(req.body.contact)}
            AND password = ${JSON.stringify(req.body.password)}`)
        if(userInfos.length == 0) {
            res.send('notExist')
            return
        }
        req.session.user = userInfos[0]
        res.send(userInfos[0])
    }
}
export default user