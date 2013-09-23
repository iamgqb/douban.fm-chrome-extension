/*
**  douban.fm LazyDownload Content.js
**
**  add baiduSearch, xiamiSearch, doubanDownload
**
**  author: gb_2312
**/

    
    var addButton = function(){
        var doc = document;
        var appendBox = doc.getElementById('user_play_record');
            var downButton = doc.createElement('li');
            downButton.innerHTML = '<a href="javascript:;" id="baidu_search">搜索百度</a>';
            
            var xiamiButton = doc.createElement('li');
            xiamiButton.innerHTML = '<a href="javascript:;" id="xiami_search">搜索虾米</a>';       

            var downloadButton = doc.createElement('li');
            downloadButton.innerHTML = '<a href="javascript:;" id="douban_download" download="">豆瓣下载</a>'; 

            appendBox.appendChild(downButton);
            appendBox.appendChild(xiamiButton);
            appendBox.appendChild(downloadButton);

            doc.getElementById('baidu_search').addEventListener('click', function(){            
                var url = 'http://music.baidu.com/search?key=' + getSongName();
                window.open(url);
            }, false);
            
            doc.getElementById('xiami_search').addEventListener('click', function(){
                var url = 'http://www.xiami.com/search?key=' + getSongName();
                window.open(url);
            }, false);
    }

    var getSongName = function(){
        return encodeURIComponent(document.title.slice(0, -14));
    };

    var changeURL = function(url){
        var tar = document.getElementById('douban_download');
        tar.href = url;
        tar.download = document.title.slice(0, -14);
    }


    addButton();
    // 开启page图标
    chrome.runtime.sendMessage({icon: 'on'});

    chrome.runtime.onMessage.addListener(
        // 接收下载地址
        function(message, sender, sendResponse){
            changeURL(message.url)
        }
    );