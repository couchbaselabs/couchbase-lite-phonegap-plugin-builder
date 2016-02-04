var PLUGIN_VERSION = "1.2.0";

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
	finder = require("findit");

pluginDir = path.resolve(pluginDir)

var xml = builder.create("plugin");

xml.att('xmlns',"http://www.phonegap.com/ns/plugins/1.0")
xml.att('xmlns:android',"http://schemas.android.com/apk/res/android")
xml.att('id',"com.couchbase.lite.phonegap")
xml.att('version',PLUGIN_VERSION)
xml.ele("name", "Couchbase Lite")
xml.ele("description", "Install Couchbase Lite in your app to enable JSON sync.")
xml.ele("license", "Apache 2.0")

// TODO if anyone wanted to use the find() function here it might be a good
// idea in the long run.
xml.ele("js-module", {src : "www/cblite.js", name : "CouchbaseLite"})
	.ele("clobbers", {target : "window.cblite"})
xml.ele("asset", {src : "www/cblite-example.html", target : "cblite-example.html"})

xml.ele("engines").ele("engine", {name : "cordova", version : ">=3.0.0"})

var ios = xml.ele("platform", {name:"ios"})
	.ele("config-file", {target:"config.xml", parent:"/widget"})
		.ele("feature", {name:"CBLite"})
			.ele("param", {name:"ios-package", value : "CBLite"}).up()
			.ele("param", {name:"onload", value : "true"}).up()
		.up().up();

ios.ele("header-file",{src:"src/ios/CBLite.h"});
ios.ele("source-file",{src:"src/ios/CBLite.m"});

var linkwith = [
	"libsqlite3.dylib",
	"libstdc++.dylib",
	"libicucore.dylib",
	"libz.dylib",
	"Security.framework",
	"CFNetwork.framework",
	"SystemConfiguration.framework",
	"JavaScriptCore.framework"
	]

linkwith.forEach(function(l){
	ios.ele("framework", {src : l})
})

var iosFinder = finder(path.join(pluginDir,"lib", "ios"));
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
		.ele("config-file", {target:"res/xml/config.xml", parent:"/*"})
		.ele("feature", {name:"CBLite"})
			.ele("param", {name:"android-package", value : "com.couchbase.cblite.phonegap.CBLite"}).up()
			.ele("param", {name:"onload", value : "true"}).up()
		.up().up();

	android.ele("framework", {
		"src" : "src/android/build.gradle",
		"custom" : "true",
		"type" : "gradleReference"
	});

	android.ele("source-file", {
		"src" : "src/android/CBLite.java",
		"target-dir" : "src/com/couchbase/cblite/phonegap"
	});

	var androidFinder = finder(path.join(pluginDir,"lib", "android"));

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
		} else if (/\.aar$/.test(file)) {
			var segs = file.split("/")
			android.ele("resource-file", {
				"src": file,
				"target" : "libs/"+segs[2]
			})
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
	var xmlstring = xml.end({pretty:true}).replace('version="&gt;=', 'version=">=')
	console.log(xmlstring)
	fs.writeFile(path.join(pluginDir, "plugin.xml"), xmlstring, function(err) {
	    if (err) {
	      console.log(err)
	    } else {
	    	copyBuildExtrasGradleFile()
	    	copySrcAndWWW()
	    }
	})
}

function copyBuildExtrasGradleFile () {
	var gradleDir = path.resolve(__dirname, "gradle")
	var srcFile = path.join(gradleDir, "build-extras.gradle")
	var destFile = path.join(pluginDir, "build-extras.gradle")
	ncp(srcFile, destFile, function (err) {
		if (err) {
			return console.error(err)
		}
	});
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
	  	console.log("phonegap local plugin add "+path.resolve(pluginDir))
	 });
	});
};
