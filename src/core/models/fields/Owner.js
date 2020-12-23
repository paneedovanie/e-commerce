const mongoose = require('mongoose');

module.exports = {
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}