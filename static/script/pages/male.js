var windowWidth = $(window).width();
if (windowWidth < 320) {
    windowWidth = 320;
}
var screen_width = windowWidth;
 $.get('/ajax/male',function(d){
    new Vue({
        el:'#app',
        data:{
            screen_width:windowWidth,
            ad:d.items,
            loadOff:false
        },
        methods:{
            doBook:function(event){
                var id = $(event.currentTarget).attr("data-href");
                location.href = '/book?id='+id;
            }
        }
    })
    $(".container-scroll").show();
},'json');
