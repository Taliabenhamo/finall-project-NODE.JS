const mongoose = require("mongoose");
const JOI = require("joi");
const lodash = require("lodash");
require("../app");

const CardSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
    minlenght: 2,
    maxlenght: 100,
  },
  Description: {
    type: String,
    require: true,
    minlenght: 3,
    maxlenght: 1000,
  },
  Address: {
    type: String,
    require: true,
    minlenght: 5,
    maxlenght: 250,
  },
  Phone: {
    type: String,
    required: true,
    minlenght: 8,
  },
  Image: {
    type: String,
    required: true,
    minlenght: 10,
  },
  bizNumber: {
    type: String,
    required: true,
    minlenght: 3,
    unique: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
});
const CardModel = mongoose.model("CarModel", CardSchema, "cards");

function validateCard(card) {
  const schema = JOI.object({
    Name: JOI.string().required().min(2).max(100),
    Description: JOI.string().required().min(3).max(1000),
    Address: JOI.string().required().min(5).max(250),
    Phone: JOI.string().minlenght(8).required(),
    Image: JOI.string().minlenght(10).required(),
  });
  return schema.validate(card);
}

// A function that will generate a random number but will verify that such a card number does not exist on another card
async function generateBizNumber(card) {
 
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let card = await card.findOne({ bizNumber: randomNumber });
    if (!card) return String(randomNumber);
  }
 
}
exports. generateBizNumber =  generateBizNumber;
exports.CardModel = CardModel;
exports.validateCard = validateCard;
