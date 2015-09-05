/// <reference path="../jquery-1.11.3.js" />
/// <reference path="../jqueryextenion.js" />
/// <reference path="../globalvariables.js" />

$(document).ready(function () {

    var
        qvalue = '',
        queryvalue = $(":text#queryvalue"),
        queryatbutton = $("div#queryatbutton"),
        listcontrainer = $("div#listcontrainer"),
        listcontentmore = $("div#listcontentmore"),
        listcontentno = $("div#listcontentno"),
        dataloader = function () {
            var
                _this = this;
                _query = '',
                id = 0,
                count = 10,
                renderFunc = function (data) {
                    var
                        html = '',
                        itemHTML = '',
                        templateHTML = '<div class="listitem">\
                                            <div class="querylistitemcontent">\
                                                <a href="/Managerment/Detail/${Id}" target="_blank">${Title}</a>\
                                            </div>\
                                            <sub status="${Category}">${CategoryText}</sub>\
                                            <sub status="${Authenticstatus}">${Publishtext}</sub>\
                                        </div>';
                    $.each(data, function (i, e) {
                        id = e.Id;
                        itemHTML = templateHTML;
                        for (var d in e) {
                            itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), e[d]);
                        }

                        html += itemHTML;
                    });

                    listcontrainer.append(html);

                    if (data.length < count) {
                        listcontentmore.hide();
                        listcontentno.show();
                    }
                },
                loadFunc = function (query) {
                    if (typeof query === "string")
                        _query = query;

                    maskshow()
                    $.getJSON("/api/service/query", { query: _query, id: id, count: count }, function (data) {
                        renderFunc(data);
                        maskhide();
                    });

                    return _this;
                },
                resetId = function () {
                    id = 0;
                    return _this;
                };

                this.load = loadFunc;
                this.reset = resetId;
        },
        loader = new dataloader();

    queryatbutton
        .click(function () {
            listcontrainer.html('');
            qvalue = queryvalue.val();

            loader
                .reset()
                .load(qvalue);
        });
    queryvalue
        .keypress(function (e) {
            if (e.keyCode == 13 && !e.shiftKey) {
                queryatbutton.trigger("click");
            }
        });

    listcontentmore
        .hide()
        .click(loader.load);
});