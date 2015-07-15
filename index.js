var a4 = document.getElementById('applist_html');
    a4.innerHTML = '';
/*右侧广告栏，大家都在看，左侧的感兴趣*/
delAds(['QM_Container_100005','QM_Container_100002','QM_Container_100006']);
/*
* @param {Array} arr 需删除的版块ID
* */
function delAds (arr) {
    for (var i = 0, len = arr.length;i < len; i++) {
        var delEle = document.getElementById(arr[i]);
        delEle.parentNode.removeChild(delEle);
    }
}

/*
* @return {number} g_tk
* */
function getCtoken () {
    var cookies = document.cookie
    var a = 5381
    var match = cookies.match(/(?:;\s?|^)skey=([^;]+);?/)
    if(!match) {
        return
    }
    var c = match[1]
    for (var b = 0, e = c.length; b < e; ++b) {
        a += (a << 5) + c.charCodeAt(b);
    }
    return a & 2147483647
}
/*
* @return {number} QQ号
* */
function getQQ() {
    var tabURL = chrome.runtime.getURL(window.location.href);
    return tabURL.match(/(\d+)/)[0];
}
/*
* ajax 连接
* */
(function ajax() {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
            renderFriendList (xhr.responseText);
        }
    };
    var url = 'http://r.qzone.qq.com/cgi-bin/tfriend/friend_ship_manager.cgi?uin=' + getQQ() + '&do=1&rd=0.0&fupdate=1&clean=1&g_tk=' + getCtoken();
    xhr.open ('GET',url,true);
    xhr.send ();
})();
/*
* 渲染好友列表
* @param {string} xhr.responseText
* */
function renderFriendList(a) {
    a = a.replace(a.match(/^_Callback\(/g),'').replace(a.match(/(\);)/g),'');
    a = JSON.parse(a);
    var temp = '<li><a class="qz-grid" target="_blank" href="http://user.qzone.qq.com/';
    var qz_left = '<div class = "qz-left">';
    var qz_right = '<div class="qz-main">';
    var result = '';
    for(var i = 0 , len = 10;i < len; i++){
        var li = temp +
                 a.data.items_list[i].uin +
                 '">' +
                qz_left +
                '<img alt = "'+
                a.data.items_list[i].name +
                '" src = "'+
                a.data.items_list[i].img +
                '"> </div>' +
                qz_right +
                '<span class = "sn-title">'+
                 a.data.items_list[i].name +
                '</span> </div> </a>';
        result += li;
    }
    a4.innerHTML = '<ul class="sn-list">' + result + '</ul>';
}
//生成g_tk的算法
//QZONE.FrontPage.getACSRFToken=function(a){ a = QZFL.util.URI(a);
//    var b;
//    a && (a.host && 0 < a.host.indexOf("qzone.qq.com") ? b = QZFL.cookie.get("p_skey"):
//    a.host && 0 < a.host.indexOf("qq.com") && ( b = QZFL.cookie.get("skey") ) ) ; b ||
//    ( b = QZFL.cookie.get("skey") || QZFL.cookie.get("rv2"));
//    a = 5381;
//    for( var c = 0,d = b.length;c < d;++c) a += (a<<5) + b.charAt(c).charCodeAt();
//    return a & 2147483647
//};