$(function () {
    //1.轮播图
    $(window).on('resize',function() {
        //1.窗口宽度
        let clientW = $(window).width();
        //2.设置临界点
        let isShowBigImage = clientW >= 900;
        //3.获取所有item
        let $allItems = $('#lk_carousel .carousel-item')
        //4.遍历
        $allItems.each( (index,item) => { 
             //取出图片路径
             let src = isShowBigImage ? $(item).data('lg-img'):$(item).data('sm-img');
             let imgUrl = `url(${src})`;
             //console.log(src)
             //设置背景
             $(item).css({
                backgroundImage:imgUrl
            });
             //创建img标签
             if(!isShowBigImage){//小屏幕
                 let imgEle = `<img src="${src}">`;
                 console.log(src);
                 $(item).empty().append(imgEle);
             }else {//大屏幕
                $(item).empty();
                
            }

        });
    });
    $(window).trigger('resize');

    //3.轮播图滑动处理
    let startX=0, endX=0;
    let $carouselInner = $('#lk_carousel .carousel-inner')[0];//从jQuery对象中取js对象
    $carouselInner.addEventListener('touchstart', (e)=>{
        startX = e.targetTouches[0].clientX;
    })
    $carouselInner.addEventListener('touchend', (e)=>{
        endX = e.targetTouches[0].clientX;
        //上一张
        if(endX - startX > 0){
            $('#lk_carousel').carousel('prev');
        }else if (endX-startX<0){
            $('#lk_carousel').carousel('next');
        }
    })

    //2.工具提示
    $('[data-toggle=tooltip]').tooltip();

    //4.超出内容的处理（滑块）
    $(window).on('resize',()=>{
        let $ul = $('#lk_product .nav');
        let $allLis = $('.nav-item',$ul);//在上面那个范围找nav-item
        let totalW = 0;//所有li的宽度
        $allLis.each((index,item)=>{
            totalW += $(item).width();
        });
        //获取父标签的宽度
        let parentW = $ul.parent().width();

        if(totalW>parentW){
            $ul.css({
                width:totalW+'px'
            })
        }else {
            $ul.removeAttr('style')
        }
    }).trigger('resize');
});