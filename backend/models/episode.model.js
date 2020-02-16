/**
 * @Date:   2020-01-15T13:29:32+00:00
 * @Last modified time: 2020-02-06T13:36:04+00:00
 */

const Show = require("./show.model");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EpisodeSchema = new Schema({
  episodenumber: Number,
  belongsto: {type: Schema.Types.ObjectId, ref: 'show', required: true},
  title: String,
  description: String,
  seasonnumber: Number,
  numinseason: Number,
  director: String,
});

const Episode = mongoose.model('Episode', EpisodeSchema);

module.exports = Episode;
