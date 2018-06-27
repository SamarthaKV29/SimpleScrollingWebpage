const mobile = {

    init_flag: false,

    init: () => {
        $(window).on('resize', function () {

            const width = $(window).width();

            if (width <= 450) {

                if (!mobile.init_flag) {

                    mobile.setup();

                } else {

                    mobile.update();
                }

            } else {

                if (mobile.init_flag) {

                    mobile.destroy();
                }
            }
        });
    },

    setup: () => {
        mobile.controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onEnter'
            }
        });
        $(".row").each((idx, ele) => {
            ele.scene = new ScrollMagic.Scene({
                x: 1000 * idx * Math.pow(-1, idx),
                triggerElement: ele,
                duration: 400,
                reverse: true,
            }).setTween(new TweenMax.from(ele, 1, {
                opacity: 0.2,
                scale: 0,
                'border-radius': 0,
                'font-size': 8,
                'box-shadow': '1px 1px 1000px 100px black, 1px 1px 10px 4px black inset'
            })).addTo(mobile.controller);
        });
        $(".step").each((idx, ele) => {
            ele.scene = new ScrollMagic.Scene({
                triggerElement: ele,
                duration: 500,
                reverse: true
            }).setTween(new TweenMax.from(ele, 1, {
                x: 2000,
                filter: 'blur(5px)',
            })).addTo(mobile.controller);
        });
        $('.fix').each((idx, ele) => {
            ele.scene = new ScrollMagic.Scene({
                triggerElement: $('.row')[0],
                duration: $(document).height(),
            }).setTween(new TweenMax.from('.fix', 1, {
                opacity: 0
            })).addTo(mobile.controller);
        });
    },

    update: () => {
        if (mobile.init_flag) {
            $('.step, .row, .fix').each((idx, ele) => {
                ele.scene.duration(ele.clientHeight);
            });
        }
    },
    destroy: function () {
        mobile.controller.destroy(true);
        mobile.init_flag = false;
    }

};

$(document).ready(() => {
    mobile.init();
});

