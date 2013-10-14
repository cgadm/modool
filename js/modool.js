testData = {
    media:{
        0:{
            'title':'Test Media',
            'id':123456,
            'url':'http://something.com',
            'type':'video'
        }
    }
}
testData2 = {
    media:{
        0:{
            'title':'Test Media 2',
            'id':1234567,
            'url':'http://else.com',
            'type':'photo'
        }
    }
}
testData3 = {
    media:{
        0:{
            'title':'Test Media 3',
            'id':12345678,
            'url':'http://if.com',
            'type':'postcard'
        }
    }
}

MODOOL = {
    steps:function(params,step_num){
        MODOOL.step_num = step_num;
        if(typeof(params.steps) != undefined){ // Check Steps
            $.each(params.steps,function(index){
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
            $('#modool-back').after($('#modool_tmpl').tmpl(params.steps[step_num]));
            if(typeof(params.steps[step_num].css_classes) != undefined){ // Add classes
                $('#modool').addClass(params.steps[step_num].css_classes);
            }
            $('#modool-body').html($(params.steps[step_num].tmpl).tmpl(params.steps[step_num].data));
            MODOOL.btn(params,step_num);
            if(typeof(params.steps[step_num].tmpl_callback) != 'undefined'){
                if($.isFunction(params.steps[step_num].tmpl_callback)){
                    params.steps[step_num].tmpl_callback();
                }
            }
        }
    },
    btn:function(params,step_num){
        MODOOL.rbtn(params,step_num); // setup right button
        MODOOL.lbtn(params,step_num); // setup left button
        MODOOL.update(params,step_num); // update pos/dimensions
        $('.modool-btn').each(function(){ // set buttons rels
            $(this).attr('rel',step_num);
        });
        $('#modool-close').unbind().click(function(){ // close button
            MODOOL.close();
        });
        $('#modool-next').unbind().click(function(){ // next button
            //var rel = parseInt($(this).attr('rel'));
            if(typeof(params.steps[step_num].rbtn_callback) != 'undefined'){
                if($.isFunction(params.steps[step_num].rbtn_callback)){
                    if(params.steps[step_num].rbtn_callback()){ // if true, go next
                        MODOOL.next(params,step_num);
                    }
                }else{ // defined but no fn
                    MODOOL.next(params,step_num);
                }
            }else{ // not defined
                MODOOL.next(params,step_num);
            }

        });
        $('#modool-prev').unbind().click(function(){ // next button
            //var rel = parseInt($(this).attr('rel'));
            if(typeof(params.steps[step_num].lbtn_callback) != 'undefined'){
                if($.isFunction(params.steps[step_num].lbtn_callback)){
                    params.steps[step_num].lbtn_callback()
                }else{ // defined but no fn
                    MODOOL.prev(params,step_num);
                }
            }else{ // not defined
                MODOOL.prev(params,step_num);
            }
        });
        $('#modool-action').unbind().click(function(){ // next button
            //var rel = parseInt($(this).attr('rel'));
            if(typeof(params.steps[step_num].rbtn_callback) != 'undefined'){
                if(params.steps[step_num].rbtn_callback()){
                    MODOOL.close();
                }
            }
        });
    },
    lbtn:function(params,rel){
        if(typeof(params.steps[rel].lbtn) == 'undefined' || typeof(params.steps[rel].lbtn) == false){
            if(typeof(params.steps[rel].text) == 'undefined'){
                if(rel > 0){ // more than one - use back btn
                    $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(MODOOL.text.multi)); // use default text
                }else{
                    $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(MODOOL.text.single)); // use default text
                }
            }else{
                if(typeof(params.steps[rel].text.lbtn) == 'undefined'){
                    if(rel > 0){ // more than one - use back btn
                        $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(MODOOL.text.multi)); // use default text
                    }else{
                        $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(MODOOL.text.single)); // use default text
                    }
                }else{
                    if(typeof(params.steps[rel].lbtn) == true){ // true
                        if(rel > 0){ // more than one - use back btn
                            $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(params.steps[rel].text)); // use custom text
                        }else{
                            $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(params.steps[rel].text)); // use custom text
                        }
                    }
                }
            }
        }
    },
    rbtn:function(params,rel){
        if(typeof(params.steps[rel].rbtn) == 'undefined' || typeof(params.steps[rel].rbtn) == false){
            if(typeof(params.steps[rel].text) == 'undefined'){
                if(rel != params.steps.length-1){ // not last - use next btn
                    $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(MODOOL.text.multi)); // use default text
                }else{ // only one - use action btn
                    $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(MODOOL.text.single)); // use default text
                }
            }else{
                if(typeof(params.steps[rel].text.rbtn) == 'undefined'){
                    if(rel != params.steps.length-1){ // not last - use next btn
                        $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(MODOOL.text.multi)); // use default text
                    }else{ // only one - use action btn
                        $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(MODOOL.text.single)); // use default text
                    }
                }else{
                    if(rel != params.steps.length-1){ // not last - use next btn
                        $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(params.steps[rel].text)); // use custom text
                    }else{
                        $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(params.steps[rel].text)); // use custom text
                    }
                }
            }
        }
    },
    init:function(params,callback){ // markup, dimensions, calc. pos
        MODOOL.step_storage = params;
        if($('#modool-back').length == 0){
            $('body').append(MODOOL.markup.container);
        }else{
            $('#modool-wrap:visible').remove();
        }
        if($('body').hasClass('modool')){
            $('body').removeClass('modool');
        }
        $('body').addClass('modool');
        if(typeof(params) != 'undefined'){
            if(typeof(params.modal) == 'undefined'){ // if no modal
                params.modal = true; // set modal to true
            }
            if(typeof(params.close) == 'undefined'){ // CLOSE
                params.close = true; // set default true
            }else{
                MODOOL.markup.close = ''; // no close
            }

            if(typeof(params.deeplink) != 'undefined'){// DEEPLINK
                MODOOL.steps(params,params.deeplink); // yes
            }else{
                MODOOL.steps(params,0); // no
            }

        }
        if($.isFunction(callback)){
            callback();
        }
    },
    update:function(params,step_num){ // re-calc. position
        if(typeof(params) != 'undefined' && typeof(step_num) != 'undefined'){
            if(typeof(params.steps[step_num]).width != 'undefined' && typeof(params.steps[step_num]).height != 'undefined'){
                $('#modool').css({'width':params.steps[step_num].width});
                if(params.steps[step_num].height == '100%' && params.steps[step_num].width == '100%'){
                    $('#modool').css({'margin':'0 auto'});
                }
                $('#modool-body').css({'height':params.steps[step_num].height});
            }
        }
    },
    seek:function(params,step_num){ // go to any step
        $('#modool-body').html($(params.steps[step_num].tmpl).tmpl(params.steps[step_num].data));
        $('.modool-btn-left').remove();
        $('.modool-btn-right').remove();
        if(typeof(params.steps[step_num].css_classes) != undefined){ // Add classes
            $('#modool').addClass(params.steps[step_num].css_classes);
        }
        if(typeof(params.steps[step_num].title) != 'undefined'){
            $('#modool-title').html(params.steps[step_num].title);
        }
        MODOOL.btn(params,step_num);
        if(typeof(params.steps[step_num].tmpl_callback) != 'undefined'){
            if($.isFunction(params.steps[step_num].tmpl_callback)){
                params.steps[step_num].tmpl_callback();
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
        MODOOL.btn(params,rel+1);
        if(typeof(params.steps[rel+1].tmpl_callback) != 'undefined'){
            if($.isFunction(params.steps[rel+1].tmpl_callback)){
                params.steps[rel+1].tmpl_callback();
            }
        }
    },
    open:function(params){ // open modool
        /*var wFinal = $(window).width()/2 - $('#modool').width()/2;
         var hFinal = $(window).height()/2 - $('#modool').height()/2;
         $('#modool').animate({'left':wFinal,'top':hFinal}).fadeOut(0,function(){
         MODOOL.update(params,0);
         $(this).fadeIn(250);
         });*/
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
        MODOOL.btn(params,rel-1);
        if(typeof(params.steps[rel-1].tmpl_callback) != 'undefined'){
            if($.isFunction(params.steps[rel-1].tmpl_callback)){
                params.steps[rel-1].tmpl_callback();
            }
        }
    },
    close:function(callback){ // close modool
        if(typeof(MODOOL.step_storage.steps[MODOOL.step_num].lbtn_callback) != 'undefined'){
            if($.isFunction(MODOOL.step_storage.steps[MODOOL.step_num].lbtn_callback)){
                MODOOL.step_storage.steps[MODOOL.step_num].lbtn_callback();
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
        }else{
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

    },
    text:{
        'single':{
            'rbtn':'Save',
            'lbtn':'Close'
        },
        'multi':{
            'rbtn':'Next',
            'lbtn':'Back'
        }
    },
    markup:{
        'container':'<div id="modool-back"></div>'
    }
};

function modool(params,callback){
    MODOOL.init(params,function(){
        MODOOL.update(params,0);
        $('#modool').fadeIn(250);
    });
    if($.isFunction(callback)){
        callback();
    }
}

$(document).ready(function(){
    $('#overlayDefault').click(function(){
        modool({
            steps:[{
                'title':'Testing Overlay 1',
                'data':testData,
                'tmpl':'#testing_template_1',
                'rbtn':false,
                'text':{
                    lbtn:'Close'
                },
                css_classes:'something something2'
            },{
                'title':'Testing Overlay 2',
                'text':{
                    'lbtn':'Manage Call Outs'
                },
                'data':testData2,
                'tmpl':'#testing_template_2',
                'width':'100%',
                'height':'100%'
            },{
                'title':'Testing Overlay 3',
                'text':{
                    'rbtn':'Save Call Out'
                },
                'data':testData3,
                'tmpl':'#testing_template_3',
                'width':'500px',
                'height':'200px',
                'rbtn_callback':function(){  // additional fn
                    console.log('action function goes here');
                    return true;
                }
            }]
        },function(){
            // do something
        });
    });
});

$(window).resize(function(){
    MODOOL.update();
});