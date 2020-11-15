const tagCloud = function() {
//	标签云背景自动生成
var wjcloud_li=document.querySelectorAll(".tag_item");
//	console.log(wjcloud_li);
	for(var i=0; i<wjcloud_li.length;i++){
		var r=Math.random()*255;
		var g=Math.random()*255;
		var b=Math.random()*255;
		wjcloud_li[i].setAttribute("style","background-color: rgba("+r+","+g+","+b+","+.6+")");
	}
}

export {tagCloud};