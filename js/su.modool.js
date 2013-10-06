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
    init:function(params,callback){ // markup, dimensions, calc. pos
        if($('#modool-back').length == 0){
            $('body').append(MODOOL.markup.container);
        }
        if(typeof(params) != 'undefined'){
            if(typeof(params.modal) == 'undefined'){ // if no modal
                params.modal = true; // set modal to true
            }
            if(typeof(params.close) == 'undefined'){ // if no close
                params.close = true; // set default true
            }else{
                MODOOL.markup.close = ''; // no close
            }
            if(typeof(params.css_classes) != undefined){ // Add classes
                $('#modool-back').addClass(params.css_classes);
            }
            if(typeof(params.steps) != undefined){ // Add classes
                $.each(params.steps,function(index){
                    if(typeof(this.data) == undefined){
                        this.data = '';
                    }
                    if(typeof(this.height) == 'undefined'){ // if no height
                        this.height = '400px'; // set default height
                    }
                    if(typeof(this.width) == 'undefined'){ // if no width
                        this.width = '500px'; // set default width
                    }
                });
                $('#modool-back').after($('#modool_tmpl').tmpl(params.steps[0]));
                $('#modool').css({'min-width':params.steps[0].width,'min--height':params.steps[0].height});
                $('#modool-body').html($(params.steps[0].tmpl).tmpl(params.steps[0].data));
                if(typeof(params.steps[0].lbtn) == 'undefined' || typeof(params.steps[0].lbtn) == false){
                    if(typeof(params.steps[0].text) == 'undefined'){
                        $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(MODOOL.text.single)); // use default text
                    }else{
                        if(typeof(params.steps[0].text.left_btn) == 'undefined'){
                            $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(MODOOL.text.single)); // use default text
                        }else{
                            $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(params.steps[0].text)); // use custom text
                        }
                    }
                }
                if(typeof(params.steps[0].rbtn) == 'undefined' || typeof(params.steps[0].rbtn) == false){
                    if(typeof(params.steps[0].text) == 'undefined'){
                        if(params.steps.length > 1){ // more than one - use next btn
                            $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(MODOOL.text.multi)); // use default text
                        }else{ // only one - use action btn
                            $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(MODOOL.text.single)); // use default text
                        }
                    }else{
                        if(typeof(params.steps[0].text.right_btn) == 'undefined'){
                            if(params.steps.length > 1){ // more than one - use next btn
                                $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(MODOOL.text.multi)); // use default text
                            }else{ // only one - use action btn
                                $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(MODOOL.text.single)); // use default text
                            }
                        }else{
                            $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(params.steps[0].text)); // use custom text
                        }
                    }
                }
                $('.modool-btn-right').attr('rel',0); // set right button rel = 0
                $('#modool-close').unbind().click(function(){ // close button
                    MODOOL.close();
                });
                $('#modool-next').unbind().click(function(){ // next button
                    var rel = parseInt($(this).attr('rel'));
                    MODOOL.next(params,rel);
                });
                $('#modool-action').unbind().click(function(){ // next button
                    var rel = parseInt($(this).attr('rel'));
                    if(params.steps[rel].rbtn_callback()){
                        MODOOL.close();
                    }
                });
            }
            console.log(params);
        }
        if($.isFunction(callback)){
            callback();
        }
    },
    update:function(params,rel){ // re-calc. position
        if(typeof(params) != 'undefined' && typeof(rel) != 'undefined'){
            if(typeof(params.steps[rel]).width != 'undefined' && typeof(params.steps[rel]).height != 'undefined' && typeof(params.steps[rel]).top != 'undefined' && typeof(params.steps[rel]).left != 'undefined'){
                $('#modool').animate({'width':params.steps[rel].width,'height':params.steps[rel].height,'top':params.steps[rel].top,'left':params.steps[rel].left},'250');
            }else{
                if(typeof(params.steps[rel]).width != 'undefined'){
                    $('#modool').css({'width':params.steps[rel].width});
                }
                if(typeof(params.steps[rel]).height != 'undefined'){
                    $('#modool').css({'height':params.steps[rel].height});
                }
                if(typeof(params.steps[rel]).top != 'undefined'){
                    $('#modool').css({'top':params.steps[rel].top});
                }
                if(typeof(params.steps[rel]).left != 'undefined'){
                    $('#modool').css({'left':params.steps[rel].left});
                }
            }
        }
        $('#modool').css({
            'left':($(window).width()/2) - ($('#modool').width()/2),
            'top':($(window).height()/2) - ($('#modool').height()/2),
            'min-width':$('#modool').width,
            'min-height':$('#modool').height
        });

    },
    open:function(params){ // open modool
        $('#modool-back').fadeIn(500);
        var wFinal = $(window).width()/2 - $('#modool').width()/2;
        var hFinal = $(window).height()/2 - $('#modool').height()/2;
        $('#modool').animate({'left':wFinal,'top':hFinal}).fadeOut(0,function(){
            MODOOL.update(params,0);
            $(this).fadeIn(250);
        });


    },
    next:function(params,rel){ // go to next step
        $('#modool-body').html($(params.steps[rel+1].tmpl).tmpl(params.steps[rel+1].data));
        $('.modool-btn-left').remove();
        $('.modool-btn-right').remove();
        if(typeof(params.steps[rel+1].title) != 'undefined'){
            $('#modool-title').html(params.steps[rel+1].title);
        }
        if(typeof(params.steps[rel+1].text) == 'undefined'){ // use default text
            $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(MODOOL.text.multi)); // use default text
        }else{ // use custom text
            if(typeof(params.steps[rel+1].text.left_btn) == 'undefined'){ // check if left_btn text
                $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(MODOOL.text.multi)); // use default text
            }else{
                $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(params.steps[rel+1].text)); // use custom text
            }
        }
        if(typeof(params.steps[rel+1].text) == 'undefined'){ // use default text
            if(params.steps.length == rel+2){ // last step - use action btn
                $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(MODOOL.text.single)); // use default text
            }else{ // more steps - use next btn
                $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(MODOOL.text.multi)); // use default text
            }
        }else{ // use custom text
            if(typeof(params.steps[rel+1].text.right_btn) == 'undefined'){
                if(params.steps.length == rel+2){ // last step - use action btn
                    $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(MODOOL.text.single)); // use default text
                }else{ // more steps - use next btn
                    $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(MODOOL.text.multi)); // use default text
                }
            }else{
                if(params.steps.length == rel+2){ // last step - use action btn
                    $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(params.steps[rel+1].text)); // use custom text
                }else{ // more steps - use next btn
                    $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(params.steps[rel+1].text)); // use custom text
                }
            }
        }
        $('.modool-btn-left').attr('rel',rel+1);
        $('.modool-btn-right').attr('rel',rel+1);
        MODOOL.update(params,rel+1); // update pos/dimensions
        $('#modool-next').unbind().click(function(){ // next button
            var rel = parseInt($(this).attr('rel'));
            MODOOL.next(params,rel);
        });
        $('#modool-prev').unbind().click(function(){ // next button
            var rel = parseInt($(this).attr('rel'));
            MODOOL.prev(params,rel);
        });
        $('#modool-action').unbind().click(function(){ // next button
            var rel = parseInt($(this).attr('rel'));
            if(params.steps[rel].rbtn_callback()){
                MODOOL.close();
            }
        });
    },
    prev:function(params,rel){ // go to prev step
        $('#modool-body').html($(params.steps[rel-1].tmpl).tmpl(params.steps[rel-1].data));
        $('.modool-btn-left').remove();
        $('.modool-btn-right').remove();
        if(typeof(params.steps[rel-1].title) != 'undefined'){
            $('#modool-title').html(params.steps[rel-1].title);
        }
        if(typeof(params.steps[rel-1].text) == 'undefined'){ // use default text
            if(rel-1 == 0){ // last step - use action btn
                $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(MODOOL.text.single)); // use default text
            }else{
                $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(MODOOL.text.multi)); // use default text
            }
        }else{ // use custom text
            if(typeof(params.steps[rel-1].text.left_btn) == 'undefined'){ // use default text
                if(rel-1 == 0){ // last step - use action btn
                    $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(MODOOL.text.single)); // use default text
                }else{
                    $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(MODOOL.text.multi)); // use default text
                }
            }else{ // use custom text
                if(rel-1 == 0){ // last step - use action btn
                    $('#modool-head').prepend($('#modool_btn_close_tmpl').tmpl(params.steps[rel-1].text)); // use custom text
                }else{
                    $('#modool-head').prepend($('#modool_btn_prev_tmpl').tmpl(params.steps[rel-1].text)); // use custom text
                }
            }
        }
        if(typeof(params.steps[rel-1].text.right_btn) == 'undefined'){
            if(params.steps.length > 1){ // more than one - use next btn
                $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(MODOOL.text.multi)); // use default text
            }else{ // only one - use action btn
                $('#modool-head').prepend($('#modool_btn_action_tmpl').tmpl(MODOOL.text.single)); // use default text
            }
        }else{
            $('#modool-head').prepend($('#modool_btn_next_tmpl').tmpl(params.steps[rel-1].text)); // use custom text
        }
        $('.modool-btn-left').attr('rel',rel-1);
        $('.modool-btn-right').attr('rel',rel-1);
        MODOOL.update(params,rel-1); // update pos/dimensions
        $('#modool-next').unbind().click(function(){ // next button
            var rel = parseInt($(this).attr('rel'));
            MODOOL.next(params,rel);
        });
        $('#modool-prev').unbind().click(function(){ // next button
            var rel = parseInt($(this).attr('rel'));
            MODOOL.prev(params,rel);
        });
        $('#modool-close').unbind().click(function(){ // close button
            MODOOL.close();
        });
    },
    close:function(){ // close modool
        $('#modool').fadeOut(250,function(){
            $('#modool').remove();
            $('#modool-back').fadeOut(250,function(){
                $('#modool-back').remove();
            });
        });
    },
    text:{
        'single':{
            'right_btn':'Save',
            'left_btn':'Close'
        },
        'multi':{
            'right_btn':'Next',
            'left_btn':'Back'
        }
    },
    markup:{
        'container':'<div id="modool-back"></div>'
    }
};

function modool(params,callback){
    MODOOL.init(params,function(){
        MODOOL.open(params);
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
                'text':{
                    'right_btn':'Create Call Out'
                },
                'data':testData,
                'tmpl':'#testing_template_1',
                'rbtn':false,
                'lbtn_callback':function(){ // additional fn
                    console.log('first callback');
                },
                'tmpl_callback':function(){ // main callback after tmpl loads
                    console.log('first callback');
                }
            },{
                'title':'Testing Overlay 2',
                'text':{
                    'left_btn':'Manage Call Outs'
                },
                'data':testData2,
                'tmpl':'#testing_template_2',
                'width':'100%',
                'height':'100%'
            },{
                'title':'Testing Overlay 3',
                'text':{
                    'right_btn':'Save Call Out'
                },
                'data':testData3,
                'tmpl':'#testing_template_3',
                'width':'500px',
                'height':'200px',
                'rbtn_callback':function(){  // additional fn
                    console.log('action function goes here');
                    return true;
                }
            }
            ],
            css_classes:'something something2'
        },function(){
            // do something
        });
    });
});

$(window).resize(function(){
    MODOOL.update();
});