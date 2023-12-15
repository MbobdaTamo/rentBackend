const contrat = async(req, res,con) => {
    if(req.session.login.role != "superuser" && req.body.type != 'pay') {
        res.send(null)
        return
    }


    if (req.body.type == 'add') {
        //------- vérifions si la chambre est prise -------------------------------
        let result = await con.awaitQuery(`SELECT chambre FROM ContratLocation 
                    WHERE chambre = ${JSON.stringify(req.body.chambre)} AND deleted = 0`)
        if (result.length != 0) {
            res.send('error')
            return
        }
        //------------------ inscription du contrat dans la bd ---------------------
        
        await con.awaitQuery(`INSERT INTO 
            ContratLocation(locataire, chambre, date_debut,loyer,balance,
                payDebutMois)
            VALUES (${JSON.stringify(req.body.locataire)},
            ${JSON.stringify(req.body.chambre)},
            ${JSON.stringify(req.body.dateDebut)},
            ${JSON.stringify(req.body.loyer)},
            ${JSON.stringify(0)},
            
            ${JSON.stringify(req.body.startMonthPaying)}
            )`)

        //------------- creation variant (charges) -------------------------------
        let ctr = await con.awaitQuery(`
                SELECT id FROM ContratLocation WHERE
                locataire = ${JSON.stringify(req.body.locataire)}
                AND chambre = ${JSON.stringify(req.body.chambre)}
                AND loyer = ${JSON.stringify(req.body.loyer)}
                ORDER BY id DESC
            `)
        
        await con.awaitQuery(`INSERT INTO
            Variants(montant, startMonth,description,contrat)
            VALUES (${JSON.stringify(req.body.charges)},
            ${JSON.stringify(req.body.dateDebut)},
            ${JSON.stringify(req.body.descripCharges)},
            ${JSON.stringify(ctr[0].id)}
            )`)
        res.send(null)
    
    }
    else if (req.body.type == 'modify') {
        await con.awaitQuery(`UPDATE ContratLocation SET 
            loyer = ${JSON.stringify(req.body.loyer)}, 
            nbrMoisPayer = 0, 
            date_debut = ${JSON.stringify(req.body.dateDebut)}, 
            balance = ${JSON.stringify(-req.body.loyer)}, totalPayer = 0,totalCharge = 0
            WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send(null)
    }
    else if (req.body.type == 'delete') {
        await con.awaitQuery(`UPDATE ContratLocation SET deleted = 1 WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send(null)
    }
    else if (req.body.type == 'stop') {
        await con.awaitQuery(`UPDATE ContratLocation 
        SET deleted = 2, 
        stopped = NOW()
        WHERE id = ${JSON.stringify(req.body.id)}`)
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
            SET totalPayer = totalPayer + ${JSON.stringify(req.body.payment)} 
            WHERE id = ${JSON.stringify(req.body.contrat)}`)

        //console.log(id[0].id)
        res.send(JSON.stringify(id[0].id))
    
    }
    else if (req.body.type == 'cancelPay') {
        
        await con.awaitQuery(`DELETE FROM Payment WHERE id = ${JSON.stringify(req.body.id)}`)
    
        await con.awaitQuery(`UPDATE ContratLocation SET 
            totalPayer = totalPayer - ${JSON.stringify(req.body.payment)} 
            WHERE id = ${JSON.stringify(req.body.contrat)}`)
            
        res.send('fait');
    }
    /*------------------ variant manageent -----------------------*/
    else if (req.body.type == 'addVariant') {
        
        let vr = await con.awaitQuery(`
        SELECT startMonth FROM Variants WHERE
        contrat = ${JSON.stringify(req.body.contrat)}
        ORDER BY id DESC
        `)
        
        let last = vr[0].startMonth
        let lastDate = (new Date(last))
        lastDate = lastDate.getFullYear()+'-'+(lastDate.getMonth()+1)+'-'+lastDate.getDate()
        let lDate = new Date(lastDate)
        lDate.setHours(0,0,0,0)
        let newDate = (new Date(req.body.dateDebut))
        newDate.setHours(0,0,0,0)
        //console.log(new Date(lastDate))
        //console.log(new Date(req.body.dateDebut+' 00:00:00'))
        //console.log(lastDate)
        //console.log(req.body.dateDebut+' 00:00:00')
        if(lDate.getTime() >= newDate.getTime()) {
            res.send('date début incorrecte')
            return
        }
        
        await con.awaitQuery(`INSERT INTO
        Variants(montant, description, startMonth,contrat)
        VALUES (${JSON.stringify(req.body.montant)},
            ${JSON.stringify(req.body.description)},
            ${JSON.stringify(req.body.dateDebut)},
            ${JSON.stringify(req.body.contrat)}
        )`)
        res.send('done')
        return
    }
    else if (req.body.type == 'modifyVariant') {
        
        //----- let's verify if it is the last element ---------
        let vr = await con.awaitQuery(`
        SELECT id, startMonth FROM Variants WHERE
        contrat = ${JSON.stringify(req.body.contrat)}
        ORDER BY id DESC
        `)

        if(vr[0].id != req.body.id) {
            res.send('cantModify')
            return
        }
        
        let startMonth
        if(vr.length == 1) {
            let d = new Date(vr[0].startMonth)
            startMonth = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
        }
        else {
            let last = vr[1].startMonth
            let lastDate = (new Date(last))
            lastDate = lastDate.getFullYear()+'-'+(lastDate.getMonth()+1)+'-'+lastDate.getDate()
            let lDate = new Date(lastDate)
            lDate.setHours(0,0,0,0)
            let newDate = (new Date(req.body.dateDebut))
            newDate.setHours(0,0,0,0)
        
            if(lDate.getTime() >= newDate.getTime()) {
                res.send('date début incorrecte')
                return
            }
            startMonth = req.body.dateDebut
        }
        
        await con.awaitQuery(`UPDATE Variants
        SET montant = ${JSON.stringify(req.body.montant)},
            description = ${JSON.stringify(req.body.description)},
            startMonth = ${JSON.stringify(startMonth)}
        WHERE id = ${JSON.stringify(req.body.id)}
        `)
        res.send('done')
        return
    }
    else if (req.body.type == 'deleteVariant') {
        
        //----- let's verify if it is the last element ---------
        let vr = await con.awaitQuery(`
        SELECT id, startMonth FROM Variants WHERE
        contrat = ${JSON.stringify(req.body.contrat)}
        ORDER BY id DESC
        `)
        if(vr[0].id != req.body.id || vr.length == 1) {
            res.send('cantDelete')
            return
        }
        await con.awaitQuery(`DELETE FROM Variants WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send('done')
    }
    else if (req.body.type == 'avantFinVariant') {

        await con.awaitQuery(`UPDATE ContratLocation
        SET payDebutMois = ${JSON.stringify(req.body.debutMois)}
        WHERE id = ${JSON.stringify(req.body.contrat)}
        `)
        res.send('done')
    }
}
export default contrat