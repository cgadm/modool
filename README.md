modool
======

**Multipurpose Overlay System with options for multi-step "forms"**

Modool uses steps to represent each "screen" of the overlay.
If the step array is one, then the overlay will behave as a single overlay.
If the step array is greater than one, the overlay will behave as a multi-step overlay.
There are many configurations, but only "tmpl" is required, for the overlay to work.

**Configurations**

**title** = title of overlay/current step "**string**"

**text.lbtn** = text of left button "**string**"

**text.rbtn** = text of right button "**string**"

**data** = data to iterate over the template "**obj/array**"

**lbtn** = set to false to hide left button "**boolean**"

**lbtn_callback** = executes on click of left button "**function**"

**rbtn** = set to false to hide right button "**boolean**"

**rbtn_callback** = executes on click of right button "**function**"

**tmpl** = unique selector of template "**string**" (required)

**tmpl_callback** = executes after data iterates over template "**function**"

**height** = dimensions for height of overlay "**string**"

**width** = dimensions for width of overlay "**string**"

	$('#elem').modool({
                steps:[{
                    'title':'Testing Overlay 1',
                    'text':{
                        'rbtn':'Create Call Out'
                    },
                    'data':testData,
                    'tmpl':'#testing_template_1',
                    'lbtn_callback':function(){ // additional fn
                        console.log('first callback');
                        $.fn.modool.close();
                    },
                    'tmpl_callback':function(){ // main callback after tmpl loads
                        console.log('first callback');
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
                        $.fn.modool.close();
                    }
                }]
            });
