#!/bin/sh

# run this to download the latest build artifacts
# it also places them into the right location for

mkdir -p plugman/frameworks

mkdir tmp
cd tmp

curl http://files.couchbase.com/developer-previews/mobile/ios/CouchbaseLite/CouchbaseLite-2013-03-29_14-01-06.zip -o CouchbaseLite.zip


open -W CouchbaseLite.zip
# rename compiled files to .a
mv CouchbaseLite/iOS/CouchbaseLite.framework/CouchbaseLite CouchbaseLite/iOS/CouchbaseLite.framework/CouchbaseLite.a
mv CouchbaseLite/iOS/CouchbaseLiteListener.framework/CouchbaseLiteListener CouchbaseLite/iOS/CouchbaseLiteListener.framework/CouchbaseLiteListener.a

# download JavaScript core
curl https://dl.dropboxusercontent.com/u/14074521/JavaScriptCore.framework.zip -o JavaScriptCore.framework.zip
open -W JavaScriptCore.framework.zip

mv JavaScriptCore.framework/JavaScriptCore JavaScriptCore.framework/JavaScriptCore.a

cd ..

mv tmp/CouchbaseLite/Extras/CBLRegisterJSViewCompiler.h plugman/frameworks/
mv tmp/JavaScriptCore.framework plugman/frameworks/
mv tmp/CouchbaseLite/iOS/CouchbaseLite.framework/ plugman/frameworks/
mv tmp/CouchbaseLite/iOS/CouchbaseLiteListener.framework/ plugman/frameworks/

rm -rf tmp/

echo "run \`npm install\`"
echo "you will need to copy libCBLJSViewCompiler.a into the plugman/frameworks folder by hand"
echo "then run \`node generate_xml.js\`"
