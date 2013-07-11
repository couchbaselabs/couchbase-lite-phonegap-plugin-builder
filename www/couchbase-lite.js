(function(){
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

    function CBLitePlugin() { }

    CBLitePlugin.prototype.init = function(success, fail) {
        return cordovaRef.exec(success, fail, 'CBLitePlugin', 'initCBLite', []);
    };
 
    if (cordovaRef)
    {
        cordovaRef.addConstructor(function() {
            if(!window.plugins) {
                window.plugins = {};
            }
            if(!window.plugins.cbLitePlugin) {
                window.plugins.cbLitePlugin = new CBLitePlugin();
            }
        });
    }
})(); /* End of Temporary Scope. */
