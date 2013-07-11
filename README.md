## Install Couchbase Lite in your PhoneGap app

Most folks won't need to generate the PhoneGap plugin, instead they can just use it. To use it you don't need this repository, because we upload the resulting plugin so you can just grab it.

Currently you can [download the plugin from Dropbox](https://dl.dropboxusercontent.com/u/14074521/cbl-plugman.zip).

To install it, download the zip file, extract it, and then use plugman to apply it to your project, like so (you might want to replace "ios" with "android"):

	curl -O https://dl.dropboxusercontent.com/u/14074521/cbl-plugman.zip
	open -W cbl-plugman.zip
	plugman --debug --platform ios --project /path/to/my/project --plugin cbl-plugman

The next time you run your app, you should notification in the logs that Couchbase Lite is running. On iOS it looks like this:

	Couchbase Lite url = http://lite.couchbase./

Now you can do the rest of your interacting [via Ajax and the REST API.](https://github.com/couchbase/couchbase-lite-ios/wiki/Guide%3A-REST). Or you might want to take a look at [an example PhoneGap Couchbase Lite app](https://github.com/couchbaselabs/CouchChat-PhoneGap).

The rest of the instructions only apply if you are creating your own build of the plugin.

## Generate a PhoneGap plugman plugin

This repo contains scripts to build a [plugman](https://github.com/apache/cordova-plugman) plugin for use with Cordova / PhoneGap.

There are independent stages to the plugin build process. The scripts are designed to allow you to work on the output of an earlier stage without rebuilding it. Here are rough descriptions of the stages:

1. Download the plugin dependencies into a directory structure. Automated buildbot scripts might choose to create this directory structure through a different means.
2. Create the plugin directory structure by copying files from the dependencies (and renaming a few of them). You can see what this file tree looks like for me by browsing to `tree.txt` in this repository's root.
3. Copy PhoneGap specific files from this repo's `src` directory to the plugin directory structure.
4. Create the plugin.xml manifest based on the files in the plugin directory structure.

The build product is a directory with plugin.xml in it, as well as `src` and `lib` directories. The plugman tool likes to look for plugins in git repos, so to release a new version of the plugin you'll manually take the generated directory, and check it into the canonical Couchbase Lite Phonegap Plugin repo.

### Known issues

Steps 1, 2, and 3 above are not yet implemented. Step 4 lives in generate_xml.js
