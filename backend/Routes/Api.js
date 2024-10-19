const router=require('express').Router();
const model=require('../models/newevent-model')
router.get('/',async(req,res,next)=>{
var all=await model.find()
res.json(all);
})
module.exports=router