/*
   Copyright 2017 Anders Riise Mæhlum, Varun Sivapalan & Jonas Kirkemyr

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/


var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  _id: String,
  tiles: [{ type: String, ref: 'Tile' }]
});

UserSchema.methods.addTile = function(tile, cb) {
	this.tiles.addToSet(tile);
	this.save(cb);
}

mongoose.model('User', UserSchema);