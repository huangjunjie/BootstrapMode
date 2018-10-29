//首先是活动验证
/*
模块名：登录点击事件
功能：检测账号密码
动作：跳转 or 提示
作者：hjj
时间：2018.10.26 
版本：0.1
接口：url
关联函数：警告框
*/
$("#btn-login").on("click",function(event){
	event.preventDefault();
    var url="";
    //正则
	var pattern_username=/^[a-z0-9\u2E80-\u9FFF]{5,12}$/;
	var pattern_username_emial=/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
	var pattern_username_phone=/^1[34578]\d{9}$/;
	var pattern_password=/^(?=.*\d)(?=.*[a-z])[a-z0-9_-]{6,25}$/;

	var str_username=$("#username").val();
	var str_password=$("#password").val();
	var str_msg="<div id='myAlert' class='alert alert-warning alert-dismissible fade in' role='alert' data-dismiss='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Oh错误!</strong>";
	var radix=0;
	//用户名
	radix=1;
	switch(1)
	{
		//长度检测
		case 1:
		if(!str_username||str_username.length==0){radix=0;str_msg=str_msg+"用户名不能为空";break;};
		case 2:
		if(str_username.length>32||str_username.length<5){radix=0;str_msg=str_msg+"用户名长度异常";break;};
		//正则检测
		case 3:
		if(!pattern_username.test(str_username)&&!pattern_username_emial.test(str_username)&&!pattern_username_phone.test(str_username)){radix=0;str_msg=str_msg+"用户名格式不正确";break;};
		case 4:
		if(!str_password||str_password.length==0){radix=0;str_msg=str_msg+"密码不能为空";break;};	
		case 5:
		if(str_password.length>25||str_password.length<6){radix=0;str_msg=str_msg+"密码长度异常";break;};
		case 6:
		if(!pattern_password.test(str_password)){radix=0;str_msg=str_msg+"密码格式不正确";break;};
	}
	//预处理window.alert(str_password);
	str_msg=str_msg+"</div>";
	if(!radix)
	{
		$("#myAlert-box").empty();
    	$("#myAlert-box").append(str_msg);
    	$("#loginbox").css({"height":"34em"});
	}
    else
    {
    	$("form").attr({"action":url});
    	$("form").submit();
    }
});

//警告框
$('#myAlert').on('closed.bs.alert', function () {
  // do something…
  $("#loginbox").css({"height":"29em"});
  
})

/*
模块名：输入补充
功能：检测账号充填邮箱
动作：自动添加@qq.com
作者：hjj
时间：2018.10.26 
版本：0.1
接口：
关联函数：修改swith中的东西就好了

*/
$('#username').on("input propertychange",function(event){
	event.preventDefault();
	var str=$('#username').val();
	var tooltip="<ul class='dropdown-menu' id='dropdown-menu-username' aria-labelledby='dLabel'>";
	//初次点击
	if($("#dropdown-menu-username")!=null)
	{
			droptooltip();
	}
	if(str.length>2&&str.substring(str.length-1,str.length)=='@')
	{

		switch(1)
		{
			case 1:tooltip=tooltip+"<li><a href='#'><small>"+str+"qq.com</small></a></li>";
			case 2:tooltip=tooltip+"<li><a href='#'><small>"+str+"163.com</small></a></li>";
			case 3:tooltip=tooltip+"<li><a href='#'><small>"+str+"outlook.com</small></a></li>";
			case 4:tooltip=tooltip+"<li><a href='#'><small>"+str+"gmail.com</small></a></li>";
			case 5:tooltip=tooltip+"<li><a href='#'><small>"+str+"334.com</small></a></li>";
			case 6:tooltip=tooltip+"<li><a href='#'><small>"+str+"666.com</small></a></li>";
		}
		//显示tooltip
		$('form').first().attr({"autocomplete":"off"});
		$('.input-group').first().addClass("dropdown");
		$('#username').attr({"data-toggle":"dropdown"});
		$('#username').after(tooltip);
		$('.input-group').first().addClass("open");

		
		
		//添加键盘事件
		$('.dropdown ul li a').each(function(index){
			$(this).on("keydown",index,function(event){
				event.preventDefault();
				if(index==0&&event.keyCode==38)
				{
					
				}
				if(index>0&&event.keyCode==38)
				{
					//event.preventDefault();
				}
				if(index<6&&event.keyCode==40)
				{
					//event.preventDefault();
				}
				
				if(event.keyCode==13&&index>=0&&index<6)
				{
					$("#username").val($(this).children("small").html());
					droptooltip();
				}
			})
		})

		
		//选择充填
		$(".dropdown ul li a").each(function(){
			$(this).on("click",function(event){
			event.preventDefault();
			$("#username").val($(this).children("small").html());
			droptooltip();
			})
		})
		//焦点控制
		$('.dropdown ul li a').first().focus();
		return;
	}
})

