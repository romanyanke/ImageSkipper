/**
 * расстановка переводов
 */
var localizeElements = document.querySelectorAll('[data-locale]');
_each(localizeElements, element => {
  element.innerHTML = chrome.i18n.getMessage(element.dataset.locale);
});

/**
 * добавить версию на страницу
 */
document.querySelector('.ImageSkipper').dataset.version = 'v.' + chrome.runtime.getManifest().version;

/**
 * сохранение настроек при изменении
 */
var supportOptions = document.querySelectorAll('[type=checkbox]');
_each(supportOptions, supports => {
  supports.addEventListener('change', save_options);
});

function save_options() {
  var serializeSupport = _toArray(supportOptions).map(supports => {
    return {
      type: supports.value,
      status: supports.checked
    }
  });
  chrome.storage.sync.set({
    supportOptions: serializeSupport
  });
  chrome.extension.getBackgroundPage().updateSupportSettings();
}

/**
 * восстановление настроек при загрузке
 */
(function() {
  chrome.storage.sync.get('supportOptions', function(data) {
      _each(data.supportOptions, support => {
        document.querySelector(`[value=${support.type}]`).checked = support.status;
      })
    }
  );
})();

/**
 * вспомогательные
 */
function _toArray(arrayLike) {
  return [].slice.call(arrayLike);
}
function _each(toArray, iterator) {
  _toArray(toArray).forEach(iterator);
}