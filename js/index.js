

//banner轮播
//自动轮播
var lunbotu=$(".lunbotu")[0]
var yeshu=$(".yeshu")[0]
var banner=$(".banner",lunbotu);
var la=$("a",yeshu);
var banLeft=$(".left",lunbotu)[0];
var banRight=$(".right",lunbotu)[0];

	for (var i = 1; i < banner.length; i++) {//把第一张放在盒子里，把剩下四张都放在盒子右边
	    	banner[i].style.left="750px";
	    };
     var now=0;
     var next=0;
     function lunBo(){
     	next++;
     	if(next>=banner.length){
     		next=0;
     	}
        banner[next].style.left="750px";//把每个next强行放在盒子右侧
        animate(banner[now],{left:-750})//把现在盒子里的图左移
        animate(banner[next],{left:0})//把盒子右侧的图左移放在盒子里
        for (var i = 0; i < la.length; i++) {
        	la[i].style.background="#000";
        	banner[i].style.zIndex=0;
        };
        la[next].style.background="red";
        banner[next].style.zIndex=1;
        now=next;

     }
   var t=setInterval(lunBo,3000)


	

 lunbotu.onmouseover=function(){
 	clearInterval(t);
 	banLeft.style.display="block";
 	banRight.style.display="block";
 	
 }
 lunbotu.onmouseout=function(){
 	t=setInterval(lunBo,2000);
 	banLeft.style.display="none";
 	banRight.style.display="none";
 }

 banRight.onclick=function(){
    lunBo();
 }
 banLeft.onclick=function(){
 	    next--;
     	if(next<0){
     		next=banner.length-1;
     	}
        banner[next].style.left="-750px";
        animate(banner[now],{left:750});
        animate(banner[next],{left:0});
        for (var i = 0; i < la.length; i++) {
        	la[i].style.background="#000";
        };
        la[next].style.background="red";
        now=next;   
}

//按钮滑上事件
for (var i = 0; i < la.length; i++) {
	la[i].index=i;
	la[i].onmouseover=function(){
		for (var j = 0; j < banner.length; j++) {
			banner[j].style.zIndex=0;
			la[j].style.background="#000";
		};
      this.style.background="red";
      banner[this.index].style.left=0;
      banner[this.index].style.zIndex=1;
      next=this.index;
	}
}
/*var num=0;
function lunBo(direction){
	if(direction=="r"){
		num++;
		if(num>=banner.length){
			num=0;
		}
	}else if(direction=="l"){
		num--;
		if(num<0){
			num=banner.length-1
		}
	}
	for (var i = 0; i < banner.length; i++) {
		banner[i].style.display="none";
		la[i].style.background="black";
	}
	banner[num].style.display="block";
    la[num].style.background="red";
}
var t=setInterval(function(){
lunBo("r")},2000)*/
//鼠标滑上停，滑走走;滑上左右箭头出现，滑走消失
/*lunbotu.onmouseover=function(){
     clearInterval(t);
     banLeft.style.display="block";
     banRight.style.display="block";
}
lunbotu.onmouseout=function(){
     t=setInterval(function(){
lunBo("r")},2000)
     banLeft.style.display="none";
     banRight.style.display="none";
}
//点击按钮与图片对应播放
for (var i = 0; i < la.length; i++) {
	la[i].index=i;
	la[i].onmouseover=function(){
		for (var j = 0; j < banner.length; j++) {
			banner[j].style.display="none";
			la[j].style.background="black";
		};
      banner[this.index].style.display="block";
      this.style.background="red";
      num=this.index;
	}
}
//点击箭头左右翻页
banLeft.onclick=function(){
	lunBo("l")
}
banRight.onclick=function(){
	lunBo("r")
}*/

//搜索框聚焦
var ssxx=$(".sousuoxingxi")[0];
ssxx.onfocus=function(){
	if(ssxx.value=="搜索天猫超市用品"){
          ssxx.value=""
	}
}
ssxx.onblur=function(){
	if(ssxx.value==""){
          ssxx.value="搜索天猫超市用品"
	}
}



//顶导航悬浮不动
var topnav=$(".topnav")[0];
var cw=document.documentElement.clientWidth;
var topnavw=topnav.offsetWidth;
//左导航
var navleft=$(".navleft")[0];
var navlbtn=$(".navlbtn");
var huojia=$(".huojia");





