/// <reference path="../jquery-1.11.3.js" />
/// <reference path="../jqueryextenion.js" />
/// <reference path="../uploadify/jquery.uploadify.js" />
/// <reference path="../tinymce/tinymce.js" />
/// <reference path="../globalfuncs.js" />
/// <reference path="../globalvariables.js" />

$(document).ready(function () {

    var
        tinymceEditor,
        selectVedio,
        defaults                    = {comboText:'请选择', comboValue:'0000000000000000000'},
        $doc                        = $(document),
        uploadcontrainer            = $("div#uploadcontrainer"),
        uploadcontrainerfieldset    = uploadcontrainer.children("div#uploadfooter"),
        formeditor                  = $("textarea#contenteditor"),
        uploadify                   = $(":file#tinymceuploadify"),
        uploadofedit                = $("div#uploadofedit"),
        articleuniquecode           = $(":hidden#articleuniquecode"),
        articlecategory             = $(":hidden#articlecategory"),
        formhead                    = $("div#formhead"),
        formfooter                  = $("div#formfooter"),
        formimgupload               = $(":button#formimgupload"),
        topflag                     = $("input[type=checkbox]#topflag"),
        thumbnailcontrainer         = $("div#thumbnailcontrainer"),
        toppicturecontrainer        = $("div#toppicturecontrainer"),
        toppictureContent           = $("input[type=hidden]#toppictureContent"),
        thumbnailContent            = $("input[type=hidden]#thumbnailContent"),
        toppictureName              = $("input[type=hidden]#toppictureName"),
        thumbnailName               = $("input[type=hidden]#thumbnailName"),
        mediasrc                    = $("div#mediasrc"),
        mediabtnok                  = $(":button#mediabtnok"),
        formheadHeight              = formhead.outerHeight(),
        formfooterHeight            = formfooter.outerHeight(),
        contrainerHeight            = uploadcontrainer.innerHeight(),
        fieldsetHeight              = uploadcontrainerfieldset.outerHeight(),
        articlecode                 = articleuniquecode.val()/*文章编号*/,
        articlecate                 = articlecategory.val()/*文章种类*/,
        formcontentHeight           = $doc.innerHeight() - formheadHeight - formfooterHeight - 185,
        loadimgfile                 = function (callback) {
            $.getJSON("/api/service/files", { code: articlecode }, function (data) {
                callback(data);
            });
        },
        setupload = function (filecate, callback) {
            
            if (typeof callback !== 'function')
                callback = emptyFunc;

            filecate = filecate || _normalfile;
            uploadify
            .uploadify({
                'swf': '/scripts/uploadify/uploadify.swf',
                'buttonText': '选择文件',
                'width': 100,
                'height': 26,
                'uploader': '/Managerment/UpFile',
                'formData': { code: articlecode, cate: filecate },
                'auto': true,
                'method': 'POST',
                'onUploadSuccess': callback,
                'onUploadError': function () {

                }
            });
        },
        comboDataHandler = function (data) {
            var result = [];
            $.each(data, function (i, e) {

                result.push({
                    value: e.code,
                    text: e.title,
                    raw: e
                });
            });
            return result;
        };

    uploadofedit
        .outerHeight(contrainerHeight - fieldsetHeight - 25);

    formimgupload
        .click(function () {
            setupload(_imgfile);
            maskshow();
        });

    tinymce
        .init({
            selector: "textarea#contenteditor",
            theme: "modern",
            language: "zh_CN",
            //width: 300,
            height: formcontentHeight,
            plugins: [
                 "advlist autolink lists link image charmap preview code",
                 "searchreplace visualblocks fullscreen",
                 "insertdatetime media table contextmenu paste",
                 "emoticons textcolor"
            ],
            image_list: function (success) {
                //success([
                //    { title: 'My image 1', value: 'http://www.tinymce.com/my1.gif' },
                //    { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
                //]);
                loadimgfile(function (data) {
                    success(data);
                });
            },
            content_css: "css/content.css",
            toolbar1: "undo redo | styleselect | fontselect | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
            toolbar2: "fullscreen preview | forecolor backcolor emoticons | table | link image mymediabtn | mybutton", /*media,*/
            setup: function (editor) {
                editor.addButton('mybutton', {
                    text: '上传文件',
                    icon: 'image',
                    onclick: function () {

                        tinymceEditor = editor;
                        setupload(_imgfile);
                        maskshow();
                    }
                });

                editor.addButton('mymediabtn', {
                    icon: 'media',
                    onclick: function () {
                        tinymceEditor = editor;
                        maskshow('maskshow_another');
                    }
                });
            },
            //TinyMCE 会将所有的 font 元素转换成 span 元素
            convert_fonts_to_spans: true,
            //换行符会被转换成 br 元素
            convert_newlines_to_brs: false,
            //在换行处 TinyMCE 会用 BR 元素而不是插入段落
            force_br_newlines: false,
            //当返回或进入 Mozilla/Firefox 时，这个选项可以打开/关闭段落的建立
            force_p_newlines: false,
            //这个选项控制是否将换行符从输出的 HTML 中去除。选项默认打开，因为许多服务端系统将换行转换成 <br />，因为文本是在无格式的 textarea 中输入的。使用这个选项可以让所有内容在同一行。
            remove_linebreaks: false,
            //不能把这个设置去掉，不然图片路径会出错
            relative_urls: false,
            //不允许拖动大小
            resize: false,
            font_formats: "宋体=宋体;黑体=黑体;仿宋=仿宋;楷体=楷体;隶书=隶书;幼圆=幼圆;Arial=arial,helvetica,sans-serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
            fontsize_formats: "8pt 10pt 12pt 13pt 14pt 16pt 18pt 24pt 36pt"
        });

    if (topflag.val() == 1)
        topflag.attr("checked", true);

    topflag
        .click(function () {

        if (topflag[0].checked)
            topflag.val(1);
        else
            topflag.val(0);
        });

    toppicturecontrainer
        .nComboAjax("/api/service/files", {
            param: { code: articlecode },
            text: toppicturecontrainer.attr('nText') || defaults.comboText,
            value: toppicturecontrainer.attr('nValue') || defaults.comboValue,
            id: 'toppicture',
            dataHandler: comboDataHandler,
            onSetValue: function (data, opts) {

                for (var e, i = 0; i < data.result.length; i++) {
                    e = data.result[i].raw;
                    if (data.value == e.code) {
                        toppictureContent.val(e.value);
                        toppictureName.val(e.title);
                        break;
                    }
                }
            }
        });

    thumbnailcontrainer
        .nComboAjax("/api/service/files", {
            param: { code: articlecode },
            text: thumbnailcontrainer.attr('nText') || defaults.comboText,
            value: thumbnailcontrainer.attr('nValue') || defaults.comboValue,
            id: 'thumbnail',
            dataHandler: comboDataHandler,
            onSetValue: function (data, opts) {

                for (var e, i = 0; i < data.result.length; i++) {
                    e = data.result[i].raw;
                    if (data.value == e.code) {
                        thumbnailContent.val(e.value);
                        thumbnailName.val(e.title);
                        break;
                    }
                }
            }
        });

    mediasrc.nComboAjax("/api/service/medias", {
        param: { code: articlecode },
        text: mediasrc.attr('nText') || defaults.comboText,
        value: mediasrc.attr('nValue') || defaults.comboValue,
        id: 'mediaddr',
        onSetValue: function (data, opts) {
            for (var e, i = 0; i < data.result.length; i++) {
                e = data.result[i];
                if (data.value == e.value) {
                    selectVedio = e;
                    mediasrc.attr('nText', e.text);
                    mediasrc.attr('nValue', e.value);
                    break;
                }
            }
        }
    });

    mediabtnok
        .click(function () {

            var
                mediaobj,
                html,
                mediawidth = parseInt($(":text#mediawidth").val()),
                mediaheight = parseInt($(":text#mediaheight").val()),
                templateHTML = '<video controls="controls" id="video_${Id}" width="${width}" height="${height}">\
                                    <source src="${name}" type="${mime}" />\
                                    浏览器不支持.\
                                  </video>';

            if (!selectVedio) {
                alert('请选择插入的媒体 .');
                return false;
            }

            if (isNaN(mediawidth) || isNaN(mediaheight)) {
                alert('请输入插入媒体的大小 .');
                return false;
            }

            mediaobj = $.extend({}, selectVedio, { width: mediawidth, height: mediaheight });
            html = templateHTML;
            for (var d in mediaobj) {
                html = html.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), mediaobj[d]);
            }
            tinymceEditor.insertContent(html)
            maskhide('maskshow_another');
        });
});