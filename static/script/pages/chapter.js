var windowWidth = $(window).width();
if (windowWidth < 320) {
    windowWidth = 320;
}
var screen_width = windowWidth;
var bookId = $('#app').attr("data-href");
 $.get('/ajax/chapter?id='+bookId,function(d){
    new Vue({
        el:'#app',
        data:{
            screen_width:windowWidth,
            ad:d.item
        },
        methods:{
            goBack:function(){
                window.history.go(-1);
            }
        }
    })
    $(".loading").hide();
    $("#app").show();
},'json');