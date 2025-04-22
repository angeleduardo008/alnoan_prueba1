const app = require('./config/server');

const port = 3242;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});
