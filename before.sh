#!/bin/sh

echo "run this once"
npm install
cd vendor
# test for CouchbaseLite*.zip
# curl http://files.couchbase.com/developer-previews/mobile/ios/CouchbaseLite/CouchbaseLite-2013-03-29_14-01-06.zip -o CouchbaseLite.zip
open -W CouchbaseLite.zip
# download JavaScript core
mv CouchbaseLite/iOS/CouchbaseLite.framework/CouchbaseLite CouchbaseLite/iOS/CouchbaseLite.framework/CouchbaseLite.a
mv CouchbaseLite/iOS/CouchbaseLiteListener.framework/CouchbaseLiteListener CouchbaseLite/iOS/CouchbaseLiteListener.framework/CouchbaseLiteListener.a

cd ..

node generate_xml.js
