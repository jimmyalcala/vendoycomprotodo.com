'use strict';

var _ = require('lodash');
var Categoria = require('./categoria.model');

function agregarHijos (na,cat) {
  var nodos=[],
      nn=[],
      ch=0;
  for (var x = 0; x < cat.length; x++) {
    if (na._id.equals(cat[x].padre)) {
      nodos.push(cat[x]);
      ch++;
    };
  };

  if (ch>0) {
    for (var s = 0; s < nodos.length; s++) {
      var h=agregarHijos(nodos[s],cat);
      nn.push({
        _id:nodos[s]._id,
        nombre:nodos[s].nombre,
        padre:nodos[s].padre,
        activa:nodos[s].activa,
        imagen:nodos[s].imagen,
        ancestros:nodos[s].ancestros,
        nodes:h
      })
    };
  };
  return nn;
}

function convertirArbol (cat) {
  var nuevoArbol = [],
      af = [];
  for (var i = 0; i < cat.length; i++) {
    if (cat[i].padre === null) {
      nuevoArbol.push(cat[i]);
    };
  };
  for (var j = 0; j < nuevoArbol.length ; j++) {
    var hijos =agregarHijos(nuevoArbol[j],cat)
    af.push({
      _id:nuevoArbol[j]._id,
      nombre:nuevoArbol[j].nombre,
      padre:nuevoArbol[j].padre,
      activa:nuevoArbol[j].activa,
      imagen:nuevoArbol[j].imagen,
      ancestros:nuevoArbol[j].ancestros,
      nodes:hijos
    })
  };
  return af;
}

// Get list of categorias
exports.index = function(req, res) {
  Categoria.find()
  .sort({padre:1})
  .exec(function (err, categorias) {
    if(err) { return handleError(res, err); }
    var categoriasArbol = convertirArbol(categorias);
    return res.json(200, categoriasArbol);
  });
};

// Get a single categoria
exports.show = function(req, res) {
  Categoria.findById(req.params.id, function (err, categoria) {
    if(err) { return handleError(res, err); }
    if(!categoria) { return res.send(404); }
    return res.json(categoria);
  });
};

// Creates a new categoria in the DB.
exports.create = function(req, res) {
  Categoria.create(req.body, function(err, categoria) {
    if(err) { return handleError(res, err); }
    return res.json(201, categoria);
  });
};

// Updates an existing categoria in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Categoria.findById(req.params.id, function (err, categoria) {
    if (err) { return handleError(res, err); }
    if(!categoria) { return res.send(404); }
    var updated = _.merge(categoria, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, categoria);
    });
  });
};

// Deletes a categoria from the DB.
exports.destroy = function(req, res) {
  Categoria.findById(req.params.id, function (err, categoria) {
    if(err) { return handleError(res, err); }
    if(!categoria) { return res.send(404); }
    categoria.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
