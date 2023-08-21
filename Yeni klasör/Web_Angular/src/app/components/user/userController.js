const users = [];

const {
  getDataFromDBService,
  createUserDBService,
  updateUserDBService,
  removeUserDBService,
  createUserDBService1,
} = require("./userService");
const userModel2 = require("./userModel2");

// const { users } = require("C:/angular/Web_Angular/src/index.js");

// const getDataControllerfn = async (req, res) => {
//   try {
//     const employee = await getDataFromDBService();
//     res.send({ status: true, data: employee });
//   } catch (error) {
//     res.status(500).send({ status: false, message: "Error getting data", error });
//   }
// };

const getDataControllerfn = async (req, res) => {
  
  try {
    if (!req.user) {
      console.log("hı");
      return res.status(401).send({ status: false, message: "Unauthorized" });
    }

    return res.send({ status: true, data: req.user });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, message: "Error getting user data", error });
  }
};

const getDataControllerfn1 = async (req, res) => {
  console.log("hı");

  try {
    const employee = await getDataFromDBService1();
    res.send({ status: true, data: employee });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, message: "Error getting data", error });
  }
};

const updateUserController = async (req, res) => {
  try {
    await updateUserDBService(req.params.id, req.body);
    res.send({ status: true, message: "User Updated" });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, message: "User Update Failed", error });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await removeUserDBService(req.params.id);
    res.send({ status: true, message: "User Deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, message: "User Deletion Failed", error });
  }
};

const createUserControllerFn = async (req, res) => {
  console.log("im here");
  try {
    await createUserDBService(req.body);
    res.send({ status: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: false, message: "Error creating user", error: error });
  }
};

const createUserControllerFn1 = async (req, res) => {
  try {
    // const { username, password, email } = req.body;

    const isUserCreated = await createUserDBService1(req.body);
    if (isUserCreated) {
      return res
        .status(201)
        .json({
          status: true,
          message: "Kullanıcı kaydı başarıyla oluşturuldu.",
        });
    } else {
      throw new Error("Error creating user");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message || "Error creating user" });
  }
};

const userLoginControllerFn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request for user:', username);

    const user = await userModel2.findOne({ username, password });

    console.log('Login attempt result:', user ? 'Success' : 'Failure');
    req.user = user;

    if (user) {
      return res.status(200).json({ status: true, message: 'Login successful.', user });
    } else {
      users.push({ username, password });
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }
  } catch (error) {
    console.log(error);
    next(error); // Hata durumunda next'e hata geç

    throw error; 
  }
};


const editUser = async (userId, updatedUserData) => {
  try {
    await updateUserDBService(userId, updatedUserData);
    return { status: true, message: 'User Updated' };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    await removeUserDBService(userId);
    return { status: true, message: 'User Deleted' };
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getDataControllerfn,
  getDataControllerfn1,
  createUserControllerFn,
  updateUserController,
  deleteUserController,
  userLoginControllerFn,
  createUserControllerFn1,
  editUser, // Yeni eklenen işlev
  deleteUser, // Yeni eklenen işlev
};
