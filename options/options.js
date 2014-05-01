var i18n = document.querySelectorAll('[locale]'),
    i = 0,
    l = i18n.length;

for (i; i<l; i++) {
    i18n[i].innerHTML = chrome.i18n.getMessage(i18n[i].getAttribute('locale'));
}