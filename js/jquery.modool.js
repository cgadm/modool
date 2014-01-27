/*
 * jQuery Modool Plugin 1.0.0
 * http://github.com/amabes/modool
 * Requires jQuery 1.4.2
 * Requires jQuery Templates Plugin 1.0.0pre : https://github.com/jquery/jquery-tmpl (https://github.com/BorisMoore/jquery-tmpl)
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function($){
    $.fn.modool = function(options){
        var settings = $.extend({ // Default settings
            title   : '',
            modal   : true,
            close   : true,
            text    :{
                'single':{
                    'rbtn':'Save',
                    'lbtn':'Close'
                },
                'multi':{
                    'rbtn':'Next',
                    'lbtn':'Back'
                }
            }
        }, options);
        var markup={
            modool_back:'<div id="modool-back"></div>',
            modool_tmpl:'<script id="modool_tmpl" type="text/x-jquery-tmpl"><div id="modool-wrap"><div id="modool"><div id="modool-head" class="centerme clearfix"><div id="modool-title">${title}</div></div><div id="modool-body" class="clearfix"></div></div></div></script>',
            modool_btn_close_tmpl:'<script id="modool_btn_close_tmpl" type="text/x-jquery-tmpl"><a id="modool-close" class="modool-btn modool-btn-left drkgrey" href="javascript:void(0);">${lbtn}</a></script>',
            modool_btn_action_tmpl:'<script id="modool_btn_action_tmpl" type="text/x-jquery-tmpl"><a id="modool-action" class="modool-btn modool-btn-right blue" href="javascript:void(0);">${rbtn}</a></script>',
            modool_btn_next_tmpl: '<script id="modool_btn_next_tmpl" type="text/x-jquery-tmpl"><a id="modool-next" class="modool-btn modool-btn-right grey" href="javascript:void(0);">${rbtn} &raquo;</a></script>',
            modool_btn_prev_tmpl :'<script id="modool_btn_prev_tmpl" type="text/x-jquery-tmpl"><a id="modool-prev" class="modool-btn modool-btn-left grey" href="javascript:void(0);">&laquo; ${lbtn}</a></script>'
        }
        var data = {
            step_storage:settings
        }
        var methods = {
            btn:function(settings,step_num){
                methods.rbtn(settings,step_num); // setup right button
                methods.lbtn(settings,step_num); // setup left button
                $.fn.modool.update(settings,step_num); // update pos/dimensions
                $('.modool-btn').each(function(){ // set buttons rels
                    $(this).attr('rel',step_num);
                });
                $('#modool-close').unbind().click(function(){ // close button
                    if(typeof(settings.steps[step_num].lbtn_callback) != 'undefined'){
                        if($.isFunction(settings.steps[step_num].lbtn_callback)){
                            settings.steps[step_num].lbtn_callback();
                            //$.fn.modool.close();
                        }else{ // defined but no fn
                            $.fn.modool.close();
                        }
                    }else{ // not defined
                        $.fn.modool.close();
                    }
                });
                $('#modool-next').unbind().click(function(){ // next button
                    //var rel = parseInt($(this).attr('rel'));
                    if(typeof(settings.steps[step_num].rbtn_callback) != 'undefined'){
                        if($.isFunction(settings.steps[step_num].rbtn_callback)){
                            settings.steps[step_num].rbtn_callback();
                        }else{ // defined but no fn
                            methods.next(settings,step_num);
                        }
                    }else{ // not defined
                        methods.next(settings,step_num);
                    }

                });
                $('#modool-prev').unbind().click(function(){ // next button
                    //var rel = parseInt($(this).attr('rel'));
                    if(typeof(settings.steps[step_num].lbtn_callback) != 'undefined'){
                        if($.isFunction(settings.steps[step_num].lbtn_callback)){
                            settings.steps[step_num].lbtn_callback()
                        }else{ // defined but no fn
                            methods.prev(settings,step_num);
                        }
                    }else{ // not defined
                        methods.prev(settings,step_num);
                    }
                });
                $('#modool-action').unbind().click(function(){ // next button
                    //var rel = parseInt($(this).attr('rel'));
                    if(typeof(settings.steps[step_num].rbtn_callback) != 'undefined'){
                        if($.isFunction(settings.steps[step_num].rbtn_callback())){
                            settings.steps[step_num].rbtn_callback();
                        }
                    }else{
                        $.fn.modool.close();
                    }
                });
            },
            init : function(settings,callback) {
                data.step_storage = settings;
                $('head').append(markup.modool_tmpl).append(markup.modool_btn_close_tmpl).append(markup.modool_btn_action_tmpl).append(markup.modool_btn_next_tmpl).append(markup.modool_btn_prev_tmpl);
                if($('#modool-back').length == 0){
                    $('body').append(markup.modool_back);
                }else{
                    $('#modool-wrap:visible').remove();
                }
                if($('body').hasClass('modool')){
                    $('body').removeClass('modool');
                }
                $('body').addClass('modool');
                if(!settings.close){
                    markup.close = ''; // no close
                }
                if(typeof(settings.deeplink) != 'undefined'){ // DEEPLINK
                    methods.steps(settings,settings.deeplink); // yes
                }else{
                    methods.steps(settings,0); // no
                }
                if($.isFunction(callback)){
                    callback();
                }
            },
            lbtn:function(settings,rel){
                if(typeof(settings.steps[rel].lbtn) == 'undefined' || typeof(settings.steps[rel].lbtn) == false){
                    if(typeof(settings.steps[rel].text) == 'undefined'){
                        if(rel > 0){ // more than one - use back btn
                            $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(settings.text.multi)); // use default text
                        }else{
                            $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(settings.text.single)); // use default text
                        }
                    }else{
                        if(typeof(settings.steps[rel].text.lbtn) == 'undefined'){
                            if(typeof(settings.steps[rel].lbtn_tmpl) == 'undefined'){
                                if(rel > 0){ // more than one - use back btn
                                    $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(settings.text.multi)); // use default text
                                }else{
                                    $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(settings.text.single)); // use default text
                                }
                            }else{
                                if(rel > 0){ // more than one - use back btn
                                    $('#modool-head').prepend($(settings.steps[rel].lbtn_tmpl).tmpl(settings.text.multi)); // use default text
                                }else{
                                    $('#modool-head').prepend($(settings.steps[rel].lbtn_tmpl).tmpl(settings.text.single)); // use default text
                                }
                            }

                        }else{
                            //if(typeof(settings.steps[rel].lbtn) == true){ // true #TODO : Is this needed?
                            if(typeof(settings.steps[rel].lbtn_tmpl) == 'undefined'){
                                if(rel > 0){ // more than one - use back btn
                                    $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(settings.steps[rel].text)); // use custom text
                                }else{
                                    $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(settings.steps[rel].text)); // use custom text
                                }
                            }else{
                                $('#modool-head').prepend($(settings.steps[rel].lbtn_tmpl).tmpl(settings.steps[rel].text)); // use custom text
                            }
                            //}
                        }
                    }
                }
            },
            next:function(params,rel){ // go to next step
                $('#modool-body').html($(params.steps[rel+1].tmpl).tmpl(params.steps[rel+1].data));
                $('.modool-btn-left').remove();
                $('.modool-btn-right').remove();
                if(typeof(params.steps[rel+1].css_classes) != undefined){ // Add classes
                    $('#modool').addClass(params.steps[rel+1].css_classes);
                }
                if(typeof(params.steps[rel+1].title) != 'undefined'){
                    $('#modool-title').html(params.steps[rel+1].title);
                }
                methods.btn(params,rel+1);
                if(typeof(params.steps[rel+1].tmpl_callback) != 'undefined'){
                    if($.isFunction(params.steps[rel+1].tmpl_callback)){
                        params.steps[rel+1].tmpl_callback();
                    }
                }
            },
            prev:function(params,rel){ // go to prev step
                $('#modool-body').html($(params.steps[rel-1].tmpl).tmpl(params.steps[rel-1].data));
                $('.modool-btn-left').remove();
                $('.modool-btn-right').remove();
                if(typeof(params.steps[rel-1].css_classes) != undefined){ // Add classes
                    $('#modool').addClass(params.steps[rel-1].css_classes);
                }
                if(typeof(params.steps[rel-1].title) != 'undefined'){
                    $('#modool-title').html(params.steps[rel-1].title);
                }
                methods.btn(params,rel-1);
                if(typeof(params.steps[rel-1].tmpl_callback) != 'undefined'){
                    if($.isFunction(params.steps[rel-1].tmpl_callback)){
                        params.steps[rel-1].tmpl_callback();
                    }
                }
            },
            rbtn:function(settings,rel){
                if(typeof(settings.steps[rel].rbtn) == 'undefined' || typeof(settings.steps[rel].rbtn) == false){
                    if(typeof(settings.steps[rel].text) == 'undefined'){
                        if(rel != settings.steps.length-1){ // not last - use next btn
                            $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(settings.text.multi)); // use default text
                        }else{ // only one - use action btn
                            $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(settings.text.single)); // use default text
                        }
                    }else{
                        if(typeof(settings.steps[rel].text.rbtn) == 'undefined'){
                            if(rel != settings.steps.length-1){ // not last - use next btn
                                $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(settings.text.multi)); // use default text
                            }else{ // only one - use action btn
                                $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(settings.text.single)); // use default text
                            }
                        }else{
                            if(rel != settings.steps.length-1){ // not last - use next btn
                                $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(settings.steps[rel].text)); // use custom text
                            }else{
                                $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(settings.steps[rel].text)); // use custom text
                            }
                        }
                    }
                }
            },
            seek:function(settings,step_num){ // go to any step
                $('#modool-body').html($(settings.steps[step_num].tmpl).tmpl(settings.steps[step_num].data));
                $('.modool-btn-left').remove();
                $('.modool-btn-right').remove();
                if(typeof(settings.steps[step_num].css_classes) != undefined){ // Add classes
                    $('#modool').addClass(settings.steps[step_num].css_classes);
                }
                if(typeof(settings.steps[step_num].title) != 'undefined'){
                    $('#modool-title').html(settings.steps[step_num].title);
                }
                methods.btn(settings,step_num);
                if(typeof(settings.steps[step_num].tmpl_callback) != 'undefined'){
                    if($.isFunction(settings.steps[step_num].tmpl_callback)){
                        settings.steps[step_num].tmpl_callback();
                    }
                }
            },
            steps:function(settings,step_num){
                data.step_num = step_num;
                if(typeof(settings.steps) != undefined){ // Check Steps
                    $.each(settings.steps,function(index){
                        if(typeof(this.data) == undefined){
                            this.data = '';
                        }
                        if(typeof(this.height) == 'undefined'){ // if no height
                            this.height = '420px'; // set default height
                        }
                        if(typeof(this.width) == 'undefined'){ // if no width
                            this.width = '500px'; // set default width
                        }
                    });
                    $('#modool-back').after($('#modool_tmpl').tmpl(settings.steps[step_num]));
                    if(typeof(settings.steps[step_num].css_classes) != undefined){ // Add classes
                        $('#modool').addClass(settings.steps[step_num].css_classes);
                    }
                    $('#modool-body').html($(settings.steps[step_num].tmpl).tmpl(settings.steps[step_num].data));
                    methods.btn(settings,step_num);
                    if(typeof(settings.steps[step_num].tmpl_callback) != 'undefined'){
                        if($.isFunction(settings.steps[step_num].tmpl_callback)){
                            settings.steps[step_num].tmpl_callback();
                        }
                    }
                }
            }
        };
        return this.each(function(){
            $(this).unbind().click(function(e){
                e.preventDefault();
                methods.init(settings,function(){
                    $.fn.modool.update(settings,0);
                    $('#modool').fadeIn(250);
                });
            });
        });

    }
    $.fn.modool.update=function(params,step_num){ // re-calc. position
        if(typeof(params) != 'undefined' && typeof(step_num) != 'undefined'){
            if(typeof(params.steps[step_num]).width != 'undefined' && typeof(params.steps[step_num]).height != 'undefined'){
                $('#modool').css({'width':params.steps[step_num].width});
                if(params.steps[step_num].height == '100%' && params.steps[step_num].width == '100%'){
                    $('#modool').css({'margin':'0 auto'});
                }
                $('#modool-body').css({'height':params.steps[step_num].height});
            }
        }
    }
    $.fn.modool.close=function(callback){
        $('#modool-wrap').fadeOut(250,function(){
            $(this).remove();
            $('#modool-back').fadeOut(250,function(){
                $(this).remove();
                $('body').removeClass('modool');
                if($.isFunction(callback)){
                    callback();
                }
            });
        });
    }
    $(window).resize(function(){
        $.fn.modool.update();
    });
}(jQuery));

// Usage example:
//$("a").showLinkLocation();