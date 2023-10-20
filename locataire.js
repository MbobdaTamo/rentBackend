const locataire = async(req, res,con) => {
    if (req.body.type == 'delete') {
        await con.awaitQuery(`UPDATE Locataire SET deleted = 1 WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send(null)
    }
    else if (req.body.type == 'modify') {
        if (req.body.image == '') {
            req.body.image = 'default.png';
        }
        await con.awaitQuery(`UPDATE Locataire SET 
            image = ${JSON.stringify(req.body.image)}, 
            nom = ${JSON.stringify(req.body.nom)},
            prenom = ${JSON.stringify(req.body.prenom)},
            tel1 = ${JSON.stringify(req.body.tel)} 
            WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send(null)
    }
}
export default locataire