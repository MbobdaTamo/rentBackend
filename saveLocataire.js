const saveLocataire = async(req, res,con) => {
    if(req.session.login.role != "superuser") {
        res.send(null)
        return
    }

    //--------------------- vérifions si le locataire existe déja -----------------------
    let result = await con.awaitQuery(`SELECT id FROM Locataire WHERE 
        nom = ${JSON.stringify(req.body.nom)} AND 
        prenom = ${JSON.stringify(req.body.prenom)} AND deleted = 0`)
    if (result.length == 0) {
        //------------------ inscription du locataire dans la bd -----------------
        await con.awaitQuery(`INSERT INTO 
            Locataire(nom, prenom, tel1, tel2, age,image, sexe, situation_matrimonial)
            VALUES (${JSON.stringify(req.body.nom)},
            ${JSON.stringify(req.body.prenom)},
            ${JSON.stringify(req.body.tel1)},
            ${JSON.stringify(req.body.tel2)},
            ${JSON.stringify(req.body.age)},
            ${JSON.stringify(req.body.image)},
            ${JSON.stringify(req.body.sexe)},
            ${JSON.stringify(req.body.situation)})`)
        res.send('done');
    } 
    else {
        res.send('exist');
    }
}
export default saveLocataire