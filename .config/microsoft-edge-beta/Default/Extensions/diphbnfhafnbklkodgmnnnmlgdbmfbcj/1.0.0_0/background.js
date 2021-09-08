chrome.contextMenus.create({
        title: '使用百度搜索：%s', 
        contexts: ['selection'], 
        onclick: function(params)
        {
                chrome.tabs.create({url: 'https://www.baidu.com/s?wd=' + encodeURI(params.selectionText)});
        }
});