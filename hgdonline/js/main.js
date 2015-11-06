//收藏
function addFavorite(){    
	if (document.all){    
		try{    
            window.external.addFavorite(window.location.href,document.title);    
		}catch(e){    
            alert( "加入收藏失败，请使用Ctrl+D进行添加" );    
		}    
    }else if (window.sidebar){    
        window.sidebar.addPanel(document.title, window.location.href, "");    
	}else{    
        alert( "加入收藏失败，请使用Ctrl+D进行添加" );    
    }    
}

//导航栏
$(document).ready(function() {
    //滚动条发生滚动
	$(window).scroll(function(){
		var top=$(document).scrollTop();
		//console.log(top);
		var menu=$("#menu");
		var items=$("#content").find(".item");
		var currentId="";//当前所在的楼层（item） id
		items.each(function() {
			var m=$(this);
            var itemTop=m.offset().top;
			//console.log(itemTop);
			if(top>itemTop-300){
				currentId="#"+m.attr("id");
			}else{
				return false;
			}
        });
		//给相应楼层的a设置current，取消其他链接的current
		var currentLink=menu.find(".current");
		if(currentId&&currentLink.attr("href")!=currentId){
			currentLink.removeClass("current");
			menu.find("[href="+currentId+"]").addClass("current");
		}
	});
});

//锚点跳转滑动效果
$(function(){  
	$('a[href*=#],area[href*=#]').click(function() {  
		console.log(this.pathname)  
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname){
			var $target = $(this.hash);  
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');  
			if ($target.length) {  
				var targetOffset = $target.offset().top;  
				$('html,body').animate({scrollTop: targetOffset},400);  
				return false;  
            }  
        }  
	});  
})

//卡片翻转
function turnOver(elem){
	var cls =elem.className;
	if(/photo_front/.test(cls)){
		cls=cls.replace(/photo_front/,'photo_back')
	}
	return elem.className=cls;
}
function turnOut(elem){
	var cls =elem.className;
	if(/photo_back/.test(cls)){
		cls=cls.replace(/photo_back/,'photo_front')
	}
	return elem.className=cls;
}

//发送事件  
function fsubmit(obj){
			 $('.jGravity').toggle();
			 $('.jGravity').animate({top:"2406px"},1600,function(){
				 $('.jGravity').toggle();
				 obj.submit();
				 });
		 }
		 var src1="http://www.hgdonline.net/images/fasong.gif";
		 var src2="http://www.hgdonline.net/images/fasong_gray.png";
		 function imgLoad(imgSrc){
			 imgSrc.src=src1;
		 }
		 function imgSwap(imgObj){
			 imgObj.src=(imgObj.src==src1)?src2:src1;
		 }