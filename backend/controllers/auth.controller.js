import brcyptjs from "bcryptjs"
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js";
export const SignUp = async (req, res, next) => {
  const { username, name, email, password } = req.body;
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    next(errorHandler(400, "all feilds are requied"))
  }
  const isUqine = await User.findOne({ username, email });
  if (isUqine) {
    next(errorHandler(400, "username or email is already taken"))
  }
  const hashedPassword = brcyptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    name,
    email,
    gender: req.body.gender || " ",
    age: req.body.age || 0,
    password: hashedPassword,
    profilePic: "",
    isStudent: req.body.isStudent || true
  })

  try {
    await newUser.save();
    res.json("sign up successfull")

  } catch (error) {
    next(error)
  }
}
// Adjust path if necessary

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required."));
  }

  try {
    // Check if the user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found."));
    }

    const validPassword = brcyptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Wrong password."));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    // Send response with the user data (excluding password)
    res.status(200).json(
      rest,
    );

  } catch (error) {
    // Handle any server errors
    return next(errorHandler(500, "Something went wrong during sign-in."));
  }
};


export const google = async (req, res, next) => {
  const { email, name, gender, age, profilePicture } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"

      })
      res.status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = brcyptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        name: name,
        email,
        email,
        profilePicture: profilePicture,
        password: hashedPassword,
        gender: gender,
        age: age,
        isStudent: true
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      res
        .status(200)

        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has Been sign out" })
  }
  catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "you can't update other user's data"));

  }
  if (req.body.username) {
    if (req.body.username.length > 30) {
      return next(errorHandler(500, "username must be less than 20 characters"));
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "username can't contain space"));
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        profilePic: req.body.profilePic,
        age: req.body.age,
        gender: req.body.gender,
      }
    }, { new: true });
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  }
  catch (error) {
    next(error);
  }

}
