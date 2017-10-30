var express = require("express");
var app = express();
var router = require("./service/webAppservice.js");
//模版引擎
app.set("view engine", "ejs");

//静态页面
app.use(express.static("./static"));

////////////////////路由表///////////////////
//欢迎
app.get('/',router.showWelcome);
//首页
app.get('/index',router.showIndex);
app.get('/ajax/index',router.doIndex);
//搜索
app.get('/search',router.showSearch);
app.get('/ajax/search',router.doSearch);
//男频页面
app.get('/male',router.showMale);
app.get('/ajax/male',router.doMale);
//女频页面
app.get('/female',router.showFamale);
app.get('/ajax/famale',router.doFamale);
//分类页面
app.get('/category',router.showCategory);
//分类页面详情
app.get('/category/detail',router.showCategoryDetail);
app.get('/ajax/category/details/tags',router.doCategoryDetailsTags);
app.get('/ajax/category/details/list',router.doCategoryDetailsList);
//排行页面
app.get('/rank',router.showRank);
//页面详情
app.get('/book',router.bookShow);
app.get('/ajax/book',router.doBook);
//阅读目录页面
app.get('/chapter',router.showChapter);
app.get('/ajax/chapter',router.doChapter_content);
console.log("开始阅读之旅吧！");
app.listen(3000);