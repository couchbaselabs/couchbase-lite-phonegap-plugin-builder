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
	.ele("config-file", {target:"config.xml", parent:"/widget"})
		.ele("feature", {name:"LiteGap"})
			.ele("param", {name:"ios-package", value : "LiteGap"}).up()
			.ele("param", {name:"onload", value : "true"}).up()
		.up().up();

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


var finder = find("plugman/frameworks");
finder.on("file", function(file) {
	file = file.replace(/^plugman\//,"")
	if (/.*\.h/.test(file)) {
		ios.ele("header-file",{src:file});
		console.log("#import", '"'+file.split('/').pop()+'"')
	} else if (/\.a$/.test(file)) {
		ios.ele("source-file",{framework:true, src:file});
	} else if (/\.m$/.test(file)) {
		ios.ele("source-file",{src:file});
	} else if (/DS_Store|Info.plist/.test(file)) {
// nothing
	} else {
		ios.ele("resource-file", {src:file})
	}
})

finder.on("end", function() {
	var xml = ios.end({pretty:true});
	console.log(xml)
	fs.writeFile("plugman/plugin.xml", xml, function(err) {
	    if (err) {
	      console.log(err);
	    } else {
	       console.log("The file was saved!");
	       console.log("to use it, cd into the xcode project directory and run:")
	       console.log("plugman --debug --platform ios --project . --plugin "+__dirname)
	    }
	})
})
