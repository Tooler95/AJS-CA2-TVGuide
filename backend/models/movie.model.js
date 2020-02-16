/**
 * @Date:   2020-01-20T09:39:40+00:00
 * @Last modified time: 2020-02-03T15:30:17+00:00
 */

const User = require("./user");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: String
});

const ActorSchema = new Schema({
  name: String
});


const MovieSchema = new Schema({
  belongsto: {type: Schema.Types.ObjectId, ref: 'user'},
  createdby: {type: String, required: true},
  title: { type: String, required: true},
  description: { type: String, required: true },
  actors: { type: [ActorSchema], required: true },
  releasedate: { type: Date, required: true },
  rating: { type: String, required: true},
  imdb: { type: Number, required: true},
  rottentomatoes: { type: Number, required: true},
  genre: { type: [GenreSchema], required: true },
  boxoffice: { type: Number, required: true},
  director: { type: String, required: true},

}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
