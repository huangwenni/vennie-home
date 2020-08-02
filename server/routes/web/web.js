const express = require('express')
const router = express.Router()
const { Time } = require('../../js/main')

router.get('/', async (req, res, next) => {
    const queryOptions = {}
    if (req.Model.modelName = 'Article') {
        queryOptions.populate = 'categorySon'
    }
    let items = await req.Model.find().setOptions(queryOptions)
    if (items[0].created_time) {
        items = await req.Model.find().setOptions(queryOptions).sort({created_time:-1})
        items = items.map(item => {
            const format = new Time(item.created_time)
            item._doc.time = format.getDate('YY.MM.DD') + '&nbsp;&nbsp;&nbsp;' + format.getTime()
            return item
        })
    }
    res.send(items)
})
router.get('/:id', async (req, res, next) => {
    let model
    if (req.Model.modelName = 'Article') {
        model = await req.Model.findById(req.params.id).populate('categorySon')
    }else{
        model = await req.Model.findById(req.params.id)
    }
    if (model.created_time) {
        const format = new Time(model.created_time)
        model._doc.time = format.getDate('YY.MM.DD') + '&nbsp;&nbsp;&nbsp;' + format.getTime()
    }
    res.send(model)
})
router.get('/category/:id', async (req, res, next) => {
    let model = await req.Model.find({ categoryParent: req.params.id }).populate('categoryParent')
    res.send(model)
})

module.exports = router