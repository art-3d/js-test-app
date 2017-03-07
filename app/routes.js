var Order = require('./models/Order');

module.exports = function (app, express) {

  var apiRouter = express.Router();

  apiRouter.route('/orders')

    .get(function (req, res) {
      var search = {};
      if (req.query.value && req.query.key) {
        search[req.query.key] = new RegExp(req.query.value, 'i');
      }

      Order.find(search, function (err, orders) {
          if (err) throw err;
          res.json(orders);
        });
    })

    .post(function (req, res) {
      var data = req.body;

      Order
        .find({'create_date': data.create_date}, function (err, orders) {
          if (err) throw err;
          return orders;
        })
        .then(function (orders) {
          data.id = data.type.charAt(0).toLowerCase() +
            data.create_date.replace(/\d{2}(\d{2})-(\d{2})-(\d{2})/, '-$1$2$3') +
            ++orders.length;

          var order = Order(data);
          order.save(function (err) {
            if (err) throw err;
            res.json('success');
          });
        });

    });

  apiRouter.route('/orders/:order_id')

    .get(function (req, res) {
      Order.find({'id': req.params.order_id}, function (err, orders) {
        if (err) throw err;
        res.json(orders.shift());
      });
    })

    .put(function (req, res) {
      Order.find({'id': req.params.order_id}, function (err, orders) {
        if (err) throw err;
        var order = orders.shift();

        if (req.body.customer) order.customer = req.body.customer;
        if (req.body.vendor) order.vendor = req.body.vendor;
        if (req.body.type) order.type = req.body.type;

        order.save(function (err) {
          if (err) throw err;
          res.json({ message: 'Order updated' });
        });
      });

    })

    .delete(function (req, res) {
      Order.remove({'id': req.params.order_id}, function (err, order) {
        if (err) throw err;
        res.json({ message: 'Successfully deleted' });
      });
    });

  return apiRouter;
};
