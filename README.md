# Generate a Couchbase Lite PhoneGap plugin

**[You probably want to go to the plugin itself](https://github.com/couchbaselabs/Couchbase-Lite-PhoneGap-Plugin)**

This repo contains scripts to build a [plugman](https://github.com/apache/cordova-plugman) plugin for use with Cordova / PhoneGap.

You only need to do this if you are working on the LiteGap plugin.  If you just want to _use_ the plugin, you shouldn't need to generate it.

## Running this Plugin Generator

This code shows up in the Couchbase buildbot process [via this shell script.](https://github.com/couchbase/build/blob/master/scripts/jenkins/mobile/package_phonegap_plugin.sh)

The generator works by downloading the latest Couchbase Lite for iOS and Android, and packaging them with the `cblite.getURL` PhoneGap plugin API as implemented in the `src` directory of this repository.

Here are rough descriptions of the stages:

1. Download the plugin dependencies into a directory structure. Automated buildbot scripts might choose to create this directory structure through a different means.
2. Create the plugin directory structure by copying files from the dependencies (and renaming a few of them). You can see a snapshot of what this file tree looks like for me by browsing to `tree.txt` in this repository's root.
3. Copy PhoneGap specific files from this repo's `src` and `www` directories to the plugin directory structure.
4. Create the plugin.xml manifest based on the files in the plugin directory structure.

The build product is a directory with plugin.xml in it, as well as `src` and `lib` directories. The plugman tool likes to look for plugins in git repos, so to release a new version of the plugin you'll manually take the generated directory, and check it into the canonical Couchbase Lite Phonegap Plugin repo.

## Known issues

Steps 1, and 2 above are not yet implemented. Steps 3 and 4 lives in prepare_plugin.js

## Updating the [github release repo](https://github.com/couchbaselabs/Couchbase-Lite-PhoneGap-Plugin)

Preparation: Update the version value here: https://github.com/couchbaselabs/couchbase-lite-phonegap-plugin-builder/blob/master/prepare_plugin.js#L1, and then [kick off Jenkins job to get needed plug-in zip] (http://factory.couchbase.com/view/build/view/mobile_dev/job/package_phonegap_plugin/). When there is a release, you need to do this to push it to github:

1. Download and uncompress the zip.
2. Clone [the repo](https://github.com/couchbaselabs/Couchbase-Lite-PhoneGap-Plugin).
3. Copy the `.git/` directory from your clone of this repo into the unzipped build.
4. Vist this repo on the github website and adjust the settings to make a branch other than `master` into the Default Branch.
5. Delete the master branch from github with `git push origin :master` from inside the unzipped build.
6. Create a new branch `pendingmaster`  with `git checkout -b pendingmaster`
7. Check all your stuff into it with `git add --all` and `git commit`
8. Delete your local master with `git branch -D master`
9. Create a new local master without any history using `git checkout --orphan master`
10. `git commit -m "new plugin bundle"`
11. Publish the new branch with `git push origin master`
12. Visit this repo on the github website and adjust the settings to make `master` into the Default Branch again.

### Publishing to Cordova ([deprecated](http://cordova.apache.org/announcements/2015/04/21/plugins-release-and-move-to-npm.html))

    npm install -g plugman

From inside the package directory `plugman adduser` and `plugman publish .`

### Publishing to NPM

    npm install -g plugman

From inside the package directory:

1. `plugman createpackagejson .` (Change the name to all lowercase)

 ```
name: (com.couchbase.lite.phonegap) couchbase-lite-phonegap-plugin
version: (1.1.1) 
git repository: (https://github.com/couchbaselabs/Couchbase-Lite-PhoneGap-Plugin.git) 
author: Couchbase
license: (Apache 2.0) 
```
Note: Change "cordova_name" in package.json to "Couchbase Lite Phonegap Plugin".

2. `npm adduser`
3. `npm publish .`
