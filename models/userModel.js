import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  console.log("Real user password: ", user.password);
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    console.log("Hashed user password: ", this.password);
    next();
  });
});

const User = mongoose.model("User", userSchema);

export default User;
