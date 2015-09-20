/**
 * сообщения из контекстного скрипта
 * проверка поддержки драга из опций
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request) {
    case 'isDragSupported':
      sendResponse(extensionSettings.support.drag);
      break;
  }
});

/**
 * стандартные настройки
 */
var extensionSettings = {
  support: {
    drag: true,
    context: true
  }
};

/**
 * создание/обновление опций
 */
function updateSupportSettings() {
  chrome.storage.sync.get({
    supportOptions: extensionSettings
  }, function(data) {

    data.supportOptions.forEach(support => {
      extensionSettings.support[support.type] = support.status;
    });

    /**
     * создание/удаление контекстного меню
     */
    chrome.contextMenus.removeAll();
    if (extensionSettings.support.context) {
      chrome.contextMenus.create({
        "title": chrome.i18n.getMessage('extTitle'),
        "contexts":["image"],
        "onclick": function SkipIt(img) {
          chrome.tabs.query({
            active: true,
            currentWindow: true
          }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              removeImage: img.srcUrl
            });
          });
        }
      });
    }
  });
}

updateSupportSettings();
