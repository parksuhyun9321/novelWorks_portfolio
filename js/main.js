$("#gnb .gnbList > li").on("mouseenter",function(){
    $("#header").addClass("on");
})
$("#gnb .gnbList > li").on("mouseleave",function(){
    $("#header").removeClass("on");
})

$("#gnb .gnbList > li .depth01").on("click",function(){
    if($("body").hasClass("mobile")){
        $(this).next(".depth02").stop().slideToggle();
        $(this).parent().siblings().find(".depth02").stop().slideUp();
        $(this).toggleClass("on");
        $(this).parent().siblings().find(".depth01").removeClass("on");
        return false;
    }
});

$(".btnAll").on("click",function(){
    if(!$("body").hasClass("mobile")){
        $("#sitemap").fadeIn(250);
        $("body").addClass("overHidden");
    } else {
        $("#gnb").toggleClass("on");
        $(this).toggleClass("on");
    }
    return false;
});

$("#sitemap .btnClose").on("click",function(){
    $("#sitemap").fadeOut(250);
    $("body").removeClass("overHidden");
    return false;
});

// header

Splitting();
let time01 = gsap.timeline({});
let time02 = gsap.timeline({paused:true});
let time03 = gsap.timeline({paused:true});
time01.from("#mainVisual .visual01 .txt .sub .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    delay:1,
    stagger:{
        each:0.05
    }
})
.from("#mainVisual .visual01 .txt .main .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    stagger:{
        each:0.05
    }
});
time02.from("#mainVisual .visual02 .txt .sub .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    delay:1,
    stagger:{
        each:0.05
    }
})
.from("#mainVisual .visual02 .txt .main .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    stagger:{
        each:0.05
    }
});
time03.from("#mainVisual .visual03 .txt .sub .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    delay:1,
    stagger:{
        each:0.05
    }
})
.from("#mainVisual .visual03 .txt .main .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    stagger:{
        each:0.05
    }
});

// Splitting

let mainVisual = new Swiper("#mainVisual .mask",{
    effect:"fade",
    speed:1500,
    autoplay:{
        delay:5000,
        disableOnInteraction:false,
    },
    navigation:{
        prevEl:"#mainVisual .btnPrev",
        nextEl:"#mainVisual .btnNext",
    },
    on:{
        slideChange:function(){
            if(this.realIndex===0){
                time01.restart();
            } else if(this.realIndex===1) {
                time02.restart();
            } else if(this.realIndex===2) {
                time03.restart();
            }
        }
    }
});
let productDesc = new Swiper("#product .descBox .mask",{
    loop:true,
    effect:"fade",
    allowTouchMove:false,
    speed:1000,
    fadeEffect: {
        crossFade: true
    },
    navigation:{
        prevEl:"#product .btnPrev",
        nextEl:"#product .btnNext",
    }
});
let product = new Swiper("#product .productBox .mask",{
    loop:true,
    centeredSlides:true,
    slidesPerView:"auto",
    spaceBetween:50,
    //allowTouchMove:false,
    speed:1000,
    thumbs:{
        swiper:productDesc
    },
    navigation:{
        prevEl:"#product .btnPrev",
        nextEl:"#product .btnNext",
    },
    breakpoints: {
        1100: {
          slidesPerView: "auto",
          spaceBetween: 250,
        }
      }
});

// swiper
 
let summaryMotion = gsap.timeline({paused:true});
summaryMotion.from("#summary .contentsBox:nth-child(1)",{
    duration:1,
    opacity:0,
    x:"-100%",
    ease:"power4.out"
})
.from("#summary .contentsBox:nth-child(2) .contents:nth-child(1) .imgBox",{
    duration:1,
    opacity:0,
    x:"-100%",
    ease:"power4.out"
},"-=0.8")
.from("#summary .contentsBox:nth-child(2) .contents:nth-child(1) .infoBox",{
    duration:1,
    opacity:0,
    x:"-100%",
    ease:"power4.out"
},"-=0.8")
.from("#summary .contentsBox:nth-child(2) .contents:nth-child(2) .infoBox",{
    duration:1,
    opacity:0,
    x:"-100%",
    ease:"power4.out"
},"-=0.8")
.from("#summary .contentsBox:nth-child(2) .contents:nth-child(2) .imgBox",{
    duration:1,
    opacity:0,
    x:"-100%",
    ease:"power4.out"
},"-=0.8");

let processMotion = gsap.timeline({paused:true,onComplete:function(){
    console.log("processMotion end");
    let num=0;
    $("#process .icons li").eq(num).addClass("on");
    let iconMove = setInterval(function() { 
        num++;
        num = num%8;
        $("#process .icons li").eq(num).addClass("on");
        $("#process .icons li").eq(num).siblings().removeClass("on");
    },2000);
}});
processMotion.from("#process li",{
    duration:1,
    opacity:0,
    x:"-100%",
    ease:"power4.out",
    stagger:{
        each:0.1
    }
})

// greensock


$(window).on("scroll",function(){
    let st = $(window).scrollTop();
    let summary = $("#summary").offset().top;
    let process = $("#process").offset().top;
    if(st>summary-300){
        if(!$("#summary").hasClass("scroll")){
            $("#summary").addClass("scroll");
            summaryMotion.restart();
        }
    }
    if(st>process-300){
        if(!$("#process").hasClass("scroll")){
            $("#process").addClass("scroll");
            processMotion.restart();
        }
    }
    if(st>0){
        if(!$("#header").hasClass("scroll")){
            $("#header").addClass("scroll");
        }
    } else {
        if($("#header").hasClass("scroll")){
            $("#header").removeClass("scroll");
        }
    }
})

$(window).on("resize",function() {
    let w = $(window).width()+17;
    if(w<=1240) {
        if(!$("body").hasClass("mobile")){
            $("body").addClass("mobile");
        }
        $("#sitemap").hide();
        $("body").removeClass("overHidden");
    } else {
        if($("body").hasClass("mobile")){
            $("body").removeClass("mobile");
            $(".btnAll").removeClass("on");
            $("#gnb").removeClass("on");
            $("#gnb .gnbList > li .depth02").removeAttr("style");
        }
    }
})
$(window).trigger("resize");
$(window).trigger("scroll");

// 사이즈에 변화가 있을때의 이벤트
