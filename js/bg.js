function SkipIt(img) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, img.srcUrl);
  });
}

var defaults = {
    support: {
        drag: true,
        context: true,
        hover: false
    }
};

var extensionSettings;

function readExtensionSettings() {
    chrome.storage.sync.get({
            support: defaults.support
        }, function(options) {
            extensionSettings = options;
            if (options.support.context) {
                chrome.contextMenus.create({
                    "title": chrome.i18n.getMessage('extTitle'),
                    "contexts":["image"],
                    "onclick": SkipIt
                });
            } else {
                chrome.contextMenus.removeAll();
            }
        }
    );
}

readExtensionSettings();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(extensionSettings);
});