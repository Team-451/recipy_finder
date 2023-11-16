import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username cannot be empty"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    unique: true,
    true: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
    minlength: 5,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    try {
      const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 12;
      this.password = await bcrypt.hash(this.password, parseInt(saltRounds));
    } catch (error) {
      next(error);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
