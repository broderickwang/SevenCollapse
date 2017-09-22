/*
 * bootstrap collapse panel ;
 * left | right
 */
(function($) {

    $.fn.xclose = function () {
        var $panel = $(this);
        _checkC($panel);


        var width = $panel.find(".box-body").width();

        $panel.find(".box-title").css("display","none");
        $panel.find(".box-body").css("display","none");
        var left = $panel.find(".box-header").width();

        if($panel.data("side") == 'right'){
            $panel.css("position","relative");
            $panel.css("left",(width-left)+"px");
        }
    }

    var _checkC = function ($panel) {
        if(($panel.data("side") === 'right' && $panel.hasClass("x-inactive-panel") ) ||
            ($panel.data("side") === 'left' && $panel.hasClass("x-active-panel"))){
            $panel.find(".glyphicon").removeClass("glyphicon-chevron-right");
            $panel.find(".glyphicon").addClass("glyphicon-chevron-left");
        }else if(($panel.data("side") === 'right' && $panel.hasClass("x-active-panel")) ||
            ($panel.data("side") === 'left' && $panel.hasClass("x-inactive-panel")) ) {
            $panel.find(".glyphicon").removeClass("glyphicon-chevron-left");
            $panel.find(".glyphicon").addClass("glyphicon-chevron-right");
        }
    }

    $.fn.xopen = function () {
        var $panel = $(this);
        $panel.css("position","");
        $panel.css("left","0px");
        $panel.find(".box-title").css("display","inline-block");
        $panel.find(".box-body").css("display","block");
        _checkC($panel);
    }

    $.fn.xcollapse = function(options) {
        var $panel = $(this);

        var defaults = {
            bodyClass: ' x-active-panel', // Class to be added to body when panel is opened
            clickClose: false,       // If true closes panel when clicking outside it
            dbclickClose:false,
            onOpen: null,            // Callback after the panel opens
            side: 'left' // left->open to right ; right->open to left
        };
        _.extend(defaults,options);
        $panel.addClass(defaults.bodyClass);
        $panel.data("side",defaults.side);

        if(defaults.side === 'left'){
            $panel.find(".box-header").css("text-align","center");
            if(defaults.title!=undefined){
                $panel.find(".box-header").append('<h3 class="box-title">'+defaults.title+'</h3>');

            }
            $panel.find(".box-header").append('<a  class="open-close"  >\n' +
                '            <span class="glyphicon glyphicon-chevron-left"></span>\n' +
                '        </a>');



            $($panel.find(".open-close")).css("float","right");

        }else if(defaults.side === 'right'){
            $panel.find(".box-header").css("text-align","center");
            if(defaults.title!=undefined){
                $panel.find(".box-header").append('<h3 class="box-title">'+defaults.title+'</h3>');
            }
            $panel.find(".box-header").append('<a  class="open-close"  >\n' +
                '            <span class="glyphicon glyphicon-chevron-right"></span>\n' +
                '        </a>');


            $($panel.find(".open-close")).css("float","left");
        }

        $panel.css({"width":"auto", "display":"inline-block "});

        $panel.find(".open-close").click(function () {
            if($panel.hasClass("x-active-panel")){
                $panel.removeClass("x-active-panel");
                $panel.addClass("x-inactive-panel");
                $panel.xclose();
            }else {
                $panel.addClass("x-active-panel");
                $panel.removeClass("x-inactive-panel");
                $panel.xopen();
            }
        });

        if(defaults.dbclickClose){
            $panel.dblclick(function (){
                if($panel.hasClass("x-active-panel")){
                    $panel.removeClass("x-active-panel");
                    $panel.addClass("x-inactive-panel");
                    $panel.xclose();
                }else {
                    $panel.addClass("x-active-panel");
                    $panel.removeClass("x-inactive-panel");
                    $panel.xopen();
                }
            })
        }

        /*if(defaults.clickClose){
            $(document).bind('click keyup', function(e) {
                var active = $panel.find('.x-active-panel');

                if(e.type == 'keyup' && e.keyCode != 27) {
                    return;
                }

                if(active.is(':visible') ) {
                    // $.sevencollapse.close(options);
                    $panel.xclose();
                }
            });
        }*/
        return this;
    }
    $(document).on('click', '.x-active-panel', function(e) {
        e.stopPropagation();
    });
})(jQuery);