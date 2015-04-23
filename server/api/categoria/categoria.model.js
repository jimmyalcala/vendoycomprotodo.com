'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategoriaSchema = new Schema({
  nombre: {type:String,index: true },
  drescripcion: String,
  ancestros:[{type:mongoose.Schema.Types.ObjectId,ref:'Categoria'}],
  padre:{type:mongoose.Schema.Types.ObjectId,ref:'Categoria'},
  imagen:String,
  cantidad:Number,
  activa: {type:Boolean,default:true}
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
