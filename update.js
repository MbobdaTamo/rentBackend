import update1 from './update1.js'

const update = async(req, res,con) => {
    
    if(req.session.login.role != "superuser") {
        let datas = await update1(req,con)
        res.send(datas)
        return
    }
    
    let citeQuery = `SELECT Cite.*, COUNT(chambre.id) as nbrChambre
    FROM Cite 
    LEFT JOIN (SELECT Chambre.* FROM Chambre WHERE Chambre.deleted = 0 ) as chambre
    ON Cite.id = chambre.cite
    WHERE Cite.deleted = 0
    GROUP BY Cite.id
    ORDER BY Cite.nom`

    let chambreQuery = `SELECT Chambre.*, COUNT(contrat.id) AS occupied
    FROM Chambre
    LEFT JOIN (SELECT ContratLocation.* 
    FROM ContratLocation, Locataire 
    WHERE ContratLocation.deleted != 1
    AND ContratLocation.locataire = Locataire.id
    AND Locataire.deleted = 0) as contrat
    ON Chambre.id = contrat.chambre 
    WHERE Chambre.deleted = 0
    GROUP BY Chambre.id
    ORDER BY Chambre.nom`

    let contratQuery =  `SELECT contrat.id,
    contrat.locataire,
    contrat.chambre,
    DATE_FORMAT(contrat.date_debut,"%Y/%m/%d") as date_debut,
    contrat.loyer,
    contrat.totalPayer+contrat.totalCharge as balance,
    contrat.totalPayer,
    contrat.totalCharge,
    contrat.nbrMoisPayer,
    contrat.payDebutMois,
    contrat.deleted,
    contrat.stopped,
    loc.nom as locataireNom,
    loc.prenom as locatairePrenom,
    chb.nom as chambreNom,
    cit.nom as citeNom,
    cit.id as cite
    FROM 
    (SELECT * FROM ContratLocation WHERE ContratLocation.deleted != 1) as contrat,
    (SELECT * FROM Locataire WHERE Locataire.deleted = 0) as loc,
    (SELECT * FROM Chambre WHERE Chambre.deleted = 0) as chb,
    (SELECT * FROM Cite WHERE Cite.deleted = 0) as cit
    WHERE
    contrat.locataire = loc.id
    AND contrat.chambre = chb.id
    AND chb.cite = cit.id`

    let paymentQuery = `SELECT id,
    manager,
    managerNom,
    contratLocation,
    montant,
    DATE_FORMAT(date,"%Y/%m/%d") as date
    FROM Payment ORDER BY id DESC`

    let chargeQuery = `SELECT id,
    manager,
    contrat,
    montant,
    raison,
    DATE_FORMAT(date,"%Y/%m/%d") as date
    FROM Charge ORDER BY id DESC`

    let variantQuery = `SELECT Variants.id as id,
    montant,
    DATE_FORMAT(startMonth,"%Y/%m/%d") as startMonth,
    montant,
    description,
    contrat,
    locataire
    FROM Variants, ContratLocation 
    WHERE ContratLocation.id = Variants.contrat
    AND ContratLocation.deleted != 1
    ORDER BY Variants.id ASC`

    let toDay = new Date()

    let locataireQuery = `SELECT * FROM Locataire WHERE deleted = 0 ORDER BY nom`
    let datas = {};
    datas = {cites:await con.awaitQuery(citeQuery)}
    datas = {...datas, chambres:await con.awaitQuery(chambreQuery)}
    datas = {...datas, contrats:await con.awaitQuery(contratQuery)}
    datas = {...datas, payments:await con.awaitQuery(paymentQuery)}
    datas = {...datas, locataires:await con.awaitQuery(locataireQuery)}
    datas = {...datas, charges:await con.awaitQuery(chargeQuery)}
    datas = {...datas, variants:await con.awaitQuery(variantQuery)}
    datas = {...datas, serverDate: toDay.getFullYear()+'-'+(toDay.getMonth()+1)+'-'+toDay.getDate() }
    res.send(datas)
}
export default update