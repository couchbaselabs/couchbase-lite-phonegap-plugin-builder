#import "LiteGap.h"

// #import "CouchbaseLite.h"
// #import "CBLListener.h"
// #import "CBLJSViewCompiler.h"

// see generate_xml.js line 42

#import <Cordova/CDV.h>

@implementation LiteGap

@synthesize command;

- (id) initWithWebView:(UIWebView*)theWebView
{
    self = [super initWithWebView:theWebView];
    if (self) {
    	// todo check domain whitelist to give devs a helpful error message
    	[self launchCouchbaseLite];
    }
    return self;
}

- (void)launchCouchbaseLite
{
    NSLog(@"Opening database...");
    CBLManager* dbmgr = [CBLManager sharedInstance];
    // [CBLView setCompiler: [[[CBLJSViewCompiler alloc] init] autorelease]];
    NSURL* url = dbmgr.internalURL;
    NSLog(@"Couchbase Lite url = %@", url);
}

@end
