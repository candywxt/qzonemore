alert('打 Chrome 控制台，可以看到这段文字')
console.log('%c打开 Chrome 控制台，可以看到这段文字', 'color: green')
//得到QQ号
function getDomainFromUrl(url){
     var host = "null";
     if(typeof url == "undefined" || null == url)
          url = window.location.href;
          //正则表达式还没弄出来
     var regex = /.*\:\/\/([^\/]*).*user.qzone.qq.com/;
     var match = url.match(regex);
     if(typeof match != "undefined" && null != match)
          host = match[1];
     return host;
}

//试着改变一个链接

document.getElementById('gdtLifelink').innerHTML="特别关心"
document.getElementById('gdtLifelink').href="http://user.qzone.qq.com/p/r/cgi-bin/tfriend/specialcare_get.cgi?uin=getDomainFromUrl(tab.url).toLowerCase()&do=3&fupdate=1&rd=0.7072874300647527&g_tk=tk"
document.getElementById('gdtLifelink').target="_blank"
var tk=QZONE.FrontPage.getACSRFToken();