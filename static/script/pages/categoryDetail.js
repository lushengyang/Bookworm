var windowWidth = $(window).width();
if(windowWidth<320){
    windowWidth=320;
}
var screen_width =  windowWidth;
//控制数据的获取
var tagsDataOff = false;
var listDataOff = false;
//获取网址参数
var urlData = {
    id : $.jqURL.get("id"),
    start : $.jqURL.get("start"),
    count : $.jqURL.get("count"),
    url: "click"
}
$.get("/ajax/category/details/tags?id="+urlData.id,function(tagsData){
    getListData(tagsData);
},"json");
var urlStr = "/ajax/category/details/list?id="+urlData.id+"&start=" + urlData.start+"&count=" + urlData.count+"&"+urlData.url+"=1";
function getListData(data){
    $.get(urlStr,function(listData){
        $("#show").css("display","block");
        new Vue({    
            screen_width:windowWidth,
            el:'#app',
            data:{
                tagData:data,
                listData:[listData],
                loadOff:false,
                newUrlStr:"",
                dataOff:true,
                count:0,
                more__info:false
            },
            methods:{
                doBook:function(event){
                    var id = $(event.currentTarget).attr("data-href");
                    location.href = '/book?id='+id;
                },
                doSelect:function(event){
                    var _this = this;
                    var elem = $(event.currentTarget);

                    $(elem).addClass("-crt").siblings().removeClass("-crt");
                    var id =elem.attr("data-href");
                    var list = elem.attr("data-list");
                    urlData.start = 0;
                    _this.count = 0;
                    _this.more__info = false;
                    if(id){
                        urlData.id = id;
                    }else
                    if(list){
                        urlData.url = list;
                    }else{
                        urlData.url = "click";
                    }
                    _this.newUrlStr = "/ajax/category/details/list?id="+urlData.id+"&start=" + urlData.start+"&count=" + urlData.count+"&"+urlData.url+"=1";
                    breakListData( _this.newUrlStr,function(data){
                        _this.listData = [data];
                    });
                    console.log($(".list-h5").position().top);
                },
                scrollFn:function(){
                    var _this = this;
                    //判断是否到达加载位置
                    var $mainCard = $(".main-card");
                    var allHeight = $mainCard.eq(0).outerHeight()+$mainCard.eq(1).outerHeight();
                    var cliHeight = $(".container-scroll").innerHeight();
                    var cliTop = $mainCard.eq(0).position().top;
                    var heightNum = cliHeight-allHeight + 200;
                    if ( _this.dataOff &&cliTop <= heightNum){
                        //判断是否还有更多
                        if (urlData.start>_this.listData[0].total){
                            _this.more__info = true;
                            return;
                        }
                        _this.dataOff = false;
                        _this.count ++;
                        urlData.start = _this.count*10;
                        _this.newUrlStr = "/ajax/category/details/list?id="+urlData.id+"&start=" + urlData.start+"&count=" + urlData.count+"&"+urlData.url+"=1";
                        breakListData(_this.newUrlStr,function(data){
                            _this.listData.push(data);
                            _this.dataOff = true;
                        });
                    }
                }
            }  
        })
    },"json");
}
function breakListData (url,callback){
    $.get(url,function(data){
        callback&&callback(data);
    });
}


