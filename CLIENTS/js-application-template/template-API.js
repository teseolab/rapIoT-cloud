var tilesLib = require('/tiles-lib');

var client = new tilesLib.TilesClient('Anders', '{{ipAddressHolder}}', 1883).setApplication("{{appNameHolder}}").connect();
var reader = new tilesLib.EventReader();
var SpotifyClient = new tilesLib.PostmanClient('192.168.1.6', 3000);
var IFTTTClient = new tilesLib.IFTTTClient('dncBS7n2aVGR4Bf44Yx9Ck');

client.on('receive', function (tileId, event) {
	console.log(event);
	/**
	 * eventTile.name 			--(string) Name of the tile that the event comes from
	 * eventTile.isSingleTap 	--(bool) is the event single tap
	 * eventTile.isDoubleTap	--(bool) is the event double tap
	 * eventTile.isTilt			--(bool) is the event tilt
	 */
	var eventTile = reader.readEvent(event, client);

	/**
	 * tileX.name 				--(string) Name of the available tile
	 * tileX.ledOn("{color}")	--(method) Set the color of the LED of tileX {color}: 'red', 'green', 'blue', 'white'
	 * tileX.ledOff()			--(method) Turn off the LED of tileX
	 * tileX.hapticBurst()		--(method) tileX will vibrate 4 times (4 short bursts)
	 * tileX.hapticLong()		--(method) tileX will vibrate 1 time (long)
	 */

	var tileA = reader.getTile("Tile_e7", client);
	var tileB = reader.getTile("Tile_7e", client);
	var tileC = reader.getTile("Tile_b7", client);
	var tileD = reader.getTile("Tile_da", client);
	var tileE = reader.getTile("tile_e9", client);

	/**
	 * Example:
	 * Single tap on TileA --> Turn on green LED on TileB
	 */
	if (eventTile.name === tileA.name && eventTile.isSingleTap) {
		tileB.ledOn('green');
	}

	/**
	 * Printer:
	 * reader.print("{message}")	--Will print the message (OBS! Obly 12 characters at a time)
	 */
	var printer = reader.getPrinter("Tile_70", client);

	/**
	 * Example:
	 * Print 'Hello world'
	 */
	printer.print("hello world");

	/**
	 * Spotify:
	 * SpotifyClient.get('start')	--(method) Will start a random song
	 * SpotifyClient.get('stop')	--(method) Will stop spotify
	 */

	/**
	 * Example:
	 * Single tap on TileA --> start spotify
	 * Double tap on TileA --> stop spotify
	 */
	if (eventTile.name == tileA.name) {
		if (eventTile.isSingleTap) {
			SpotifyClient.get('start');
		} else if (eventTile.isDoubleTap) {
			SpotifyClient.get('stop');
		}
	}

	/**
	 * IFTTT:
	 * IFTTTClient.send({triggerName})	--(method) Will trigger the event {triggerName}
	 */

	/**
	 * Example:
	 * Single tap on TileA --> trigger IFTTT 'lights_on' event
	 */
	if(eventTile.name = tileA.name){
		if(eventTile.isSingleTap){
			IFTTTClient.send('lights_on');
		}
	}

});