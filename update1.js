const update1 = async(req,con) => {
    
    let citeQuery = `SELECT cite.*, COUNT(chambre.id) as nbrChambre
    FROM (SELECT Cite.* FROM Cite,Access WHERE Cite.deleted = 0
        AND Cite.id = Access.cite
        AND Access.manager = ${JSON.stringify(req.session.login.id)}) as cite

    LEFT JOIN (SELECT Chambre.* FROM Chambre WHERE Chambre.deleted = 0 ) as chambre
    ON cite.id = chambre.cite
    GROUP BY cite.id
    ORDER BY cite.nom`

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

    (SELECT Cite.* FROM Cite, Access WHERE Cite.deleted = 0
        AND Cite.id = Access.cite
        AND Access.manager = ${JSON.stringify(req.session.login.id)}
    ) as cit

    
    WHERE
    contrat.locataire = loc.id
    AND contrat.chambre = chb.id
    AND chb.cite = cit.id
    GROUP BY contrat.id
    `

    let paymentQuery = `SELECT Payment.id as id,
    Payment.manager as manager,
    Payment.managerNom as managerNom,
    Payment.contratLocation as contratLocation,
    Payment.montant as montant,
    DATE_FORMAT(Payment.date,"%Y/%m/%d") as date
    FROM Payment, ContratLocation, Chambre, Access
    WHERE Payment.contratLocation = ContratLocation.id
    AND ContratLocation.chambre =  Chambre.id
    AND Chambre.cite = Access.cite
    AND Access.manager = ${JSON.stringify(req.session.login.id)}
    GROUP BY Payment.id
    ORDER BY id DESC`

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

    let locataireQuery = `
    SELECT Locataire.* FROM Locataire, ContratLocation, Chambre,Cite, Access
    WHERE Locataire.deleted = 0
    AND Locataire.id = ContratLocation.locataire
    AND ContratLocation.chambre = Chambre.id
    AND Chambre.cite = Cite.id
    AND Cite.id = Access.cite
    AND Access.manager = ${JSON.stringify(req.session.login.id)}
    GROUP BY Locataire.id
    ORDER BY Locataire.nom
    `
    let datas = {};
    datas = {cites:await con.awaitQuery(citeQuery)}
    datas = {...datas, chambres:await con.awaitQuery(chambreQuery)}
    datas = {...datas, contrats:await con.awaitQuery(contratQuery)}
    datas = {...datas, payments:await con.awaitQuery(paymentQuery)}
    datas = {...datas, locataires:await con.awaitQuery(locataireQuery)}
    datas = {...datas, charges:await con.awaitQuery(chargeQuery)}
    datas = {...datas, variants:await con.awaitQuery(variantQuery)}
    datas = {...datas, serverDate: toDay.getFullYear()+'-'+(toDay.getMonth()+1)+'-'+toDay.getDate() }
    
    return datas
}
export default update1