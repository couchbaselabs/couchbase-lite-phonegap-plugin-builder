## make a plugman plugin

This repo contains scripts to download a recent Couchbase Lite iOS artifact, and build a [plugman](https://github.com/apache/cordova-plugman) plugin for use with Cordova / PhoneGap.

The entry point is `./before.sh`

## Use the plugin

I've run this and [stuck the output on dropbox](https://dl.dropboxusercontent.com/u/14074521/cbl-plugman.zip).

To use this, download that zip file, extract it, and then use plugman to apply it to your project:

	curl -O https://dl.dropboxusercontent.com/u/14074521/cbl-plugman.zip
	open -W cbl-plugman.zip
	plugman --debug --platform ios --project /path/to/my/project --plugin cbl-plugman

The next time you start your project, you should see this in the logs:

	Couchbase Lite url = http://lite.couchbase./

And you can do the rest of your interacting [via Ajax and the REST API.](https://github.com/couchbase/couchbase-lite-ios/wiki/Guide%3A-REST)

## Known Issues

* JavaScript views aren't installed by the plugman manifest. You can enable JavaScript by following thier portion [of the instructions here](https://github.com/couchbaselabs/LiteGap/wiki/Building-a-PhoneGap-Couchbase-Lite-Container) after you have run the cbl-plugman install.

