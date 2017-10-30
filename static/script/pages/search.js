//搜索首页初始化
var windowWidth = $(window).width();
if (windowWidth < 320) {
    windowWidth = 320;
}
var screen_width = windowWidth;
var menu1 = new Vue({
    el:'#app',
    data:{
        screen_width: windowWidth,
        search:[],
        condition:true,
        empty:false
    },
    methods:{
        doSearch: function(e){
            this.condition = false;
            var key = $('.search_value').val();
            var _this = this;
            $.get('/ajax/search?keyword='+key,function(d){
                _this.search = d.items;
                if(_this.search.length == 0){
                    _this.empy = true;
                }else{
                    _this.empty = false;
                }
            },'json')
        }
    }
});