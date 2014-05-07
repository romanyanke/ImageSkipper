chrome.runtime.sendMessage({}, function(extensionSettings) {
    if (extensionSettings.support.drag) {
        ImageSkipperDragOn();
    }
});

function ImageSkipperDragOn() {
    var skipTrash = 'ImageSkipper_trash',
        ico_trash = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAADAFBMVEXt38Hs3b/z5ceWw9Ls3r/u4MLv4cTs3sDt38Dy48avnnpoTkHt37/w4sTez6+dw8/ay6rr3L3w4cLEtJLg0rLn28GQwNFWUUjl17fo1rTdza3158rp2ryZxdPt38Tn2r/n2brKupitnHni07KbiGu2p4ZxVkV7Y1fk2LxmTThnVUbGtpPTw6NnUUNJZGZoipBvV0hTV1GAZVmDaV15oKqFgXZ2WUlgVkuIbWFsWEn47NHc0LWgnIKlppKjzNvAsI/OvpyIdFfP0L66qYinlXCdx9bQwaCzoHvDt5eq0uCgx9NwWT7w48efjWjbyadxWUJ0W0bx375ZSTmJlorh1LiSxdiMeGN6YUnKt5SKvM3Ov6K7qot7Y1RqZVtgUkJrbGJiTDxPXFl1dF+SfmZXV1GRwdJZeoBhbGeIucprUEDj1bRhW1FHT0l3W01QST7Bs5RWZmRcU0hxi5BdW1XRwqHp3selyteYx9ew1OPq2bm4p4NUfolPb26Bq7aiwMedtbeckXCfydmRnI+ov73t3sChkGvy48SpoYWtuq/Cso6/w7Oci2aBalGVhGCUkHLgz7KrlnHOvpbMyrSJcUrazbNyWU2+wa+Op6aqoICSyNvbzrGzmG+wn4qRej7Ap4DCsYmfi1SKtcG9roOBo6m9o3qbgz/Xx6WnnX5pg3t3c1nu48x3eGKNkX1FaG1wal+tmm6CbE9pfHGEeVp4gGujnoFkXEludV6CiIF9hnHZy65NXl3Gup1hg4jGxbCAfmCcm4H16Mh1ioCToJ6XwM1dY1+UgVlhiJF3h3xVS0B2bF5xfHeel31zoK1+cGB4ssVzYlOGk49ESkSDa2BuWDxhZ2F/YFCDal5iT0Bqfn2j0eNhSDWCoKZOc3p+pKxmYlhZdXheWVJoYlJ4l5t6fXR0VkVjY1xCW1yfi3BqkJl/ZE+AnKC1pIBuobF1r8OTtLt4Y0dQdXttUkVhRzOtooJAcn5ikqCXhmG9rY7p3cRGdHqpmHa7vq17h3aHrLfv3r6Ni3AOlyNtAAACMklEQVQoz2JgZGGHADaBLfujAgVUBRmAHBZGBhYeDjBgVdh3MHjbjs0zFNgZODh4WBjYORjAgFdnk+pum40r+vJZgTwOdrgE5/xF1hoKS7VZ2RhQJXwmLvDRWDZXpI0BVYJVWnjyvCWzJwi3MbEhSbAxBUa4y/f7yUlzNdhLCXGy8gAlWFlZ2ySj1wRPc3Ka1NXRXFff1K4oyMbIICgjwe63Wr/McyE/P7+Xa6Ndoyf/9OXKrAxSrVzuK6tDb96OWzwzVJaZWUw2g7ni3WchBpHuKTqn75sUPVU7aXpItjwyVYzZ9W2qrSSDg6qotYLHw1wzSwOzzGyTw17M5yLLKoASgAArAdT+QyE6H1RU6W7mF3AuazIqzbfM7BYWdz15ABoiPxzA5xfq6DfjfdxxOCnQZvVoff08/gAJDo2LJNo5NeJzNXLg1ycwNPD0+Xx7/BkAAAQiQQtjY+QxbF9xOdje1Wd8PDt1+/8RAAeGiU8LQ70uF1xgYS/d1DK1YlgU+Dp6agAHBWqMCyRWFzfWLWRzcDFWRrlvbyL3+moADRBBUJUpV126XjdnMSpgnBV1mh8VLPYYAAYOUCYnS6/HZK7Ez7ytUlo6Hh9UqnTrFAAHAEBEXAvFYi3KZipfYSZbEgJMAR4TCiAABwgbI7AnKdNdL8YuUi048k0rDgEQTRoNAAQMhIYrVzJpyGzRyDA4C+90EwoKREaGBAABBAcAhnpQ0jNtNjPW8U8hAgkGGCMNBAG5163TaDuL9wAAAABJRU5ErkJggg==)';



    var trash = document.createElement('div');
        trash.id = skipTrash;
        trash.style.position = 'absolute';
        trash.style.width = '24px';
        trash.style.height = '24px';
        trash.style.backgroundSize = '24px';
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

                offsetTop = Math.max(offsetTop, document.body.scrollTop);
                offsetLeft = Math.max(offsetLeft, document.body.scrollLeft);
                trash.style.top = offsetTop + 24 + 'px';
                trash.style.left = offsetLeft + 24 + 'px';
                document.body.appendChild(trash);

            } else {

                var deleteIt = document.elementFromPoint(e.clientX, e.clientY).id === skipTrash;
                if (deleteIt) {
                    skipIt(e.target);
                }
                document.body.removeChild(trash);

            }
        }

    }

    function skipIt(img) {
        img.style.height = img.naturalHeight + 'px';
        img.style.transition="height .3s ease";

        setTimeout(function() {
            img.style.height = 0;
        }, 10);

        setTimeout(function() {
            img.parentNode.removeChild(img);
        }, 300);
    }

    document.addEventListener('dragstart', dragger);
    document.addEventListener('dragend', dragger);

    var contextElement;
    document.addEventListener('contextmenu', function(e) {
        contextElement = e.target;
    });

    chrome.runtime.onMessage.addListener(function(contextSrc) {
      if (contextElement && contextElement.src === contextSrc) {
            skipIt(contextElement);
      }
    });
}