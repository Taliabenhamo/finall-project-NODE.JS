const express=require('express');
const Router=express.Router()
const {CardModel,validateCard, generateBizNumber}=require('../models/cards')
const lodash=require('lodash')
const auth=require('../middleware/auth')


Router.post('/random',auth,async(req,res)=>{
  const ranNumber=await  generateBizNumber(card);
  console.log(ranNumber);
  res.send(ranNumber)
})


Router.post('/add_card',auth,async(req,res)=>{

  // const{error}=validateCard(req.body)
  // if(error)return res.status(400).send(error.details[0].message)
  // console.log('error');
  
  let card=new CardModel({
    Name:req.body.Name,
    Description:req.body.Description,
    Address:req.body.Address,
    Phone:req.body.Phone,
    // If the visitor did not enter a url, he will be given a general image.
    Image:req.body.Image?req.body.Image:"https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160_1280.png",
    bizNumber:req.body.bizNumber,
    user_id:req.body.user_id
  });
   const post=await card.save()
   res.send(post)
  console.log('You have successfully added your business card.')

  });


  Router.get('/:_id',auth,async(req,res)=>{
    try{ 
      const card_id=await CardModel.findOne({card:req.body})
       res.json({status:"succses",data:card_id})
    }
       catch(err){
       res.status(401).json({status: 'Fail',  message:'check id card/user not found in system.'})
      
       }
  });
// // נשאר לבדוק את החלק עם הauth

// Router.put('/update/:_id', auth, async (req, res) => {
//   let card = await CardModel.findOneAndUpdate({ _id: req.params.id}, req.body);
//   if (!card) return res.status(404).send('The card with the given ID was not found.');
 
//   card = await CardModel.findOne({ _id: req.params.id});
//   res.send(card);
 
// });
 

  
 



module.exports=Router;