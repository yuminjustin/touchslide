(function ($) {
    var s, s2, c, n, autoplay = true,
        timeout = 3000,
        touchslide = function (opts) {
            s = opts.s, s2 = opts.s2, c = opts.c, n = $("img", s2).length;
            if (typeof (opts.a) != "undefined") autoplay = opts.a;
            if (typeof (opts.t) == "number" && opts.t > 1000) timeout = opts.t;
            init();
            events();
        },
        w = $(window).width(),
        h = $(window).height(),
        li, liOn, l1, l2, l3, po, g = 0,
        init = function () {
            s2.height(h);
            if (n == 1) return false;
            if (n <= 2 && n > 1) {
                s2.append(s2.html());
            }
            s.width(w).height(h);
            li = $("li", s2);
            li.width(w).height(h);
            commonOpts.rollback();
            for (var i = 0; i < n; i++) c.append("<span></span>");
            $("span:eq(0)", c).addClass("sOn");
            c.css("margin-left", c.width() * -0.5);
            for (var i = 0, l = li.length; i < l; i++) {
                var temp = li[i];
                if (i < (l - 1))
                    temp.sn = i + 1;
                else
                    temp.sn = 0;
                if (i > 0)
                    temp.sp = i - 1;
                else
                    temp.sp = l - 1;
                temp.style.display = "none";
            }
            liOn = li[0];
            $(liOn).show().css("left", 0);
            $(li[liOn.sn]).show().css("left", w);
            $(li[liOn.sp]).show().css("left", -w);
            if (autoplay)
                autoplay = setTimeout(function () {
                    slideplay()
                }, timeout);
        },
        slideplay = function () {
            animate.move({
                p: "-=" + w,
                n: "-=" + w,
                o: "-=" + w
            }, animate.next);
            if (autoplay)
                autoplay = setTimeout(function () {
                    slideplay()
                }, timeout);
        },
        dote = function () {
            var o = $(".sOn", c);
            var m = $("span:eq(" + g + ")", c);
            m.addClass("sOn");
            o.removeClass("sOn");
        },
        animate = {
            next: function () {
                $(li[liOn.sp]).hide();
                liOn = li[liOn.sn];
                $(li[liOn.sn]).show().css("left", w);
                if (g < (n - 1)) g++;
                else g = 0;
                dote();
                commonOpts.rollback();
            },
            prev: function () {
                $(li[liOn.sn]).hide();
                liOn = li[liOn.sp];
                $(li[liOn.sp]).show().css("left", -w);
                if (g > 0) g--;
                else g = n - 1;
                dote();
                commonOpts.rollback();
            },
            move: function (data, fn) {
                commonOpts.transition();
                $(li[liOn.sp]).css({
                    "left": data.p
                });
                $(li[liOn.sn]).css({
                    "left": data.n
                });
                $(liOn).css({
                    "left": data.o
                });
                transitEnd(liOn, fn);
            }
        },
        events = function () {
            s2.on("touchstart", function () {
                clearTimeout(autoplay);
                l1 = parseInt($(li[liOn.sp]).css("left"));
                l2 = parseInt($(liOn).css("left"));
                l3 = parseInt($(li[liOn.sn]).css("left"));
            });
            s2.drag(function (event, p) {
                $(li[liOn.sp]).css({
                    "left": l1 + (p.x - p.xs)
                });
                $(liOn).css({
                    "left": l2 + (p.x - p.xs)
                });
                $(li[liOn.sn]).css({
                    "left": l3 + (p.x - p.xs)
                });
                if (Math.abs(p.x - p.xs) >= w * 0.5) {
                    if ((p.x - p.xs) < 0) {
                        po = "next";
                    } else {
                        po = "prev";
                    }
                } else {
                    po = "none";
                }
            })
            s2.on("touchend", function (event) {
                event.preventDefault();
                if (po == "prev") {
                    animate.move({
                        p: 0,
                        n: 2 * w,
                        o: w
                    }, animate.prev);
                } else if (po == "next") {
                    animate.move({
                        p: -2 * w,
                        n: 0,
                        o: -w
                    }, animate.next);
                } else {
                    animate.move({
                        p: l1,
                        n: l3,
                        o: l2
                    }, function () {});
                }
                if (autoplay)
                    autoplay = setTimeout(function () {
                        slideplay()
                    }, timeout);
            });
        },
        transitEnd = function (obj, fn) {
            var transitoff = function () {
                fn();
                obj.removeEventListener("webkitTransitionEnd", transitoff, false);
                obj.removeEventListener("transitionend", transitoff, false);
            }
            obj.addEventListener("webkitTransitionEnd", transitoff, false);
            obj.addEventListener("transitionend", transitoff, false);
        },
        commonOpts = {
            rollback: function () {
                li.css({
                    "-webkit-transition": "all 0s",
                    "-moz-transition": "all 0s",
                    "transition": "all 0s"
                });
            },
            transition: function () {
                li.css({
                    "-webkit-transition": "all 0.8s",
                    "-moz-transition": "all 0.8s",
                    "transition": "all 0.8s"
                });
            }
        }
    window.touchslide = touchslide;
})(jQuery);
