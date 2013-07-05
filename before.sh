echo "run this once"
npm install
cd vendor
# test for CouchbaseLite*.zip
curl http://files.couchbase.com/developer-previews/mobile/ios/CouchbaseLite/CouchbaseLite-2013-03-29_14-01-06.zip -o CouchbaseLite.zip
open CouchbaseLite.zip
# download JavaScript core
node before.js
