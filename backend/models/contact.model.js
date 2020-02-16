/**
 * @Date:   2020-01-15T13:29:32+00:00
 * @Last modified time: 2020-02-06T13:36:04+00:00
 */

const User = require("./user");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const ContactSchema = new Schema({
    createdby: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    user: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true}
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
