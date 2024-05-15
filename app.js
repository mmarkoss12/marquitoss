const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '44189400',
  database: 'libreria'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.get('/registros', (req, res) => {
  try {
    connection.query('SELECT * FROM libreria.libros', (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        throw err;
      }
      res.json(results);
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
});

//app.post('/registros', (req, res) => {
//  const nuevoRegistro = { 
//    Titulo: 'Nuevo Título',
//    Autor: 'Nuevo Autor',
//    Edicion: 'Nueva Edición',
//    Genero: 'Nuevo Género',
//    Precios: 'Nuevo Precio'
//  };
//  
//  connection.query(
//    "INSERT INTO libreria.libros SET Titulo = 'Nuevo Título', Autor = 'Nuevo Autor', Edicion = 'Nueva Edición', Genero = 'Nuevo Género', Precios = 'Nuevo Precio'",
//    (err, result) => {
//      if (err) throw err;
//      res.send('Registro agregado correctamente');
//  });
//});

//app.post('/registros', (req, res) => {
//  connection.query(INSERT INTO libreria.libros (Titulo, Autor, Edicion, Genero, Precios) VALUES(${req.query.titulo}, ${req.query.autor}, ${req.query.edicion}, ${req.query.genero}, ${req.query.precios}))
//});

app.post('/registros', (req, res) => {
  const { titulo, autor, edicion, genero, precios } = req.query;
  connection.query(
    'INSERT INTO libreria.libros (Titulo, Autor, Edicion, Genero, Precios) VALUES (?, ?, ?, ?, ?)',
    [titulo, autor, edicion, genero, precios],
    (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al agregar el registro' });
        return;
      }
      res.send('Registro agregado correctamente');
    }
  );
});

app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ${port}");
});