const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    let user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, "musecret", {
        expiresIn: "2h",
      });

      resData = { token: token, user: user };
      console.log("token", token);

      res.status(200).json(resData);
    } else {
      resData = { error: "Invalid Credentials" };
      res.status(201).json(resData);
    }
  } catch (err) {
    console.log(err);
  }
}

async function addUser(req, res) {
  try {
    let userData = req.body;
    if (Array.isArray(userData)) {
      const createdUsers = [];
      for (const user of userData) {
        const { firstName, lastName, email, role } = user;
        const oldUser = await User.findOne({ email });

        if (oldUser) {
          return res
            .status(409)
            .send(`User with email ${email} already exists.`);
        }

        const createdUser = await User.create({
          firstName,
          lastName,
          email: email.toLowerCase(),
          role: role,
        });

        createdUsers.push(createdUser);
      }

      res.status(201).json(createdUsers);
    } else {
      const { firstName, lastName, email, password } = userData;
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send(`User with email ${email} already exists.`);
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const createdUser = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      res.status(201).json(createdUser);
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
}
async function deactivateUser(req, res) {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ error: "Error deactivating user" });
  }
}

module.exports = {
  login,
  addUser,
  getAllUsers,
  deactivateUser,
};
