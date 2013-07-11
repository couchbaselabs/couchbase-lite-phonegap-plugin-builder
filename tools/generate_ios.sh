/Users/jchris/code/cordova-ios/bin/create --arc ./LG2 com.couchbase.LiteGap LiteGap
cd LG2
git init
git add .
git commit -m "initial pg create app"
echo "build the pg plugin then run this: plugman --debug --platform ios --project . --plugin /Users/jchris/code/cb/mobile/couchbase-lite-phonegap-plugin"
