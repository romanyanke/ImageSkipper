/**
 * элемент, на котором было выбрано действие контекстного меню
 */
var contextElement;
document.addEventListener('contextmenu', function(e) {
  contextElement = e.target;
});

/**
 * Сообщения из бэкграунда
 */
chrome.runtime.onMessage.addListener(function(message) {
  if (message.removeImage) {
    mySkipper.skipImage(contextElement);
  }
});

function ImageSkipper() {
  this.size = 24;
  this.skipperId = 'ImageSkipper' + Date.now();
  this.createSkipperAvatar();

  (function(mySkipper) {
    chrome.runtime.sendMessage('isDragSupported', function(state) {
      if (state) {
        mySkipper.duty();
      }
    });
  })(this);
}

ImageSkipper.prototype.duty = function() {
  document.addEventListener('dragstart', this.userDrag.bind(this));
  document.addEventListener('dragend', this.userDrag.bind(this));
};

ImageSkipper.prototype.userDrag = function(e) {
  if (e.target.nodeName === 'IMG') {
    var skipperAvatar = this.skipperAvatar;

    if (e.type === 'dragstart') {
      e.target.classList.add('ImageSkipper__candidate');

      var bodyRect = document.body.getBoundingClientRect();
      var elemRect = e.target.getBoundingClientRect();

      var offsetX = (elemRect.width - this.size) * 0.5;
      var offsetY = (elemRect.height - this.size) * 0.5;
      var positionX = Math.max(elemRect.left - bodyRect.left, document.body.scrollLeft);
      var positionY = Math.max(elemRect.top - bodyRect.top, document.body.scrollTop);

      skipperAvatar.style.top = positionY + offsetY + 'px';
      skipperAvatar.style.left = positionX + offsetX + 'px';

      document.body.appendChild(skipperAvatar);
    } else {
        e.target.classList.remove('ImageSkipper__candidate');
        console.log(e.clientX, e.clientY, e);
        var element = document.elementFromPoint(e.clientX, e.clientY);
        if (element && element.id === this.skipperId) {
            this.skipImage(e.target);
        }
        document.body.removeChild(skipperAvatar);
    }
  }
};

ImageSkipper.prototype.skipImage = function(img) {
  img.style.height = img.naturalHeight + 'px';
  img.style.transition="height .3s ease";
  img.style.height = 0;
  setTimeout(function() {
      img.parentNode.removeChild(img);
  }, 300);
};

ImageSkipper.prototype.createSkipperAvatar = function() {

  var skipperAvatarBackground = chrome.extension.getURL("icons/icon48.png");
  var skipperAvatar = document.createElement('div');
  skipperAvatar.id = this.skipperId;
  skipperAvatar.className = "ImageSkipper__avatar";

  skipperAvatar.style.position = 'absolute';
  skipperAvatar.style.width = `${this.size}px`;
  skipperAvatar.style.height = `${this.size}px`;
  skipperAvatar.style.backgroundSize = `${this.size}px`;
  skipperAvatar.style.backgroundImage = `url(${skipperAvatarBackground})`;
  skipperAvatar.style.overflow = 'hidden';
  skipperAvatar.style.margin = 0;
  skipperAvatar.style.padding = 0;
  skipperAvatar.style.lineHeight = 'inherit';
  skipperAvatar.style.zIndex = 9999999;

  this.skipperAvatar = skipperAvatar;
};

var mySkipper = new ImageSkipper();
