const contrat = async(req, res,con) => {
    if (req.body.type == 'add') {
        //------- vérifions si la chambre est prise -------------------------------
        let result = await con.awaitQuery(`SELECT chambre FROM ContratLocation 
                    WHERE chambre = ${JSON.stringify(req.body.chambre)} AND deleted = 0`)
        if (result.length != 0) {
            res.send('error');
        }
        else {
        //------------------ inscription du contrat dans la bd ---------------------
        await con.awaitQuery(`INSERT INTO 
                ContratLocation(locataire, chambre, date_debut,loyer,balance)
                VALUES (${JSON.stringify(req.body.locataire)},
                ${JSON.stringify(req.body.chambre)},
                ${JSON.stringify(req.body.dateDebut)},
                ${JSON.stringify(req.body.loyer)},
                ${JSON.stringify(-req.body.loyer)})`)
            res.send(null)
        }
    }
    else if (req.body.type == 'modify') {
        await con.awaitQuery(`UPDATE ContratLocation SET 
            loyer = ${JSON.stringify(req.body.loyer)}, 
            nbrMoisPayer = 0, 
            date_debut = ${JSON.stringify(req.body.dateDebut)}, 
            balance = ${JSON.stringify(-req.body.loyer)}, totalPayer = 0
            WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send(null)
    }
    else if (req.body.type == 'delete') {
        await con.awaitQuery(`UPDATE ContratLocation SET deleted = 1 WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send(null)
    }
    if (req.body.type == 'pay') {
        await con.awaitQuery(`INSERT INTO Payment(manager,managerNom,contratLocation,montant,date)
            VALUES (${JSON.stringify(req.body.manager)},
            ${JSON.stringify(req.body.managerName)},
            ${JSON.stringify(req.body.contrat)},
            ${JSON.stringify(req.body.payment)},
            ${JSON.stringify(req.body.date)})`)
        
        let id = await con.awaitQuery(`SELECT MAX(id) as id FROM Payment`)
    
        //-- updating balance -----------
        await con.awaitQuery(`UPDATE ContratLocation 
            SET balance = balance + ${JSON.stringify(req.body.payment)},
            totalPayer = totalPayer + ${JSON.stringify(req.body.payment)} 
            WHERE id = ${JSON.stringify(req.body.contrat)}`)
    
        // ----- updating nbrMoisPayer --------------------
        await con.awaitQuery(`UPDATE ContratLocation SET 
            nbrMoisPayer = (totalPayer - totalPayer%loyer)/loyer 
            WHERE id = ${JSON.stringify(req.body.contrat)}`)
        console.log(id[0].id)
        res.send(JSON.stringify(id[0].id))
    
    }
    else if (req.body.type == 'cancelPay') {
        
        await con.awaitQuery(`DELETE FROM Payment WHERE id = ${JSON.stringify(req.body.id)}`)
    
        await con.awaitQuery(`UPDATE ContratLocation SET 
            balance = balance - ${JSON.stringify(req.body.payment)}, 
            totalPayer = totalPayer - ${JSON.stringify(req.body.payment)} 
            WHERE id = ${JSON.stringify(req.body.contrat)}`)
    
        // ----- updating nbrMoisPayer --------------------
        await con.awaitQuery(`UPDATE ContratLocation SET 
            nbrMoisPayer = (totalPayer - totalPayer%loyer)/loyer 
            WHERE id = ${JSON.stringify(req.body.contrat)}`)
            
        res.send('fait');
    }
}
export default contrat