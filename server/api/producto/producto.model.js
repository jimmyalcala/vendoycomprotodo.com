'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var ProductoSchema = new Schema({
  nombre: {type:String,required:true},
  descripcion: {type:String,required:true},
  precio: {type:Number,default:0},
  codigoBarras:String,
  condicion:{type:String,enum:['Nuevo','Usado']},
  cantidad: {type:Number,default:0},
  entrada: {type:Date, default:Date.now},
  imagenes:[String],
  video:String,
  formaPago:String,
  User:{type: Schema.Types.ObjectId, ref: 'User'},
  active: Boolean
});

module.exports = mongoose.model('Producto', ProductoSchema);