window.onscroll=function(){
 //window.onscroll事件，监测滚动条位的变化
  var tops=document.body.scrollTop||document.documentElement.scrollTop;
  if(tops>=271){//顶导航悬浮
  	topnav.id="topnav1";
  	topnav.style.paddingLeft=(cw-topnavw)/2+"px";
  	topnav.style.paddingRight=(cw-topnavw)/2+"px"; 	
  }else{
  	topnav.id="topnav2";
  }

  //左侧导航悬浮
  if(tops>=724){
	navleft.style.display="block";
  }else{
	navleft.style.display="none";
  }
//自动跳转
  for (var i = 0; i < huojia.length; i++) {
	if(huojia[i].offsetTop<=tops+120){
		for (var j = 0; j < navlbtn.length; j++) {
			navlbtn[j].style.background="#fff";
			navlbtn[j].style.color="#666666";
		}
		navlbtn[i].style.background="#e5374d";
		navlbtn[i].style.color="#fff";
		now=i;

	}
  }
	//图片按需加载
	var ch=document.documentElement.clientHeight;
	var huojiaB=$(".huojia-bottom");
	//alert(huojiaBottom.length)
	for (var i = 0; i < huojiaB.length; i++) {	
		if(huojiaB[i].offsetTop<=tops+ch){
			var imgs=$("img",huojiaB[i]);
			for (var j = 0; j < imgs.length; j++) {
				var src=imgs[j].getAttribute("date-src")
				imgs[j].src=src;
			};
		}	
	}
}

document.body.scrollTop=1;
var obj=document.body.scrollTop?document.body:document.documentElement;
//点击
var now=0;
for (var i = 0; i < navlbtn.length; i++) {
	navlbtn[i].index=i;
	navlbtn[i].onclick=function(){
	 now=this.index;
	 //obj.scrollTop=huojia[this.index].offsetTop-120;
	 animate(obj,{scrollTop:huojia[this.index].offsetTop-120})
	 for (var j = 0; j < navlbtn.length; j++) {
	 	navlbtn[j].style.background="#fff";
		navlbtn[j].style.color="#666666";
	 }
       this.style.background="#e5374d";
	   this.style.color="#fff";
	   this.style.cursor="pointer";
	}
//滑入
	navlbtn[i].onmouseover=function(){
		for (var j = 0; j < navlbtn.length; j++) {
			if(j!=now){
				navlbtn[j].style.background="#fff";
			    navlbtn[j].style.color="#666666";
			}	
		}
		this.style.background="#e5374d";
	    this.style.color="#fff";
	}
//滑出
	navlbtn[i].onmouseout=function(){
		if (this.index!=now) {
           this.style.background="#fff";
	       this.style.color="#666666";  
		}
		/*for (var j = 0; j < navlbtn.length; j++) {
			if(j==now){
				navlbtn[j].style.background="#e5374d";
			    navlbtn[j].style.color="#fff";
			}	
		}
		this.style.background="#fff";
	    this.style.color="#666666";*/
	}
}


//banner左悬浮框
var leftSidebar=$(".left-sidebar")[0];
var jinkou=$(".jinkou");
var jimg=$(".j-img");
var jksp=$(".jksp");
var jiantou=$(".jiantou");
var submenu=$(".submenu");
for (var i = 0; i < jinkou.length; i++) {
	jinkou[i].index=i;
	jinkou[i].onmouseover=function(){
       submenu[this.index].style.display="block";
       jimg[this.index].src="./images/nbannerleft"+(this.index+1)+".png";
       jksp[this.index].style.color="white";
       jiantou[this.index].style.color="white";
       jinkou[this.index].style.background="#e22a40";

	}
	jinkou[i].onmouseout=function(){
       submenu[this.index].style.display="none";
       jimg[this.index].src="./images/bannerleft"+(this.index+1)+".png";
	   jksp[this.index].style.color="black";
	   jiantou[this.index].style.color="black";
       jinkou[this.index].style.background="#fff";
	} 

}



//mainbav-right下拉菜单
var mainbavR=$(".mainbav-right")[0]
var yiji=$(".yiji",mainbavR);
var erji=$(".erji");
for (var i = 0; i < yiji.length; i++) {
	yiji[i].index=i;
	hover(yiji[i],function(){
       erji[this.index].style.display="block";
	},function(){
       erji[this.index].style.display="none";
	})
};


//右侧导航固定定位
var indexright=$(".right")[0];
var right1=$(".right1");
var right2=$(".right2");

for (var i = 0; i < right1.length; i++) {
	right1[i].index=i;
	hover(right1[i],function(){
       right1[this.index].style.background="red";
       right2[this.index].style.display="block";
      animate(right2[this.index],{right:35},60);
	},function(){
       right1[this.index].style.background="";
       right2[this.index].style.display="none";
       right2[this.index].style.right="70px";
	})
}
var rtop=$(".top")[0];
rtop.onclick=function(){
	var tops=document.body.scrollTop?document.body:document.documentElement;
	animate(tops,{scrollTop:0})
}



//购物车下拉框
var topnaThree=$(".topnav-three")[0];
var xiala=$(".xiala")[0];
hover(topnaThree,function(){
	animate(topnaThree,{width:388})
	animate(xiala,{display:"block"})
},function(){	
	animate(xiala,{display:"none"})
    animate(topnaThree,{width:225})
})


