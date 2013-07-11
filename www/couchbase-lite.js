(function(){
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

    function LiteGap() { }

    LiteGap.prototype.getCBLiteUrl = function(success, fail) {
        return cordovaRef.exec(success, fail, 'LiteGap', 'getCBLiteUrl', []);
    };
 
    if (cordovaRef)
    {
        cordovaRef.addConstructor(function() {
            if(!window.plugins) {
                window.plugins = {};
            }
            if(!window.plugins.litegap) {
                window.plugins.litegap = new LiteGap();
            }
        });
    }
})(); /* End of Temporary Scope. */
