/*
 * bootstrap collapse panel ;
 * left | right
 */
(function($) {

    var oldWidth ;
    var close = false;
    var panel;
    var closeWidth = "50px";
    var $body = $('body');

    $.sevencollapse = function(element, options) {
        var panel = $(this);
        oldWidth = $(panel).css("width");

        console.log(oldWidth);
        $(panel).find(".panel-heading").css("text-align","right");
        $(panel).find(".panel-heading").append('<a  id="open-close"  >\n' +
            '            <span class="glyphicon glyphicon-chevron-left"></span>\n' +
            '        </a>');

        $("#open-close").on("click",function () {
            if(!close){
                $.sevencollapse.close();
            }else{
                $.sevencollapse.open();
            }

        });
    };

    $.sevencollapse.close = function(options) {
        $(panel).stop();


        console.log($(panel).data("side"));
        if($(panel).data("side") === 'right'){
            $(panel).css("position","fixed");
            var op = {};
            op.width = closeWidth;
            op.left = ($(panel).outerWidth(true)-50 )+"px";
            $(panel).animate(op,"slow","swing",function () {
                $(panel).removeClass("sc-active-panel");
                if (typeof options.onOpen == 'function') {
                    options.onOpen();
                }
            });
        }else{
            $(panel).animate({width:closeWidth},"slow","swing",function () {
                $(panel).removeClass("sc-active-panel");
                if (typeof options.onOpen == 'function') {
                    options.onOpen();
                }
            });
        }

        _checkClass($("#open-close span"));
        $(panel).find(".panel-body").css("display","none");
        close = true;
    };

    $.sevencollapse.open = function (options) {
        $(panel).stop();
        _checkClass($("#open-close span"));
        $(panel).find(".panel-body").removeAttr("display");
        $(panel).addClass("sc-active-panel");
        if($(panel).data("side") === 'right'){
            // $(panel).css("position","");
            var op = {};
            op.width = oldWidth;
            op.left = "0px";
            $(panel).animate(op,"slow","swing",function () {
                $(panel).find(".panel-body").css("display","block");
                if (typeof options.onOpen == 'function') {
                    options.onOpen();
                }
            });
        }else{
            $(panel).animate({width:oldWidth},"slow","swing",function () {
                $(panel).find(".panel-body").css("display","block");
                if (typeof options.onOpen == 'function') {
                    options.onOpen();
                }
            });
        }

        close = false;
    };
    $(document).on('click', '.sc-active-panel', function(e) {
        e.stopPropagation();
    });

    $.fn.sevencollapse = function(options) {
        panel = $(this);
        oldWidth = $(panel).css("width");

        var defaults = {
            bodyClass: 'sc-active sc-active-panel', // Class to be added to body when panel is opened
            clickClose: true,       // If true closes panel when clicking outside it
            onOpen: null,            // Callback after the panel opens
            side: 'left' // left->open to right ; right->open to left
        };

        var defauts = _.extend(defaults,options);
        // console.log(JSON.stringify(defaults));

        if(defaults.clickClose){
            $(document).bind('click keyup', function(e) {
                var active = $('.sc-active-panel');

                if(e.type == 'keyup' && e.keyCode != 27) {
                    return;
                }

                if(active.is(':visible') ) {
                    $.sevencollapse.close(options);
                }
            });
        }

        $(panel).addClass(defaults.bodyClass);
        $(panel).data("side",defaults.side);

        if(defaults.side === 'left'){
            // console.log(oldWidth);
            $(panel).find(".panel-heading").css("text-align","right");
            $(panel).find(".panel-heading").append('<a  id="open-close"  >\n' +
                '            <span class="glyphicon glyphicon-chevron-left"></span>\n' +
                '        </a>');

            $("#open-close").on("click",function () {
                _openClose(!close,defauts);
            });

            $(panel).dblclick(function () {
                _openClose(!close,defauts);
            })
        }else if(defaults.side === 'right'){
            $(panel).find(".panel-heading").css("text-align","left");
            $(panel).find(".panel-heading").append('<a  id="open-close"  >\n' +
                '            <span class="glyphicon glyphicon-chevron-right"></span>\n' +
                '        </a>');

            $("#open-close").on("click",function () {
                _openClose(!close,defauts);
            });

            $(panel).dblclick(function () {
                _openClose(!close,defauts);
            })
        }

        return this;
    };

    function _openClose(oc,options) {
        if(oc){
            $.sevencollapse.close(options);
        }else{
            $.sevencollapse.open(options);
        }
    };

    function _checkClass(element) {
        if($(element).hasClass('glyphicon-chevron-right')){
            $(element).removeClass("glyphicon-chevron-right");
            $(element).addClass("glyphicon-chevron-left");
        }else if ($(element).hasClass('glyphicon-chevron-left')){
            $(element).removeClass("glyphicon-chevron-left");
            $(element).addClass("glyphicon-chevron-right");
        }
    };
    function _slideIn(panel, options) {
        var panelWidth = panel.outerWidth(true),
            bodyAnimation = {},
            panelAnimation = {};
        panel.addClass('ps-active-panel').css({
            position: 'fixed',
            top: 0,
            height: '100%',
            'z-index': 999999
        });

        switch (options.side) {
            case 'left':
                panel.css({
                    left: '-' + panelWidth + 'px',
                    right: 'auto'
                });
                bodyAnimation['margin-left'] = '+=' + panelWidth;
                panelAnimation.left = '+=' + panelWidth;
                break;

            case 'right':
                panel.css({
                    left: 'auto',
                    right: '-' + panelWidth + 'px'
                });
                bodyAnimation['margin-left'] = '-=' + panelWidth;
                panelAnimation.right = '+=' + panelWidth;
                break;
        }

        $body.animate(bodyAnimation, options.duration);
    };
})(jQuery);
