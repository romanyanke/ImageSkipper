function SkipIt(img) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, img.srcUrl);
  });
}

chrome.contextMenus.create({
    "title": chrome.i18n.getMessage('extTitle'),
    "contexts":["image"],
    "onclick": SkipIt
});
