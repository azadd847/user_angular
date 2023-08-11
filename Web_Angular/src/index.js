const users = [];

const express = require("express");
const server = express();
const routes = require("./routes/routes");
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dbcustomerr', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

server.use(cors());
server.use(express.json());

server.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Tüm alanları doldurunuz.' });
  }

  try {
    const { createUserControllerFn } = require("./app/components/user/userController");

    const isUserCreated = await createUserControllerFn(req.body);

    if (isUserCreated) {
      return res.status(201).json({ message: 'Kullanıcı kaydı başarıyla oluşturuldu.' });
    } else {
      throw new Error('Error creating user');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error during user creation', error: error.message || 'Unknown error' });
  }
});

server.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request for user:', username);

    if (!username || !password) {
      return res.status(400).json({ message: 'Kullanıcı adı ve şifre giriniz.' });
    }

    const { userLoginControllerFn } = require("./app/components/user/userController");

    const loginResponse = await userLoginControllerFn(req, res);

    if (loginResponse.status) {
      return res.status(200).json({ status: true, message: 'Giriş başarılı.', user: loginResponse.user });
    } else {
      return res.status(401).json({ status: false, message: 'Kullanıcı adı veya şifre yanlış.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: 'Error during login', error: error.message || 'Unknown error' });
  }
});

server.use(routes);

const port = 8000;
server.listen(port, (error) => {
  console.log(`Server is running on http://localhost:${port}`);

  if (error) {
    console.log("errorr");
  } else {
    console.log("startedddddd");
  }
});
