 //切换行程,费用,须知
 $('.actDetailBoxNav li').bind('click', function () {
        var i = $(this).index();
        var value = $(this).attr('data-value');
        $('.actDetailBoxNav li').removeClass('active');actDetailBoxNav
        $('#actDetailBoxNav li').eq(i).addClass('active');
        $('#actDetailBoxNav_bulid li').eq(i).addClass('active');
        $('.rebox-intro').children().hide();
        $('.' + value).show();
        var scrollTop = $('#actDetailBoxNav_bulid').length ? $('#actDetailBoxNav_bulid').offset().top : 0;
        $("html,body").scrollTop(scrollTop);
        setTimeout(function () {
            $(window).trigger('scroll');
        }, 100);
    });
    var nav_child = $('#actDetailBoxNav_bulid .actDetailBoxNav').children().length;
    $(window).bind('scroll touchmove touchend', function () {
        if (nav_child > 1) {
            var scrollTop = $('#actDetailBoxNav_bulid').length ? $('#actDetailBoxNav_bulid').offset().top : 0;
            var docScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (docScrollTop >= scrollTop) {
                $('#actDetailBoxNav').show();
            } else {
                if ($('.actDetailBoxNav').length > 0) {
                    $('#actDetailBoxNav').hide();
                }
            }
        }
    }).trigger('touchend');
if (nav_child == 0 || nav_child == 1) {
 $('.uc-rebox-box .rebox-title').hide();
}
$('.rebox-intro').children().hide();
var value = $('#actDetailBoxNav_bulid li.active').attr('data-value');
$('.' + value).show();


//倒数时间显示
function clockInt(endDate, id)
{
    var intervalId = '';
    this.container = document.getElementById(id);

    this.end = new Date(endDate.replace(/-/g, "/")).getTime();
    this.star = new Date().getTime();
    this.getCurentTxt = function ()
    {
        var mills = this.end - this.star;
        if (mills <= 0)
        {
            this.container.innerHTML = "截止报名";
            if (intervalId)
            {
                window.clearInterval(intervalId);
            }
            return;
        }
        var v = {};
        v.d = Math.floor(mills / (24 * 60 * 60 * 1000));
        v.h = Math.floor((mills - v.d * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));//获得小时数据
        v.m = Math.floor((mills - v.d * 24 * 60 * 60 * 1000 - v.h * 60 * 60 * 1000) / (60 * 1000));//分钟数
        v.s = Math.floor((mills - v.d * 24 * 60 * 60 * 1000 - v.h * 60 * 60 * 1000 - v.m * 60 * 1000) / 1000);//秒数
        if(v.d>0){
            this.container.innerHTML = "报名剩余时间:" + v.d + "天";
        }else if(v.h>0){
            this.container.innerHTML = "报名剩余时间:" + v.h + "小时";   
        }else{
            this.container.innerHTML = "报名剩余时间:" +  v.m + "分:" + v.s;   
        }
        this.star += 1000;
    }
}  
//-------活动分享
 /*点击取消div块消失开始*/
$("#Cancel").on('click', function () {
    $("#commonuser_share").css('bottom', '-200px');
    $("#commonuser_share").css('display', 'none');
    $("#mybg").hide();
    $(".onSurface").css('bottom', '0px');
});
/*点击取消div块消失结束*/
/*点击分享开始*/
  $("#shareBtn").on("click", function () {
        $(".onSurface").css('bottom', '-53px');
        //加载等待效果
        $("#commonuser_share").css('bottom', '0px');
        $("#commonuser_share").css('display', 'block');
        $("#mybg").show();
        $("#commonuser_share").css('opacity', 0.99);
        // });

    });
/*点击分享结束*/  
/*分享到新浪微博开始*/
$("#shareWb").on('click', function (s, d, e) {
    try {
    } catch (e) {
    }
    var f = 'http://v.t.sina.com.cn/share/share.php?',
            u = document.location.href,
            title = document.title,
            pic = '<?php echo isset($Thumb) ? "http://www.51zxtx.com/" . $Thumb : "/static/nbhw/images/mobile/detail.gif"; ?>',
            p = ['url=', encodeURIComponent(u), '&title=' + location.href, encodeURIComponent(title), '&appkey=2924220432', '&pic=' + encodeURIComponent(pic)].join('');
    screen = window.screen;
    window.open([f, p].join(''), 'mb', 'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
    window.open([f, p].join(''), "mb", ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (screen.width - 620) / 2, ',top=', (screen.height - 450) / 2].join(''));

});
/*分享到新浪微博结束*/    
 /*分享到腾讯微博开始*/
function postToWb() {
    var _t = '我在' + location.href + '</a>发现了一个很好玩的活动，分享给你们一起来参加吧';	//encodeURI(document.title);
    var _url = encodeURI(document.location);
    var _appkey = encodeURI("appkey");//你从腾讯获得的appkey
    var _pic = '/static/nbhw/images/mobile/detail.gif'	//encodeURI('');（列如：var _pic='图片url1|图片url2|图片url3....）
    var _site = location.href;//你的网站地址
    var _u = 'http://v.t.qq.com/share/share.php?title=' + _t + '&url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic;
    window.open(_u, '转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');

}
/*分享到腾讯微博结束*/