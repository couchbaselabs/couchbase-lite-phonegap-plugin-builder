echo "run this once"
npm install
cd vendor
# test for CouchbaseLite*.zip
curl -O https://dl.dropboxusercontent.com/u/360302/CouchbaseLite-a1c1.zip
open CouchbaseLite*.zip
# download JavaScript core

node before.js
