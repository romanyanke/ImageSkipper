chrome.extension.sendMessage({}, function(response) {

    var skipTrash = 'ImageSkipper_trash',
        ico_trash = 'url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpath%20fill%3D%22%23fff%22%20stroke%3D%22%23000%22%20stroke-miterlimit%3D%2210%22%20d%3D%22M0%200h100v100h-100z%22%2F%3E%3Cpath%20d%3D%22M41.667%2010.417c-1.154%200-2.083.929-2.083%202.083v6.25h-16.667c-2.308%200-4.167%201.858-4.167%204.167%200%202.308%201.858%204.167%204.167%204.167h54.167c2.309%200%204.167-1.858%204.167-4.167%200-2.308-1.858-4.167-4.167-4.167h-16.667v-6.25c0-1.154-.929-2.083-2.083-2.083h-16.667zm2.083%204.167h12.5v4.167h-12.5v-4.167zm-20.833%2016.667c-2.308%200-4.481%201.89-4.102%204.167l8.268%2050c.377%202.277%201.858%204.167%204.167%204.167h37.5c2.309%200%203.787-1.89%204.167-4.167l8.269-50c.377-2.277-1.793-4.167-4.103-4.167h-54.166z%22%2F%3E%3C%2Fsvg%3E)';

    var trash = document.createElement('div');
        trash.id = skipTrash;
        trash.style.position = 'absolute';
        trash.style.width = '20px';
        trash.style.height = '20px';
        trash.style.backgroundSize = '20px';
        trash.style.backgroundImage = ico_trash;
        trash.style.overflow = 'hidden';
        trash.style.margin = 0;
        trash.style.padding = 0;
        trash.style.lineHeight = 'inherit';
        trash.style.zIndex = 9999999;

    function dragger(e) {

        if (e.target.nodeName === 'IMG') {

            if (e.type === 'dragstart') {

                var bodyRect = document.body.getBoundingClientRect(),
                    elemRect = e.target.getBoundingClientRect(),
                    offsetLeft = elemRect.left - bodyRect.left,
                    offsetTop = elemRect.top - bodyRect.top;

                trash.style.top = offsetTop + 'px';
                trash.style.left = offsetLeft + 'px';
                document.body.appendChild(trash);

            } else {

                var deleteIt = document.elementFromPoint(e.clientX, e.clientY).id === skipTrash;
                if (deleteIt) {
                    var skip = e.target;
                    skip.style.height = skip.clienHeight + 'px';
                    skip.style.transition="height .3s ease";
                    skip.style.height = 0;
                    setTimeout(function() {
                        skip.parentNode.removeChild(skip);
                    }, 300);

                }
                document.body.removeChild(trash);

            }
        }

    }

    document.addEventListener('dragstart', dragger);
    document.addEventListener('dragend', dragger);

});