/*
**  douban.fm LazyDownload background.js
**
**  load pageAction icon, listen music change, get the music URL
**
**  author: gb_2312
**/
    
    var _tabid = null;
    var _url   = null;

    chrome.runtime.onMessage.addListener(
        // 接收页面上发来的信息，打开图标
        function(message, sender, sendResponse) {
            _tabid = sender.tab.id;
            if ( message.icon == 'on'){
                chrome.pageAction.show(_tabid);           
            }
        }
    );

    chrome.webRequest.onResponseStarted.addListener(
        // 响应开始，请求信息完全可用
        function(detail){
            console.log(detail.url)
            _url = detail.url;
            chrome.tabs.sendMessage(_tabid, {url:_url});
        },{
            urls: ["http://*.douban.com/*.mp3"]
        }
    );
