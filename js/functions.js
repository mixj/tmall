
//2016.4.28
//1.解决类名的兼容函数
//classname:所要找的类名
//father:通过这个父类找类名
function getClass(classname,father)
{//兼容函数
	var father=father||document     //父容器的默认值
	if(father.getElementByClassName){//条件为真时，是FF和chrome
		return father.getElementByClassName(classname);
	   }else{//条件假时 是IE	        
	   	    var all=father.getElementsByTagName("*")//*指所有的
	        var newarr=[];        
	        for (var i = 0;i<all.length;i++){//遍历数组
	        	if(checkRe(all[i].className,classname)){
	        	//若是真，表示找见了        		
	        		newarr.push(all[i])
	        	}
	        }
	        return newarr;
	     }
    }
  function checkRe(arr,classname){
       var arr1=arr.split(" ")
       //以空格做分隔符  arr分割成数组arr1
       for(var i=0;i<arr1.length;i++){//遍历arr1
       if(arr1[i]==classname){
      		return true;
      	  }
       }return false;
  }



/**********************************************************************************/
  //2016.5.3
  //2.纯文本的兼容函数
  //obj:对象
  //val:要设置的纯文本
  function getText(obj,val){
  	//获取
  	if (val==undefined) {//value没有设置是获取文本，设置了是设置文本
      if(obj.textContent){
      	return obj.textContent;//FF或chrome
      }else{
      	return obj.innerText;//IE
      }
   }else{
    //设置
      if(obj.textContent){
      	obj.textContent=val;//FF或chrome
      }else{
      	obj.innerText=val;//IE
      }
   }
}


/**********************************************************************************/
//3.获取样式的兼容函数fh
//obj:对象
//attr:属性
function getStyle(obj,attr){
	if(obj.currentStyle){//ie
		return parseInt(obj.currentStyle[arrt]);
	}else{//FF
		return parseInt(getComputedStyle(obj,null)[attr]);
	}
}




/**********************************************************************************/
//4.获取元素的兼容函数
/*$(".box");
$("#box");
$("li");*/
//selector:表示选择器，与css的选择器一样
//father:父容器
function $(selector,father){
  //给父容器设置默认值
  father=father||document
  //给selector做判断
 if(typeof selector=="string"){
  //字符串
    selector=selector.replace(/^\s*|\s*$/g,"");
    //去除字符串左右的空格
    if(selector.charAt(0)=="."){
    //类名
      return getClass(selector.slice(1),father)
    }else if(selector.charAt(0)=="#"){
    //id名
      return father.getElementById(selector.slice(1));
    }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){//标签名
      return father.getElementsByTagName(selector);
    }
  }else if(typeof selector=="function"){
    //是一个函数时，执行windows.onload事件
     window.onload=function(){
      selector();//让函数运行
     }
  }
}



/**********************************************************************************/
//2016.5.6
//5.获取子元素的兼容函数
//father:父元素

function getChild(father,type){
  type=type||"b";
    var all=father.childNodes;
    var arr=[];
    for (var i = 0; i < all.length; i++) {
      if(type=="a"){//只获取元素子节点
        if(all[i].nodeType==1){
              arr.push(all[i]);
        }
      }else if(type=="b"){//获取元素+非空文本节点
        if(all[i].nodeType==1 || (all[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""&&all[i].nodeType==3)){
          arr.push(all[i]);
        }

    }      
  }
    return arr;
}




/**********************************************************************************/
//6.获取子节点中的第一个
function getFirst(father){
   return getChild(father)[0];
}


/**********************************************************************************/
//7.获取子节点中的最后一个
function getLast(father){
   return getChild(father)[getChild(father).length-1];
}



/**********************************************************************************/
//8.通过指定下标来获得子节点中的一个
//num:下标
function getNum(father,num){
   return getChild(father)[num]
}


/**********************************************************************************/
//2016.5.7
//9.获得下一个兄弟节点
//obj:当前对象

function getNext(obj){
   var next=obj.nextSibling;
  if(next==null){
    return false;
  }
  while(next.nodeType==8||(next.nodeType==3&&next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){ //条件为真，即节点类型为注释或空的文本时，继续循环查找
    next=next.nextSibling;
    if(next==null){
       return false;
    } 
  }
  return next; 
}
  


/**********************************************************************************/
//2016.5.7
//10.获得上一个兄弟节点
//obj:当前对象
function getUp(obj){
  var up=obj.previousSibling;
  if(up==null){
    return false;
  }
  while(up.nodeType==8||(up.nodeType==3&&up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){ //条件为真，即节点类型为注释或空的文本时，继续循环查找
      up=up.previousSibling; 
      if(up==null){
       return false;
      }
  }
  return up;
}  




/**********************************************************************************/
//2016.5.7
//11.插入到某个对象之后
//father:父元素
//obj:插谁的后面
//newNode：插入的对象
function insertAfter(father,newNode,obj){
  father=father||document.body
  var next=getNext(obj);
  if(next){//如果为真，把newNode插在next的前面
    father.insertBefore(newNode,next);
  }else{//如果obj没有下一个节点，直接加在父元素最后一个
    father.appendChild(newNode)
  }
  
}




/**********************************************************************************/
//2016.5.9
//12.事件绑定兼容函数（添加）
function  addEvent(obj,event,fun){
  if(obj.addEventListener){
    return obj.addEventListener(event,fun,false)
  }else{
    return obj.attachEvent("on"+event,function(){
      fun.call(obj)
    })
  }
}



/**********************************************************************************/
//2016.5.9
//13.事件解绑兼容函数（删除）
function  delEvent(obj,event,fun){
  if(obj.removeEventListener){
    return obj.removeEventListener(event,fun,false)
  }else{
    return obj.detachEvent("on"+event,function(){
      fun.call(obj)
    })
  }
}



/**********************************************************************************/
//2016.5.9
//14.滚轮事件
function mouseWheel(obj,up,down){
    if(obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
      obj.addEventListener("mousewheel",scrollFn,false);
      //chrome,safari -webkit-
      obj.addEventListener("DOMMouseScroll",scrollFn,false);
      //ff -moz-
    }


    //函数scrollFn
    function scrollFn(e){
      var ev=e||window.event;
      //阻止浏览器的默认行为
      if(ev.preventDefault){
        ev.preventDefault();
      }else{
        ev.returnValue = false;
      }

      var val=ev.detail||ev.wheelDelta;
      if(val==-3||val==120){
        if(up){
          up()
        };
      }else if(val==3||val==-120){
        if(down){
          down()
        };
      }
    }
}



/**********************************************************************************/
//2016.5.9
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
