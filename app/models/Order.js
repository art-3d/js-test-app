var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  vendor: { type: String, required: true },
  customer: { type: String, required: true },
  type: { type: String, required: true },
  create_date: Date,
  fulfillment_date: Date,
  id: String
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
