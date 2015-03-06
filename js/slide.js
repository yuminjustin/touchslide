(function ($) {
    var s, s2, c, n, autoplay = true,
        timeout = 3000,
        fingerfollow = true,
        touchslide = function (opts) {
            s = opts.s, s2 = opts.s2, c = opts.c, n = $("img", s2).length;
            if (typeof (opts.a) != "undefined") autoplay = opts.a;
            if (typeof (opts.t) == "number" && opts.t > 1000) timeout = opts.t;
            if (typeof (opts.f) != "undefined") fingerfollow = opts.f;
            init();
        },
        oldtimeout = timeout,
        w = $(window).width(),
        h = $(window).height(),
        g = 0,
        li = $("li", s2),
        l, po,
        init = function () {
            styles.stage();
            events();
            if (autoplay) auto.on();
        },
        auto = {
            on: function () {
                autoplay = setInterval(function () {
                    animate.next();
                }, timeout);
            },
            off: function () {
                clearInterval(autoplay);
            }
        },
        styles = {
            stage: function () {
                s.width(w).height(h);
                this.dot();
                this.play(s2, -w);
                this.transit(0.3);
                s2.append($(li[0])[0].outerHTML);
                $(li[0]).before($(li[n - 1])[0].outerHTML);
                for (var i = 0; i < (n + 2); i++) this.play($("li:eq(" + i + ")", s2), i * w);
            },
            transit: function (t) {
                s2.css({
                    "-webkit-transition": "all " + t + "s",
                    "-moz-transition": "all " + t + "s",
                    "transition": "all " + t + "s"
                });
            },
            play: function (o, i) {
                o.css({
                    "transform": "translate(" + i + "px,0px)",
                    "-moz-transform": "translate(" + i + "px,0px)",
                    "-webkit-transform": "translate(" + i + "px,0px)"
                });
            },
            dot: function () {
                for (var i = 0; i < n; i++) c.append("<span></span>");
                $("span:eq(0)", c).addClass("sOn");
                c.css("margin-left", c.width() * -0.5);
            },
            dotchange: function () {
                var x = g;
                if (g == n) x = 0;
                $(".sOn", c).removeClass("sOn");
                $("span:eq(" + x + ")", c).addClass("sOn");
            }
        },
        animate = {
            next: function () {
                g++;
                if (g == (n + 1)) {
                    g = 0;
                    styles.transit(0);
                    styles.play(s2, -w);
                    setTimeout(this.next, 100);
                    return;
                } else {
                    styles.transit(0.3);
                }
                styles.play(s2, (g + 1) * -w);
                styles.dotchange();
            },
            prev: function () {
                g--;
                if (g == -1) {
                    g = n - 1;
                    styles.play(s2, 0);
                    styles.dotchange();
                    transitEnd(s2[0], function () {
                        styles.transit(0);
                        styles.play(s2, (g + 1) * -w);
                    });
                    return;
                } else {
                    styles.transit(0.3);
                }
                styles.play(s2, (g + 1) * -w);
                styles.dotchange();
            }
        },
        events = function () {
            s.on("touchstart", function (e) {
                if (autoplay) auto.off();
                l = (g + 1) * -w;
            });
            if (!fingerfollow) {
                s.swipeLeft(function () {
                    animate.next();
                });
                s.swipeRight(function () {
                    animate.prev();
                });
            } else {
                s.drag(function (event, p) {
                    styles.transit(0);
                    styles.play(s2, l + (p.x - p.xs));
                    if (Math.abs(p.x - p.xs) >= w * 0.38) {
                        if ((p.x - p.xs) < 0) {
                            po = "next";
                        } else {
                            po = "prev";
                        }
                    } else {
                        po = "none";
                    }
                });
            }
            s.on("touchend", function () {
                if (fingerfollow) {
                    styles.transit(0.3);
                    if (po == "prev") {
                        animate.prev();
                    } else if (po == "next") {
                        animate.next();
                    } else {
                        styles.play(s2, l);
                    }
                }
                if (autoplay) auto.on();

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
        };
    window.touchslide = touchslide;
})(jQuery);