//清除提示
var droptooltip=function(){
	$(".dropdown ul").remove();
	$(".dropdown").removeClass("dropdown");
	$('.input-group').first().removeClass("open");
	$('#username').removeAttr("data-toggle");
	$('form').first().removeAttr("autocomplete");
}

//添加提示
var addtooltip=function(){
	event.preventDefault();
	var str=$('#username').val();
	if($("#dropdown-menu-username")!=null)
	{
			droptooltip();
	}
	var tooltip="<ul class='dropdown-menu' id='dropdown-menu-username' aria-labelledby='dLabel'>";
	//初次点击
	if(str.length>2&&str.substring(str.length-1,str.length)=='@')
	{
		switch(1)
		{
			case 1:tooltip=tooltip+"<li><a href='#'><small>"+str+"qq.com</small></a></li>";
			case 2:tooltip=tooltip+"<li><a href='#'><small>"+str+"163.com</small></a></li>";
			case 3:tooltip=tooltip+"<li><a href='#'><small>"+str+"outlook.com</small></a></li>";
			case 4:tooltip=tooltip+"<li><a href='#'><small>"+str+"gmail.com</small></a></li>";
			case 5:tooltip=tooltip+"<li><a href='#'><small>"+str+"334.com</small></a></li>";
			case 6:tooltip=tooltip+"<li><a href='#'><small>"+str+"666.com</small></a></li>";
		}
		//显示tooltip
		$('form').first().attr({"autocomplete":"off"});
		$('.input-group').first().addClass("dropdown");
		$('#username').attr({"data-toggle":"dropdown"});
		$('#username').after(tooltip);
		$('.input-group').first().addClass("open");

		
		
		//添加键盘事件
		$('.dropdown ul li a').each(function(index){
			$(this).on("keydown",index,function(event){
				event.preventDefault();
				if(index==0&&event.keyCode==38)
				{
					
				}
				if(index>0&&event.keyCode==38)
				{
					//event.preventDefault();
				}
				if(index<6&&event.keyCode==40)
				{
					//event.preventDefault();
				}
				
				if(event.keyCode==13&&index>=0&&index<6)
				{
					$("#username").val($(this).children("small").html());
					droptooltip();
				}
			})
		})

		
		//选择充填
		$(".dropdown ul li a").each(function(){
			$(this).on("click",function(event){
			event.preventDefault();
			$("#username").val($(this).children("small").html());
			droptooltip();
			})
		})

		return;
	}
}

//取回焦点
$('#username').focusin(function(event){
	event.preventDefault();
	addtooltip();
})
/*
模块名：记住账号
功能：保存cookie到本地该网站信息
动作：获取本地cookie
作者：hjj
时间：2018.10.26 
版本：0.1
接口：需要服务器 帮助才可实现
关联函数： 
*/
function AddCookie()
{

	$.cookie('Username',$("#username").val(),{
    expires:7,  
    path:'/',
    domain:'localhost',
    secure:false
	})　
}

/*
模块名：注册点击事件
功能：跳转到注册页面
动作：跳转
作者：hjj
时间：2018.10.26 
版本：0.1
接口：url
*/

$("#btn-register").click(function(){
	window.location.href="";
})
/*
模块名：忘记密码
功能：找回页面
动作：跳转
作者：hjj
时间：2018.10.26 
版本：0.1
接口：url
*/
$("#password-fg").click(function(){
	window.location.href="?username="+$("#username").val();
})

/*
模块名：第3方登录
功能：通过第3方登录获取用户信息
动作：验证OR跳转
作者：hjj
时间：2018.10.26 
版本：0.1
接口：url
*/
