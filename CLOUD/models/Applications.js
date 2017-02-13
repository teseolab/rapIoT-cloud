var mongoose = require('mongoose');

var ApplicationSchema = new mongoose.Schema({
  name: String,
  devEnvironment: String,
  environmentOnline: Boolean,
  appOnline: Boolean,
  port: Number,

  user: { type: String, ref: 'User' },
  virtualTiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VirtualTile' }]
});

ApplicationSchema.methods.addVirtualTile = function(vt, cb) {
	this.virtualTiles.addToSet(vt);
	this.save(cb);
}

mongoose.model('Application', ApplicationSchema);