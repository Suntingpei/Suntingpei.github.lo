$(function(){
	
	//页面高度自适应
	$(".show-page").css({"min-height":$(window).height()-420})
	
	//导航
	$("#head .nav-list-next").mouseover(function(){
		$(this).find(".person").show();
		$(this).find(".nav-list-pro").show();
		$(this).find("a").eq(0).css({"background":"#000","color":"#fff"});
	});
	$("#head .nav-list-next").mouseout(function(){
		$(this).find(".person").hide();
		$(this).find(".nav-list-pro").hide();
		$(this).find("a").eq(0).css({"background":"transparent","color":"#3c3c3c"});
	});
	
	$("#head .nav-list-pro div").mouseover(function(){
		$(this).addClass("active");
	});
	$("#head .nav-list-pro div").mouseout(function(){
		$(this).removeClass("active");
	});

	/*文本居中显示*/
	for( var i=0 ; i<$(".ver-justify").length ; i++ ){
		$(".ver-justify").eq(i).css("top",$(".ver-justify").eq(i).parent().height()/2-$(".ver-justify").eq(i).outerHeight()/2)
	}

	$(".loginbtn").click(function(){
		$("#mask").show();
		$(".logindiv").show();
		$("input").first().focus();
	});
	$(".logindia .close").click(function(){
		$("#mask").hide();
		$(".logindia").hide();
	});
	

	moveNav();

	$(".logo-nav .nav-list > li > a").append('<span class="active-border"></span>');
	$(".logo-nav .nav-list > li > a").attr("data-flag","true");
	function moveNav(){
		var index = $("[data-attr=select]").index();
		$(".logo-nav .nav-list > li > a").on({
			"mouseover" : function(){
				if( $(this).attr("data-flag") == "true"){
					$(this).attr("data-flag","false");
					$(this).parent().find(".active-border").animate({"width":"100%"},function(){
						$(this).parent().attr("data-flag","true");
					});
				}
				else{
					$(this).stop();
				}
				
			},
			"mouseout" : function(){
				if( $(this).attr("data-attr") != "select" ){
				    $(this).parent().find(".active-border").animate({"width":0},100);		
				}
			}
		});
	}

	//轮播
	var iNow=0;
	var countSpan = "";
	var length = $("#scroll-show ul li").length;
	var timer = null;
	var ifMove = false;
	for(var i=0 ; i<$("#scroll-show ul li").length ; i++){
		countSpan += "<span></span>"
	}
	$(".show-change").html(countSpan).find("span").first().addClass("active");
	Scroll(iNow);
	

	//mask
	$("#mask").height( $(document).height() ).width( $(window).width() );

	//轮播
	function Scroll(){
		
		var windowW = $(document).width();
		timer = setInterval(leftMove,5000);
		
		$("#scroll-show ul").width( windowW*5 );
		$("#scroll-show ul li").width( windowW );
		
		function leftMove(type){
			if(type){
				clearInterval(timer);
			}
			iNow==length-1 ? iNow=0 : iNow++;
			$(".show-change span").eq(iNow).addClass("active").siblings().removeClass("active");
			
			$("#scroll-show ul").animate({"left":-windowW},1000,function(){
				$('#scroll-show ul li').first().clone(true).appendTo($('#scroll-show ul'));
				$("#scroll-show ul li").eq(0).remove();
				$("#scroll-show ul").css({"left":0});
				if(type){
					timer = setInterval(leftMove,5000);
				}
			});
		}
		
		function rightMove(type){
			if(type){
				clearInterval(timer);
			}
			iNow==0 ? iNow=length-1 : iNow--;
			$(".show-change span").eq(iNow).addClass("active").siblings().removeClass("active");
			$('#scroll-show ul li').last().clone(true).prependTo($('#scroll-show ul'));
			$('#scroll-show ul').css({"left":-windowW});
			$("#scroll-show ul li").last().remove();
			$("#scroll-show ul").animate({"left":0},1000,function(){
				$("#scroll-show ul").css({"left":0});
				if(type){
					timer = setInterval(leftMove,5000);
				}
			});
		}
		
		$(".leftbtn").off("click").click(function(e){
			e.stopImmediatePropagation();
			e.stopPropagation();
			leftMove("click");
		});
		$(".rightbtn").off("click").click(function(e){
			e.stopImmediatePropagation();
			e.stopPropagation();
			rightMove("click");
		});
	
		$("#scroll-show").bind({
			"mouseover" : function(){
				$(".rightbtn , .leftbtn").show();
				//clearInterval(timer);
			},
			"mouseout" : function(){
				$(".rightbtn , .leftbtn").hide();
				//timer = setInterval(leftMove,5000);
			},
		});
		
		$("#scroll-show .container").click(function(e){
			e.stopImmediatePropagation();
			e.stopPropagation();
			window.location.href = $("#scroll-show li").eq(0).find("a").attr("href")
		});
		
		$("#scroll-show .show-change").on("click","span",function(e){
			var dis = $(this).index() - iNow;
			iNow = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			
			if(dis >= 0){
				$("#scroll-show ul").animate({"left":-(windowW*dis)},function(){
					for( var j=0 ; j<dis ;j++){
						$('#scroll-show ul li').first().clone(true).appendTo($('#scroll-show ul'));
						$("#scroll-show ul li").first().remove();
						$("#scroll-show ul").css({"left":0});
					}
				});
			}
			else{
				for( var j=0 ; j<-dis ; j++){
					$('#scroll-show ul li').last().clone(true).prependTo($('#scroll-show ul'));
					$("#scroll-show ul li").last().remove();	
				}
				$('#scroll-show ul').css({"left":-(windowW)*(-dis)});
				$("#scroll-show ul").animate({"left":0});
			}
			e.stopImmediatePropagation();
			e.stopPropagation();
		})
		
		//alert($("#scroll-show .show-change").width())
		$("#scroll-show .show-change").css({"margin-left" : -$("#scroll-show .show-change").width()/2 });
		
	}
	
});


