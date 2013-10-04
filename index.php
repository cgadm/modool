<html>
<head>
    <title>Modool</title>
    <script src="http://codeorigin.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="js/jquery.tmpl.min.js"></script>
    <script src="js/su.modool.js"></script>
    <link href="css/su.modool.css" type="text/css" rel="stylesheet" />
</head>
<body>

<a id="overlayDefault" href="javascript:void(0);">Overlay Default</a>

</body>
<script id="modool_tmpl" type="text/x-jquery-tmpl">
    <div id="modool">
        <div id="modool-head" class="centerme clearfix">
            <div id="modool-title">${title}</div>
        </div>
        <div id="modool-body" class="clearfix"></div>
    </div>
</script>

<script id="modool_btn_close_tmpl" type="text/x-jquery-tmpl">
    <a id="modool-close" class="modool-btn modool-btn-left drkgrey" href="javascript:void(0);">${left_btn}</a>
</script>
<script id="modool_btn_action_tmpl" type="text/x-jquery-tmpl">
    <a id="modool-action" class="modool-btn modool-btn-right blue" href="javascript:void(0);">${right_btn}</a>
</script>
<script id="modool_btn_next_tmpl" type="text/x-jquery-tmpl">
    <a id="modool-next" class="modool-btn modool-btn-right grey" href="javascript:void(0);">${right_btn} &raquo;</a>
</script>
<script id="modool_btn_prev_tmpl" type="text/x-jquery-tmpl">
    <a id="modool-prev" class="modool-btn modool-btn-left grey" href="javascript:void(0);">&laquo; ${left_btn}</a>
</script>

<script id="testing_template_1" type="text/x-jquery-tmpl">
    <div id="lws" class="zebra zebraSINGLE clearfix">
        1st SCREEN<br>
        {{each media}}
        <div rel="${this.id}">
            ${this.type} ${this.id}: <a href="${this.url}">${this.title}</a><br>
        </div><br>
        {{/each}}
    </div>
</script>
<script id="testing_template_2" type="text/x-jquery-tmpl">
    <div id="lws" class="zebra zebraSINGLE clearfix">
        2nd SCREEN<br>
        {{each media}}
        <div rel="${this.id}">
            ${this.type} ${this.id}: <a href="${this.url}">${this.title}</a><br>
        </div><br>
        {{/each}}
    </div>
</script>
</html>