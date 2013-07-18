# Generate a LiteGap plugman plugin

**[You probably want to go to the LiteGap plugin itself](https://github.com/couchbaselabs/LiteGap)**

This repo contains scripts to build a [plugman](https://github.com/apache/cordova-plugman) plugin for use with Cordova / PhoneGap.

You only need to do this if you are working on the LiteGap plugin.  If you just want to _use_ the plugin, you shouldn't need to generate it.  (TODO: add link to repo once it's there)

There are independent stages to the plugin build process. The scripts are designed to allow you to work on the output of an earlier stage without rebuilding it. Here are rough descriptions of the stages:

1. Download the plugin dependencies into a directory structure. Automated buildbot scripts might choose to create this directory structure through a different means.
2. Create the plugin directory structure by copying files from the dependencies (and renaming a few of them). You can see what this file tree looks like for me by browsing to `tree.txt` in this repository's root.
3. Copy PhoneGap specific files from this repo's `src` directory to the plugin directory structure.
4. Create the plugin.xml manifest based on the files in the plugin directory structure.

The build product is a directory with plugin.xml in it, as well as `src` and `lib` directories. The plugman tool likes to look for plugins in git repos, so to release a new version of the plugin you'll manually take the generated directory, and check it into the canonical Couchbase Lite Phonegap Plugin repo.

# Known issues

Steps 1, 2, and 3 above are not yet implemented. Step 4 lives in generate_xml.js
