const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database', err);
    return;
  }
  console.log('Connected to database');
});

let users = [
  { username: 'admin', password: 'password' },
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query', error);
      res.send('Error executing SQL query');
      return;
    }
    if (results.length > 0) {
      res.send('Login successful!');
    } else {
      res.send('Invalid username or password');
    }
  });
});

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id);
  res.json(user);
});

app.post('/user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query', error);
      res.send('Error executing SQL query');
      return;
    }
    const id = results.insertId;
    users.push({ id, username, password });
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
