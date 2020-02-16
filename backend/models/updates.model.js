/**
 * @Date:   2020-01-15T13:29:32+00:00
 * @Last modified time: 2020-02-06T13:36:04+00:00
 */

const User = require("./user");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const UpdateSchema = new Schema({
    createdby: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    user: {type: String, required: true},
    patch: {type: Number, required: true},
    content: {type: String, required: true}
}, {
  timestamps: true,
});

const Update = mongoose.model('Update', UpdateSchema);

module.exports = Update;
