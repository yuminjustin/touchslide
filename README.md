# touchslide
触摸+无缝左右滚动焦点图只支持css3，取代jq animate

![sl](http://yuminjustin.cn/uploadfile/2015/0304/thumb_679_482_20150304033452177.jpg "sl") 

###配置简单；
        var st = new touchslide({
           s: $("#slideBox"),/*父容器*/
           s2: $("#slider"),/*滚动容器*/
           c: $("#slideControl"),/*滚动时标识的小点 自定义样式*/
           t: 1000,/*默认3000可不填，最小1000，否则设置无效任然为3000*/
           a: 1, /*默认自动可不填，0或false不自动*/
           f: 1 /*默认手指跟随可不填，0或false不跟随*/
       });
###实现功能；
         1、自动左右滚动，可设置
         2、触摸拖拽
         3、无缝滚动
###手机扫一扫；  

![sl](http://yuminjustin.cn/uploadfile/2015/0304/20150304035710520.jpg "sl") 

###详细：http://yuminjustin.cn/html/plugin/2015/0304/26.html
