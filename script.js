"use strict";

var fs = require( "fs" );
var os = require( "os" );
var path = require( "path" );
var spawn = require( "child_process" ).spawn;
var cmd = path.join(
    "node_modules",
    ".bin",
    "whhglyphs" + ( os.platform() === "win32" ? ".cmd" : "" )
);

var proc = spawn( cmd, [
    "-i", "whhglyphs.config.json",
    "-n", "frontkit"
], {
    cwd: process.cwd()
});

proc.stderr.pipe( process.stderr );
proc.stdout.pipe( process.stdout );

proc.on( "exit", function( code ) {
    var contents;

    if ( code > 0 ) {
        return process.exit( code );
    }

    // Rename to the right config file
    fs.renameSync( "config.json", "fontello.config.json" );

    contents = fs.readFileSync( "css/frontkit-codes.css", {
        encoding: "utf8"
    });
    contents = contents.replace( /\/\*(.+?)\*\//g, "" );
    fs.writeFileSync( "css/frontkit-codes.css", contents, {
        encoding: "utf8"
    });
});