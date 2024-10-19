const router=require('express').Router();
const upload=require('../controllers/MulterConfig')
const  model=require('../models/newevent-model')

router.post('/',upload.single('productImage'),async(req,res,next)=>{
     var data ={
      eventname: req.body.eventname,
      description: req.body.description,
      city: req.body.city,
      skills: req.body.skills,
      time: req.body.time,
     
  filename: req.file.filename,
  path: `C:/Users/Aryav Jain/Desktop/images/${req.file.filename}`,
    }

// console.log(data);
// console.log(req.body);
// console.log(req.file);
  await model(data).save().then(()=>{
   res.status(200).json({status:"success"})
  })
  .catch((error)=>{
res.status(500).json({status:"internal server error"})

  })

})

module.exports=router