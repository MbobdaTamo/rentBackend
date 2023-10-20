const charge = async(req, res,con) => {
    if (req.body.type == 'add') {
        await con.awaitQuery(`INSERT INTO Charge(manager,managerNom,contrat,montant,raison,date)
            VALUES (${JSON.stringify(req.body.manager)},
            ${JSON.stringify(req.body.managerName)},
            ${JSON.stringify(req.body.contrat)},
            ${JSON.stringify(req.body.amount)},
            ${JSON.stringify(req.body.reason)},
            ${JSON.stringify(req.body.date)})`)
    
        //-- updating totalCharge  -----------
        await con.awaitQuery(`UPDATE ContratLocation 
            SET totalCharge = totalCharge + ${JSON.stringify(req.body.amount)} 
            WHERE id = ${JSON.stringify(req.body.contrat)}`)
        res.send('done')
    }
    else if (req.body.type == 'delete') {
        await con.awaitQuery(`DELETE FROM Charge WHERE id = ${JSON.stringify(req.body.id)}`)

        await con.awaitQuery(`UPDATE ContratLocation SET
            totalCharge = totalCharge - ${JSON.stringify(req.body.montant)} 
            WHERE id = ${JSON.stringify(req.body.contrat)}`)
        res.send('fait')
    }
}
export default charge