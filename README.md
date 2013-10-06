modool
======

Multipurpose Overlay System with options for multi-step "forms"

steps = object (numerical)
  title (optional) = string: title of overlay/current step
  text (optional) = array 
    right_btn = string: text of right button
    left_btn = string: text of left button
  data (optional) = object/array of data to iterate over the template
  lbtn (optional) = boolean: set to false to hide left button
  lbtn_callback (optional) = function: executes on click of left button
  rbtn (optional) = boolean: set to false to hide right button
  rbtn_callback (optional) = function: executes on click of right button
  tmpl = string: unique selector - ex: #mydiv or .mydiv
  tmpl_callback (optional) = function: executes after data iterates over template
  height (optional) = string: dimensions for height of overlay - ex: 400px or 50%
  width (optional) = string: dimensions for width of overlay - ex: 500px or 100%

Example:
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
    width:'600px',
    css_classes:'something something2'
  },function(){
    // do something
  });
