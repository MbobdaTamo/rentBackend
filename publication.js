import saveImage from './saveImage.js'

const publication = async(req, res,con) => {
    /*if((typeof req.session.user === 'undefined') || (req.session.user === null)) {
        res.send('error')
        return
    }*/
    if(req.body.aim === "lost" || req.body.aim === "found") {

        // verification ????j

        // case : it is a new publication
        if(req.body.id == -1) {

            // defining imgName and saving images
            let imgName = 'imgNamePub'+Math.random().toString(36).substring(2, 15)+(new Date).getTime()
            let imgIndex = [],images = {image0:'',image1:'',image2:'',image3:''}
            for(const index in req.files) {
                let i = index[index.length-1]
                imgIndex.push(i)
                images[index] = imgName + i
                let file = {}
                file['image'+i] = req.files[index]
                await saveImage(file,imgName,index[index.length-1])
            }

            //--------- let's now save all the data in the db ---------------------
            
            let d = new Date()
            d = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()
            await con.awaitQuery(`INSERT INTO 
            Object(type,owner,description,Country,city,quater,place,
                when1,when2,kind,state,imgName,img0,img1,img2,img3,creationDate,creator)
            VALUES (${JSON.stringify(req.body.type)},
                ${JSON.stringify(req.body.owner)},
                ${JSON.stringify(req.body.description)},
                ${JSON.stringify('Cameroon')},
                ${JSON.stringify(req.body.ville)},
                ${JSON.stringify(req.body.quater)},
                ${JSON.stringify(req.body.place)},
                ${JSON.stringify(req.body.quand1)},
                ${JSON.stringify(req.body.quand2)},
                ${JSON.stringify(req.body.aim)},
                ${JSON.stringify(0)},
                ${JSON.stringify(imgName)},
                ${JSON.stringify(images["image0"])},
                ${JSON.stringify(images["image1"])},
                ${JSON.stringify(images["image2"])},
                ${JSON.stringify(images["image3"])},
                ${JSON.stringify(d)},
                CAST(UNHEX(HEX(AES_DECRYPT(UNHEX(${JSON.stringify(req.body.userId)}),'benjaminmendy2000'))) AS CHAR(100))
                )`)
                
                res.send('done')
        }
        else {
            //---- let's update the data as the Publication already saved once
            let imgName = req.body.imgName
            let imgIndex = [],images = {image0:req.body.img0,image1:req.body.img1,
                image2:req.body.img2,image3:req.body.img3}
            for(const index in req.files) {
                let i = index[index.length-1]
                imgIndex.push(i)
                images[index] = imgName + i
                let file = {}
                file['image'+i] = req.files[index]
                await saveImage(file,imgName,index[index.length-1])
            }
            //-- deleting of imgs tobe deleted -------
            for(const index in req.body) {
                if(req.body[index] === 'toDelete' ) {
                    //console.log('the stuffs to be deleted: '+index[index.length-1])
                    images[index] = ''
                }
            }


            await con.awaitQuery(`UPDATE Object SET
            type = ${JSON.stringify(req.body.type)},
            owner = ${JSON.stringify(req.body.owner)},
            description = ${JSON.stringify(req.body.description)},
            city = ${JSON.stringify(req.body.ville)},
            quater = ${JSON.stringify(req.body.quater)},
            place = ${JSON.stringify(req.body.place)},
            when1 = ${JSON.stringify(req.body.quand1)},
            when2 = ${JSON.stringify(req.body.quand2)},
            img0 = ${JSON.stringify(images["image0"])},
            img1 = ${JSON.stringify(images["image1"])},
            img2 = ${JSON.stringify(images["image2"])},
            img3 = ${JSON.stringify(images["image3"])}
            WHERE creator = CAST(UNHEX(HEX(AES_DECRYPT(UNHEX(${JSON.stringify(req.body.userId)}),'benjaminmendy2000'))) AS CHAR(100))
            AND id =  ${JSON.stringify(req.body.id)}
            `)
            
            res.send('done')
        }
    }
    else if(req.body.aim === "get") {
        //----- saving of img and getting img indexes sent ----------
        let found = await con.awaitQuery(`
        SELECT
        id,type,owner,description,Country,city,quater,place,
        kind,state,imgName,img0,img1,img2,img3,
        DATE_FORMAT(when1,"%Y-%m-%d") as when1,
        DATE_FORMAT(when2,"%Y-%m-%d") as when2,
        DATE_FORMAT(creationDate,"%Y-%m-%d") as creationDate
        FROM Object
        WHERE deleted = 0 AND kind = 'found'
        AND creator = CAST(UNHEX(HEX(AES_DECRYPT(UNHEX(${JSON.stringify(req.body.id)}),'benjaminmendy2000'))) AS CHAR(100))
        `)
        let lost = await con.awaitQuery(`
        SELECT
        id,type,owner,description,Country,city,quater,place,
        kind,state,imgName,img0,img1,img2,img3,
        DATE_FORMAT(when1,"%Y-%m-%d") as when1,
        DATE_FORMAT(when2,"%Y-%m-%d") as when2,
        DATE_FORMAT(creationDate,"%Y-%m-%d") as creationDate
        FROM Object
        WHERE deleted = 0 AND kind = 'lost'
        AND creator = CAST(UNHEX(HEX(AES_DECRYPT(UNHEX(${JSON.stringify(req.body.id)}),'benjaminmendy2000'))) AS CHAR(100))
        `)
        
        res.send({found:found,lost:lost})
    }
    else if(req.body.aim === "delete") {
        await con.awaitQuery(`UPDATE Object SET
        deleted = 1 WHERE id = ${JSON.stringify(req.body.id)}`)
        res.send('done')
    }
    else if(req.body.aim === "getOne") {
        let pubs = await con.awaitQuery(`
        SELECT
        Object.id as id,type,owner,description,Country,city,quater,place,
        kind,state,imgName,img0,img1,img2,img3,
        DATE_FORMAT(when1,"%Y-%m-%d") as when1,
        DATE_FORMAT(when2,"%Y-%m-%d") as when2,
        DATE_FORMAT(creationDate,"%Y-%m-%d") as creationDate,
        User.name as creator,User.tel as tel
        FROM Object, User
        WHERE deleted = 0 AND Object.id = ${JSON.stringify(req.body.id)}
        `)
        res.send(pubs[0])
    }
    else if(req.body.aim === "sort") {
        let pubs = await con.awaitQuery(`
        SELECT
        
        Object.id as id,type,owner,description,Country,city,quater,place,
        kind,state,imgName,img0,img1,img2,img3,
        DATE_FORMAT(when1,"%Y-%m-%d") as when1,
        DATE_FORMAT(when2,"%Y-%m-%d") as when2,
        DATE_FORMAT(creationDate,"%Y-%m-%d") as creationDate,
        User.name as creator,User.tel as tel,
        pts
        FROM Object,User,
        (SELECT * FROM
        (SELECT id, 3 as pts FROM Object WHERE kind = ${JSON.stringify(req.body.kind)}'Montre'
        AND city=${JSON.stringify(req.body.city)}
        AND type=${JSON.stringify(req.body.type)}
        AND when1 >= ${JSON.stringify(req.body.quand1)} AND when2 <= ${JSON.stringify(req.body.quand2)}
        AND (description LIKE ${JSON.stringify('%'+req.body.search +'%')} OR type LIKE ${JSON.stringify('%'+req.body.type +'%')})
        
        UNION
        SELECT id,2 as pts FROM Object WHERE kind = ${JSON.stringify(req.body.kind)}
        AND city=${JSON.stringify(req.body.city)}
        AND type=${JSON.stringify(req.body.type)}
        AND when1 >= ${JSON.stringify(req.body.quand1)} AND when2 <= ${JSON.stringify(req.body.quand2)}
        
        UNION 
        SELECT id,2 as pts FROM Object WHERE kind = ${JSON.stringify(req.body.kind)}
        AND city=${JSON.stringify(req.body.city)}
        AND type=${JSON.stringify(req.body.type)}
        AND (description LIKE ${JSON.stringify('%'+req.body.search +'%')} OR type LIKE ${JSON.stringify('%'+req.body.type +'%')})
        
        UNION
        SELECT id, 2 as pts FROM Object WHERE kind = ${JSON.stringify(req.body.kind)}
        AND city=${JSON.stringify(req.body.city)}
        AND when1 >= ${JSON.stringify(req.body.quand1)} AND when2 <= ${JSON.stringify(req.body.quand2)}
        AND (description LIKE ${JSON.stringify('%'+req.body.search +'%')} OR type LIKE ${JSON.stringify('%'+req.body.type +'%')})
        
        UNION
        SELECT id, 1 as pts FROM Object WHERE kind = ${JSON.stringify(req.body.kind)}
        AND city=${JSON.stringify(req.body.city)} AND type=${JSON.stringify(req.body.type)}
        
        UNION
        SELECT id, 1 as pts FROM Object WHERE kind = ${JSON.stringify(req.body.kind)}
        AND city=${JSON.stringify(req.body.city)} 
        AND when1 >= ${JSON.stringify(req.body.quand1)} AND when2 <= ${JSON.stringify(req.body.quand2)}
        
        UNION
        SELECT id, 1 as pts FROM Object WHERE kind = ${JSON.stringify(req.body.kind)}
        AND city=${JSON.stringify(req.body.city)}
        AND (description LIKE ${JSON.stringify('%'+req.body.search +'%')} OR type LIKE ${JSON.stringify('%'+req.body.type +'%')})
        
        )
        as result
        GROUP BY id)
        as r1
        WHERE Object.id = r1.id 
        AND deleted = 0 AND Object.creator = User.id
        ORDER BY pts DESC LIMIT 100
        `)
        res.send(pubs)
    }
}
export default publication  
