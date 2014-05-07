var i18n = document.querySelectorAll('[locale]'),
    i = 0,
    l = i18n.length;

for (i; i<l; i++) {
    i18n[i].innerHTML = chrome.i18n.getMessage(i18n[i].getAttribute('locale'));
}

var manifest = chrome.runtime.getManifest();
document.querySelector('.ImageSkipper').dataset.version = 'v.' + manifest.version;



var support = document.querySelectorAll('[type=checkbox]');

function save_options() {

    var userSupport = {};
    for (i = 0, l = support.length; i < l; i++) {
        userSupport[support[i].value] = support[i].checked;
    }

    chrome.storage.sync.set({
        support: userSupport
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });

    chrome.extension.getBackgroundPage().readExtensionSettings();
}

function restore_options() {
    chrome.storage.sync.get({
            support: chrome.extension.getBackgroundPage().defaults.support
        }, function(options) {
            for (var way in options.support) {
                document.getElementById(way).checked = options.support[way];
            }
        }
    );
}

restore_options();

for (i = 0, l = support.length; i < l; i++) {
    support[i].addEventListener('change', function() {
        save_options();
    });
}