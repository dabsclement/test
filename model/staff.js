const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50

    },
    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    }

  },
  { timestamps: true }
)
module.exports = mongoose.model('staff', userSchema)