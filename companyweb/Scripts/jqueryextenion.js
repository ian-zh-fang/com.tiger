/// <reference path="jquery-1.11.3.js" />

//此处定义扩展jQuery

(function ($) {
    $.fn.confirm = function (opts) {
        var
            defaults = {
                msg: "请输入确认信息 。"
            };

        $.extend(defaults, opts);

        return confirm(defaults.msg);
    };

    $.confirm = $.fn.confirm;
})(jQuery);

(function ($, undefined) {

    var
        tickcount = 0,
        $compnent,
        version = "1.0.0",
        nCombo = function (opts) {

            var
                $this       = $(this),
                position    = $this.position(),
                defaults    = {
                    left: position.left,
                    top: position.top
                };
            tickcount++;
            $compnent       = $this;
            $.extend(defaults, opts);            

            return new nCombo.fn.init(defaults);
        };

    nCombo.fn   = nCombo.prototype = {
        $this:undefined,
        version: version,
        emptyData: [{ text: '请选择', value: '0' }],
        dataType: {
            'array': 'array',
            'ajax': 'ajax'
        },
        enable:false,
        loadState:false,
        init: function (opts) {

            var
                _this = $this = this,
                itemData,
                comboHTML,
                defaults = {
                    width:          300,
                    height:         22,
                    resultHeight:   200,
                    id:             'nComboDataValue',
                    value:          '',
                    text:           '',
                    left:           0,
                    top:            0,
                    data:           [],
                    type:           'array',
                    url:            '',
                    param:          {},
                    onSetValue:     function (data, opts) { },//设置值时触发当前回掉函数
                    dataHandler:    function (data) { return data;}//用户自定义数据处理, 该函数应该返回一个包含数据对象的数组, 数据对象的格式为 {text:string, value:string}
                };

            $.extend(defaults, opts);
            itemData = {
                'id':           defaults.id,
                'value':        defaults.value,
                'text':         defaults.text,
                'height':       defaults.height,
                'width':        defaults.width,
                'buttonWidth':  defaults.height,
                'dataWidth':    defaults.width - defaults.height - 2,
                'resultHeight': defaults.resultHeight,
                'top':          defaults.top + defaults.height,
                'left':         defaults.left,
                'cid':          defaults.cid = tickcount
            };

            defaults.templateHTML = '<div id="nComboContrainer_${cid}" class="nComboContrainer nClear" style=" width:${width}px;">\
                                        <div id="nComboRender_${cid}" class="nComboRender">\
                                            <div id="nComboDataContrainer_${cid}" class="nComboDataContrainer" style="width:${dataWidth}px;">\
                                                <input type="hidden" id="${id}" name="${id}" value="${value}" />\
                                                <div id="nComboDataValueContrainer_${cid}" class="nComboDataValueContrainer" title="${text}" style="height:${height}px; line-height:${height}px;">${text}</div>\
                                            </div>\
                                            <div id="nComboButtonContrainer_${cid}" class="nComboButtonContrainer" style="height:${height}px; line-height:${height}px; width:${buttonWidth}px;">V</div>\
                                        </div>\
                                        <div id="nComboResultContrainer_${cid}" class="nComboResultContrainer" style="max-height:${resultHeight}px; width:${width}px; top:${top}px; left:${left}px;">\
                                        </div>\
                                        <div id="nComboProcess_${cid}" class="nComboProcess" style="width:${width}px; top:${top}px; left:${left}px;">\
                                            <sub class="nComboProcessText">数据加载中, 请稍后</sub>\
                                            <sub class="nComboProcessState"></sub>\
                                        </div>\
                                    </div>';

            comboHTML = defaults.templateHTML;
            for (var d in itemData) {
                comboHTML = comboHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), itemData[d]);
            }

            $compnent.html(comboHTML);
            defaults.id = itemData.cid;
            _this.bindClick(defaults);
        },
        setValue: function (id, data, opts) {

            var
                nComboDataValue = $("div#nComboDataContrainer_" + id + " input[type=hidden]"),
                nComboDataText = $("div#nComboDataValueContrainer_" + id + ""),
                defaults = {
                    onSetValue: function (data, opts) { }//设置值时触发当前回掉函数
                },
                setting = { text: '', value: '' };
            $.extend(setting, data);
            $.extend(defaults, opts);

            defaults.onSetValue(data, opts);

            nComboDataText.attr("title", setting.text);
            nComboDataText.text(setting.text);
            nComboDataValue.val(setting.value);
        },
        loadData: function (opts) {

            var
                setting = { type: 'array' };
            $.extend(setting, opts);

            switch (setting.type)
            {
                case $this.dataType.ajax:
                    $this.getAjaxData(opts);
                    break;
                case $this.dataType.array:
                default:
                    $this.getArrayData(opts);
                    break;
            }
        },
        renderData: function (id, data, opts) {
            //debugger;
            var
                html = '',
                itemHTML = '',
                resultContrainer = $("div#nComboResultContrainer_" + id + ""),
                processContrainer = $("div#nComboProcess_" + id + ""),
                itemData = { 'text': 'text', 'value': 'value' },
                templateHTML = '<div class="nComboResultItem" nValue="${value}" title="${text}">\
                                    <sub>${text}</sub>\
                                </div>';

            $.each(data, function (index, e) {

                $.extend(itemData, e);
                itemHTML = templateHTML;

                for (var d in itemData) {
                    itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), itemData[d]);
                }
                html += itemHTML;
            });

            $this.loadState = false;
            processContrainer.hide();
            resultContrainer.html(html);
            $this.bindItemClick(id, data, opts);
            $this.showOptions(id);
        },
        bindResultContrainerEvent: function (resultContrainer) {
            $(resultContrainer)
                .mouseenter(function () {
                    $this.enable = true;
                })
                .mouseleave(function () {
                    $this.enable = false;
                });
        },
        bindItemClick: function (id, data, opts) {

            var contentitem = $("div.nComboResultItem");
            contentitem
                .click(function () {

                    var
                        _this = $(this),
                        value = _this.attr('nValue'),
                        text = _this.text().trim();

                    $this.setValue(id, { text: text, value: value, result:data }, opts);
                    $this.enable = false;
                    $this.hideOptions(id);
                });
        },
        showOptions: function (id) {

            var resultContrainer = $("div#nComboResultContrainer_" + id + "");

            resultContrainer
                .slideDown(500);

            $this
                .bindResultContrainerEvent(resultContrainer);

            setTimeout(function () {

                $this.hideOptions(id);
            }, 1000);
        },
        hideOptions: function (id) {
            if ($this.enable) {
                setTimeout(function () {
                    $this.hideOptions(id);
                }, 100);
            }
            else {
                var resultContrainer = $("div#nComboResultContrainer_" + id + "");
                resultContrainer.fadeOut(500, function () {
                    resultContrainer.html('');
                });
            }
        },
        bindClick: function (opts) {

            var
                setting = {
                    id: tickcount,
                    type: $this.dataType.array,
                    data: $this.emptyData
                },
                nComboRender,
                resultContrainer,
                processContrainer;

            $.extend(setting, opts);
            nComboRender = $("div#nComboRender_" + setting.id + "");
            resultContrainer = $("div#nComboResultContrainer_" + setting.id + "");
            processContrainer = $("div#nComboProcess_" + setting.id + "");
            
            nComboRender
                .click(function () {

                    processContrainer.show();
                    $this.loadState = true;
                    resultContrainer.fadeIn(500, function () {
                        $this.bindProcessEvent(setting.id, 1, 6);
                        $this.loadData(setting);
                    });
                });
        },
        bindProcessEvent: function (id, c, max) {

            var
                text = '';
                processText = $("div#nComboProcess_" + id + " sub.nComboProcessState");

                
                if (!$this.loadState)
                    return false;

            if (c > max)
                c = 1;

            for (var i = 0; i < c; i++) {
                text += '.';
            }

            $("div#nComboProcess_" + id + " sub.nComboProcessState").text(text);
            
            setTimeout(function () {
                c++;
                $this.bindProcessEvent(id, c, max);
            }, 1000);
        },
        getArrayData: function (opts) {
            
            var setting = { id: tickcount, data: $this.emptyData };
            $.extend(setting, opts);


            if (typeof setting.data === 'undefined')
                return $this.renderData(setting.id, $this.emptyData, opts);

            if (!(setting.data instanceof Array))
                return $this.renderData(setting.id, $this.emptyData, opts);

            if (setting.data.length == 0)
                return $this.renderData(setting.id, $this.emptyData, opts);

            return $this.renderData(setting.id, setting.data, opts);
        },
        getAjaxData: function (opts) {

            var
                setting = {
                    id: tickcount,
                    data: $this.emptyData,
                    url: '',
                    param: {},
                    dataHandler: function (data) { return data; }//用户自定义数据处理, 该函数应该返回一个包含数据对象的数组, 数据对象的格式为 {text:string, value:string}
                };
            $.extend(setting, opts);
            $.getJSON(setting.url, setting.param, function (data) {

                setting.data = setting.dataHandler(data);
                $this.getArrayData(setting);
            });
        }
    };

    nCombo.fn.init.prototype = nCombo.fn;

    $.fn.nCombo = nCombo;

    $.fn.nComboAjax = function (url, opts) {

        var
                $this = $(this),
                position = $this.position(),
                defaults = {
                    url: url,
                    param: {},
                    text: '',
                    value: '',
                    left: position.left,
                    top: position.top
                };
        tickcount++;
        $compnent = $this;
        $.extend(defaults, opts);

        defaults.type = nCombo.fn.dataType.ajax;
        return new nCombo.fn.init(defaults);
    };

})(jQuery);