var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth=320;
    }
var screen_width =  windowWidth;
var bookId = $('#app').attr("data-href");
$.get('/ajax/book/?id='+bookId,function(d){
    new Vue({
        screen_width:windowWidth,
        el:'#app',
        data:d,
        methods:{
            readBook:function(){
                location.href = "/chapter?id="+bookId
            },
            goBack:function(event){
                window.history.go(-1);
            }
        }
    });
    $(".loading").hide();
    $(".container-scroll").show();
    $(".top").show();
},'json')