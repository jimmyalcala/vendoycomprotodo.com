'use strict';

var _ = require('lodash');
var Producto = require('./producto.model');

// Get list of productos
exports.index = function(req, res) {
  Producto.find(function (err, productos) {
    if(err) { return handleError(res, err); }
    return res.json(200, productos);
  });
};

// Get a single producto
exports.show = function(req, res) {
  Producto.findById(req.params.id, function (err, producto) {
    if(err) { return handleError(res, err); }
    if(!producto) { return res.send(404); }
    return res.json(producto);
  });
};

// Creates a new producto in the DB.
exports.create = function(req, res) {
  Producto.create(req.body, function(err, producto) {
    if(err) { return handleError(res, err); }
    return res.json(201, producto);
  });
};

// Updates an existing producto in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Producto.findById(req.params.id, function (err, producto) {
    if (err) { return handleError(res, err); }
    if(!producto) { return res.send(404); }
    var updated = _.merge(producto, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, producto);
    });
  });
};

// Deletes a producto from the DB.
exports.destroy = function(req, res) {
  Producto.findById(req.params.id, function (err, producto) {
    if(err) { return handleError(res, err); }
    if(!producto) { return res.send(404); }
    producto.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}