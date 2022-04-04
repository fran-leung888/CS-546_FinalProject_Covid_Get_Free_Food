const customerRoutes = require('./customer');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/customer', customerRoutes);
  //app.use('/users', userRoutes);
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
  });

  app.use('*', (req, res) => {
    res.redirect('/posts');
  });
};

module.exports = constructorMethod;
