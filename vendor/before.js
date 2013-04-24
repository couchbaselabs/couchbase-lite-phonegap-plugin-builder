// make the xml for the package file
var builder = require("xmlbuilder"),
	fs = require('fs'),
	find = require("findit").find;

var xml = builder.create("plugin");

xml.att('xmlns',"http://www.phonegap.com/ns/plugins/1.0")
xml.att('xmlns:android',"http://schemas.android.com/apk/res/android")
xml.att('id',"com.couchbase.litegap")
xml.att('version',"0.1.0")


var ios = xml.ele("name", "LiteGap").up()
.ele("asset",{src:"www/litegap.js"}).up()
.ele("platform", {name:"ios"})
	.ele("config-file", {target:"config.xml", parent:"/widget/plugins"})
		.ele("plugin", {name:"LiteGap", value : "LiteGap"}).up().up();

ios.ele("header-file",{src:"LiteGap.h"});
ios.ele("source-file",{src:"LiteGap.m"});

var finder = find("CouchbaseLite-a1c1/iOS");
finder.on("file", function(file) {
	if (/.*\.h/.test(file)) {
		ios.ele("framework",{src:"../../vendor/"+file});
	} else {
		ios.ele("framework",{src:"../../vendor/"+file});
	}
})

finder.on("end", function() {
	var xml = ios.end({pretty:true});
	console.log(xml)
	fs.writeFile("../plugin.xml", xml, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	})
})
