const express = require('express')
const router = express.Router({
    mergeParams: true
})
const multer = require('multer')
const upload = multer({dest:__dirname + '/../../uploads'})

router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'CategorySon') {
        queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
})
router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)

})
router.post('/', async (req, res) => {
    await req.Model.create(req.body)
    res.status(200).send({msg:'保存成功！'})
})
router.put('/:id', async (req, res) => {
    await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send({msg:'更改成功！'})
})
router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.status(200).send({msg:'删除成功！'})
})
router.post('/upload',upload.single('file'),async(req,res)=>{
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
})

module.exports = router
