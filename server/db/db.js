const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryParentSchema = new Schema({
    name: {
        type: String
    }
})
const categorySonSchema = new Schema({
    name: {
        type: String
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'CategoryParent',
    }
})
const adminUserSchema = new Schema({
    userName:{
        type:String
    },
    password:{
        type:String,
        select:false,
        set(val){
            return require('bcrypt').hashSync(val,10)
        }
    },
    sex:{
        type:String
    },
    phone:{
        type:Number
    }
})
const articleSchema = new Schema({
    title:{
        type:String
    },
    categoryParent:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'CategoryParent'
    },
    categorySon:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'CategorySon'
    }],
    body:{
        type:String
    },
    created_time:{
        type:Date
    }
})
const linkColSchema = new Schema({
    name:{
        type:String
    },
    link:{
        type:String
    }
})
const linkPerSchema = new Schema({
    name:{
        type:String
    },
    link:{
        type:String
    }
})

exports.CategoryParent = mongoose.model('CategoryParent', categoryParentSchema)
exports.CategorySon = mongoose.model('CategorySon', categorySonSchema)
exports.AdminUser = mongoose.model('AdminUser',adminUserSchema)
exports.Article = mongoose.model('Article',articleSchema)
exports.LinkCol = mongoose.model('LinkCol',linkColSchema)
exports.LinkPer = mongoose.model('LinkPer',linkPerSchema)