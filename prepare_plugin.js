var PLUGIN_VERSION = "0.1.1";

var pluginDir = process.argv[2]

if (!pluginDir) {
	console.log("run this script with one argument, the directory where the plugin.xml should be written")
	process.exit(1)
}

// make the xml for the package file
var builder = require("xmlbuilder"),
	fs = require('fs'),
	path = require("path"),
	ncp = require("ncp").ncp,
	find = require("findit").find;

pluginDir = path.resolve(pluginDir)

var xml = builder.create("plugin");

xml.att('xmlns',"http://www.phonegap.com/ns/plugins/1.0")
xml.att('xmlns:android',"http://schemas.android.com/apk/res/android")
xml.att('id',"com.couchbase.litegap")
xml.att('version',PLUGIN_VERSION)
xml.ele("name", "LiteGap")
xml.ele("description", "Install Couchbase Lite in your app to enable JSON sync.")

// TODO if anyone wanted to use the find() function here it might be a good
// idea in the long run.
xml.ele("asset", {src : "www/litegap.js", target : "litegap.js"})
xml.ele("asset", {src : "www/litegap-example.html", target : "litegap-example.html"})

xml.ele("engines").ele("engine", {name : "cordova", version : ">=2.9.0"})

var ios = xml.ele("platform", {name:"ios"})
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

var iosFinder = find(path.join(pluginDir,"lib", "ios"));
iosFinder.on("file", function(file) {
	file = file.substring(pluginDir.length + 1)
	if (/.*\.h/.test(file)) {
		ios.ele("header-file",{src:file});
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

iosFinder.on("end", androidParts)

function androidParts() {
	var android = xml.ele("platform", {name:"android"})
		.ele("config-file", {target:"res/xml/config.xml", parent:"plugins"})
			.ele("plugin", {name:"LiteGap", value: "com.couchbase.cblite.plugins.LiteGap"})
		.up().up();

	android.ele("source-file", {
		"src" : "src/android/LiteGap.java",
		"target-dir" : "src/com/couchbase/cblite/plugins"
	});

	var androidFinder = find(path.join(pluginDir,"lib", "android"));

	androidFinder.on("file", function(file) {
		file = file.substring(pluginDir.length + 1)
		if (/\.so$/.test(file)) {
			var segs = file.split("/")
			android.ele("source-file", {
				"src": file,
				"target-dir" : "libs/"+segs[2]
			})
		} else if (/DS_Store|Info.plist/.test(file)) {
	// nothing
		} else {
			android.ele("source-file", {
				"src": file,
				"target-dir" : "libs"
			})
		}
	})

	androidFinder.on("end", writePluginXML)

}


function writePluginXML() {
	var xmlstring = xml.end({pretty:true});
	console.log(xmlstring)
	fs.writeFile(path.join(pluginDir, "plugin.xml"), xmlstring, function(err) {
	    if (err) {
	      console.log(err);
	    } else {
	    	copySrcAndWWW()
	    }
	})
}

function copySrcAndWWW() {
	ncp(path.resolve(__dirname, "www"), path.resolve(pluginDir, "www"), function (err) {
	 if (err) {
	   return console.error(err);
	 }
	 ncp(path.resolve(__dirname, "src"), path.resolve(pluginDir, "src"), function (err) {
	  if (err) {
	    return console.error(err);
	  }
	  console.log("The plugin is ready!");
	  	console.log("to use it, cd into the xcode project directory and run:")
	  	console.log("plugman --debug --platform ios --project . --plugin "+path.resolve(pluginDir))
	 });
	});
};


