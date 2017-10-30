var http = require("http");
var qs = require("querystring");
/////////////欢迎页面//////////
exports.showWelcome = function(req,res,next){
    res.render("welcome");
}
/////////////首页/////////////
//页面展示
exports.showIndex = function(req,res,next){
    res.render("index");
}
//数据请求
exports.doIndex = function(req,res,next){
    var opt ={
        hostname :'dushu.xiaomi.com',
        port:80,
        path:'/hs/v3/channel/418'
    }
    var body = '';
    var req_obj = http.request(opt,function(res_obj){
        // console.log("response: " + res_obj.statusCode);
        res_obj.on('data',function(data){  
        body += data;  
        }).on('end', function(){
            // body = JSON.parse(body);  
            res.send(body); 
        });  
    }).on('error', function(e) {  
        // console.log("error: " + e.message);  
    })
    req_obj.end();
}
////////////搜索页面//////////
//页面展示
exports.showSearch = function(req,res,next){
    res.render("search");
}
//数据请求
exports.doSearch = function(req,res,next){
    var data = {
        s:req.query.keyword,
        start: 0,
        count:15
    }
    data = require("querystring").stringify(data);
    var opt = {
        hostname:'dushu.xiaomi.com',
        port:80,
        path:'/store/v0/lib/query/onebox?'+data
    }
    var body = '';
    var req_obj = http.request(opt,function(_res){
        // console.log("response"+_res.statusCode);
        _res.on("data",function(data){
            body += data;
        }).on('end',function(){
            body = JSON.parse(body);
            res.send(body);
        }).on('error',function(e){
            // console.log('error'+e.message);
        })
    })
    req_obj.end();
}
//////////男频页面//////////////////
//页面展示
exports.showMale = function(req,res,next){
    res.render("male",{
        "nav":"男频页面"
    });
}
exports.doMale = function(req,res,next){
    var opt ={
        hostname :'dushu.xiaomi.com',
        port:80,
        path:'/hs/v3/channel/369'
    }
    var body = '';
    var req_obj = http.request(opt,function(res_obj){
        // console.log("response: " + res_obj.statusCode);
        res_obj.on('data',function(data){  
        body += data;  
        }).on('end', function(){
            body = JSON.parse(body);  
            res.send(body); 
        });  
    }).on('error', function(e) {  
        // console.log("error: " + e.message);  
    })
    req_obj.end();
}
////////女频页面/////////////
exports.showFamale = function(req,res,next){
    res.render("female",{
        "nav":"女频页面"
    });
}
exports.doFamale = function(req,res,next){
    var opt ={
        hostname :'dushu.xiaomi.com',
        port:80,
        path:'/hs/v3/channel/370'
    }
    var body = '';
    var req_obj = http.request(opt,function(res_obj){
        // console.log("response: " + res_obj.statusCode);
        res_obj.on('data',function(data){  
        body += data;  
        }).on('end', function(){
            body = JSON.parse(body);  
            res.send(body); 
        });  
    }).on('error', function(e) {  
        // console.log("error: " + e.message);  
    })
    req_obj.end();
}
////////分类页面/////////////
exports.showCategory = function(req,res,next){
    res.render("category",{
        "nav":"分类"
    })
}
//分类页面详情
exports.showCategoryDetail = function(req,res,next){
    res.render("categoryDetail")
}
exports.doCategoryDetailsTags = function(req,res,next){
    var id = req.query.id;
    if(!id){
        res.send("对不起，您访问的页面不存在");
        return;
    }
    var opt = {
        hostname:'dushu.xiaomi.com',
        port:80,
        path:'/hs/v0/android/fiction/category/'+id
    }
    var body = '';
    var req_obj = http.request(opt,function(_res){
        // console.log("response"+_res.statusCode);
        _res.on("data",function(data){
            body += data;
        }).on('end',function(){
            body = JSON.parse(body);
            res.send(body);
        }).on('error',function(e){
            // console.log('error'+e.message);
        })
    })
    req_obj.end();
}
exports.doCategoryDetailsList = function(req,res,next){
    var id = req.query.id;
    var data = {
        "start":req.query.start,
        "count":req.query.count,
        "click":req.query.click,
        "finshed":req.query.finshed,
        "latest":req.query.latest
    }
    data = qs.stringify(data);
    var opt = {
        hostname:'dushu.xiaomi.com',
        port:80,
        path:'/store/v0/fiction/category/'+id +'?'+data
    }
    var body = '';
    var req_obj = http.request(opt,function(_res){
        // console.log("response"+_res.statusCode);
        _res.on("data",function(data){
            body += data;
        }).on('end',function(){
            body = JSON.parse(body);
            res.send(body);
        }).on('error',function(e){
            // console.log('error'+e.message);
        })
    })
    req_obj.end();
}
/////////排行页面/////////////
exports.showRank = function(req,res,next){
    res.render("rank",{
        "nav":"排行"
    });
};
////////页面详情/////////////
exports.bookShow = function(req,res,next){
    // console.log(req.query.id);
    res.render("book",{
        "bookId": req.query.id
    });
}
exports.doBook = function(req,res,next){
    var id = req.query.id;
    console.log("book"+id);
    var opt = {
        hostname:'dushu.xiaomi.com',
        port:80,
        path:'/hs/v0/android/fiction/book/'+id
    }
    var body = '';
    var req_obj = http.request(opt,function(_res){
        // console.log("response"+_res.statusCode);
        _res.on("data",function(data){
            body += data;
        }).on('end',function(){
            body = JSON.parse(body);
            res.send(body);
        }).on('error',function(e){
            // console.log('error'+e.message);
        })
    })
    req_obj.end();
}
////////阅读页面/////////////
// 页面展示
exports.showChapter = function(req,res,next){
    res.render("chapter",{
        "bookId": req.query.id
    });
}
//获取小说目录数据
exports.doChapter_content = function(req,res,next){
    var id = req.query.id;
    var opt = {
        hostname:'dushu.xiaomi.com',
        port:80,
        path:'/store/v0/fiction/detail/'+id+'?chapter_id=0'
    }
    var body = '';
    var req_obj = http.request(opt,function(_res){
        console.log("response"+_res.statusCode);
        _res.on("data",function(data){
            body += data;
        }).on('end',function(){
            body = JSON.parse(body);
            res.send(body);
        }).on('error',function(e){
        })
    })
    req_obj.end();
}
