const saveImage = async(req, res) => {
    // Log the files to the console
    const { image_name } = req.files
    //console.log(req.files)

    // If no image submitted, exit
    if (!image_name) return res.sendStatus(400)
    if (!(/^image/.test(image_name.mimetype))) return res.sendStatus(400)

    // Move the uploaded image to our upload folder
    let name = image_name.name+Math.random().toString(36).substring(2, 15)+(new Date).getTime()
    image_name.mv('public/images/' + name)
    res.send('images/'+name)
}
export default saveImage