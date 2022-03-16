"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const productsRouter = (0, _express.Router)();
productsRouter.get('/', async (request, response) => {
  try {
    return response.send('{"products": [{' + '"id": "123",' + '"title": "Nome do produto 01",' + '"image_url": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/camiseta-ecommerce.jpg",' + '"price": 50' + ' },' + '{' + ' "id": "1234",' + '  "title": "Nome do produto 02",' + '  "image_url": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/camiseta-ecommerce.jpg",' + '  "price": 60' + '},' + ' {' + '  "id": "12345",' + '  "title": "Nome do produto 03",' + '  "image_url": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/camiseta-ecommerce.jpg",' + '  "price": 70' + '},' + '{' + '  "id": "123456",' + '  "title": "Nome do produto 04",' + '  "image_url": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/camiseta-ecommerce.jpg",' + '  "price": 80' + '}]}');
  } catch (err) {
    return response.status(400).json({
      message: err.message
    });
  }
});
var _default = productsRouter;
exports.default = _default;