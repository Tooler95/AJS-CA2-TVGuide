/**
 * @Date:   2020-01-15T13:29:32+00:00
 * @Last modified time: 2020-02-06T13:36:04+00:00
 */

const User = require("./user");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  name: String
});
const GenreSchema = new Schema({
  name: String
});
const WriterSchema = new Schema({
  name: String
});



const ShowSchema = new Schema({
  belongsto: {type: Schema.Types.ObjectId, ref: 'user'},
  createdby: {type: String, required: true},
  numofepisodes: {type: Number, required: true},
  totalepisodes: {type: Number, required: true},
  title: { type: String, required: true},
  description: { type: String, required: true },
  actors: { type: [ActorSchema], required: true},
  seasons: { type: Number, required: true },
  genre: { type: [GenreSchema], required: true },
  writers: {type: [WriterSchema], required: true},
  imdb: {type: Number, required: true},
  rottentomatoes: { type: Number, required: true},
  airedon: { type: String, required: true}
}, {
  timestamps: true,
});

const Show = mongoose.model('Show', ShowSchema);

module.exports = Show;
