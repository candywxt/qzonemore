alert('打 Chrome 控制台，可以看到这段文字')
console.log('%c打开 Chrome 控制台，可以看到这段文字', 'color: green')

//移出节点
var content=document.getElementById('QM_Container_11');
var x=content.removeChild(content.childNodes[1]);
x=null;