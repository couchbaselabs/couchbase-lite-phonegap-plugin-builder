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
.ele("platform", {name:"ios"})
	.ele("config-file", {target:"config.xml", parent:"/widget/plugins"})
		.ele("plugin", {name:"LiteGap", value : "LiteGap"}).up().up();

ios.ele("header-file",{src:"src/ios/LiteGap.h"});
ios.ele("source-file",{src:"src/ios/LiteGap.m"});

var linkwith = [
	"libsqlite3.dylib",
	"libstdc++.dylib",
	"libicucore.dylib",
	"libz.dylib",
	"Security.framework"
	]

	linkwith.forEach(function(l){
		ios.ele("framework", {src : l})
	})


var finder = find("CouchbaseLite/iOS");
finder.on("file", function(file) {
	if (/.*\.h/.test(file)) {
		// ios.ele("header-file",{src:"vendor/"+file});
	} else if (/CouchbaseLite(Listener)?$/.test(file)) {
		// ios.ele("source-file",{framework:true, src:"vendor/"+file});
	} else {
		// ios.ele("resource-file", {src:"vendor/"+file})
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
