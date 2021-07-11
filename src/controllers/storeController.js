const Store = require('../models/Store');

exports.getStores = async (req, res, next) => {
  try {
    const store = await Store.find().sort('name');
    res.status(200).json({
      status: 'success',
      data: store,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndUpdate(
      req.store.id,
      {$set: {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        geometry: req.body.geometry
      }},
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: store,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndRemove(req.store.id);

    if (!store)
      return res.status('404').send('the store with the id could not be found');

    res.status(200).json({
      status: 'success',
      data: store,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOneStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.store.id);
    if (!store)
      return res.status('404').send('the store with the id could not be found');
    res.status(200).json({
      status: 'success',
      data: store,
    });
  } catch (err) {
    next(err);
  }
};
