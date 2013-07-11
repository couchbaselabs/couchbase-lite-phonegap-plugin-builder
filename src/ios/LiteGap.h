#import <Cordova/CDV.h>

@interface LiteGap : CDVPlugin

@property (nonatomic, strong) NSURL *liteURL;

- (void)getCBLiteUrl:(CDVInvokedUrlCommand*)urlCommand;

@end

