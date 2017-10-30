$.get('/ajax/index',function(d){
    $(".loading").hide();
    $("#app").show();
    d =JSON.parse(d);
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth=320;
    }
    var screen_width =  windowWidth;
    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    var index_header_tab_width = offset.width;
    var menu = new Vue({
        el:'#app',
        data:{
            screen_width:windowWidth,
            double_screen_width:windowWidth*2,
            index_header_tab_width:index_header_tab_width,
            recommend:d.items[2].data.data,
            hot:d.items[1].data.data,
            female:d.items[3].data.data,
            male:d.items[4].data.data,
            free:d.items[5].data.data,
            bottom:d.items[6].data.data,
            bottom:d.items[6].data.data,
            duration:0,
            position:0,
            header_position:0,
            header_duration:0,
            tab_1_class:true,   
            tab_2_class:false,
            loadOff:false
        },
        methods:{
            tabSwitch:function(pos){
                this.duration = 0.5;
                this.header_duration = 0.5;
                if(pos==0){
                    this.position = 0;
                    this.header_position = 0;
                    this.tab_1_class = true;
                    this.tab_2_class = false;
                }else{
                    $(".shelf_box").show();
                    this.position = -screen_width;
                    this.header_position = index_header_tab_width;
                    this.tab_1_class = false;
                    this.tab_2_class = true;
                }
            },
            doBook:function(event){
                var id = $(event.currentTarget).attr("data-href");
                location.href = '/book?id='+id;
            },
            doInfo:function(){
                alert("此功能还没有开通哦")
            }
        }
    });
});