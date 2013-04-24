// make the xml for the package file
var builder = require("xmlbuilder"),
	fs = require('fs'),
	find = require("findit").find;

var ios = builder.create("plugin",{
	'xmlns':"http://www.phonegap.com/ns/plugins/1.0",
    'xmlns:android':"http://schemas.android.com/apk/res/android",
    'id':"com.couchbase.litegap",
    'version':"0.1.0"
})
.ele("name", "LiteGap").up()
.ele("asset",{src:"www/couchbase-lite.js"}).up()
.ele("platform", {name:"ios"})
	.ele("config-file", {target:"config.xml", parent:"/widget/plugins"})
		.ele("plugin", {name:"LiteGap", value : "LiteGap"}).up().up();


var finder = find("CouchbaseLite-a1c1/iOS");
finder.on("file", function(file) {
	if (/.*\.h/.test(file)) {
		ios.ele("header-file",{src:"../../vendor/"+file});
	} else {
		ios.ele("resource-file",{src:"../../vendor/"+file});
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
