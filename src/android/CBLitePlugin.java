package com.couchbase.cblite.plugins;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;

import com.couchbase.cblite.CBLServer;
import com.couchbase.cblite.listener.CBLListener;
import com.couchbase.cblite.router.CBLURLStreamHandlerFactory;
import com.couchbase.cblite.CBLView;
import com.couchbase.cblite.javascript.CBLJavaScriptViewCompiler;

import java.io.IOException;

public class CBLitePlugin extends CordovaPlugin {

    private static final int DEFAULT_LISTEN_PORT = 5984;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callback) {
	if (action.equals("initCBLite")) {
	    try {

		CBLURLStreamHandlerFactory.registerSelfIgnoreError();

		CBLView.setCompiler(new CBLJavaScriptViewCompiler());

		String filesDir = this.cordova.getActivity().getFilesDir().getAbsolutePath();
		CBLServer server = startCBLite(filesDir);

		startCBLListener(DEFAULT_LISTEN_PORT, server);

        // TODO this should be a URL string that includes the port and a trailing slash
		callback.success(DEFAULT_LISTEN_PORT);

		return true;

	    } catch (final Exception e) {
		e.printStackTrace();
		callback.error(e.getMessage());
	    }
	}
	return false;
    }

    protected CBLServer startCBLite(String dirAbsolutePath) {
        CBLServer server;
        try {
            server = new CBLServer(dirAbsolutePath);
        } catch (IOException e) {
	    throw new RuntimeException(e);
        }
        return server;
    }

    private void startCBLListener(int listenPort, CBLServer server) {

        CBLListener listener = new CBLListener(server, listenPort);
        Thread thread = new Thread(listener);
        thread.start();
    }

}

