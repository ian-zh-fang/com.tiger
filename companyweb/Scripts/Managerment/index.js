/// <reference path="../jquery-1.10.2.js" />
/// <reference path="../jqueryextenion.js" />
/// <reference path="../globalvariables.js" />

$(document).ready(function () {

    var
        bodyelement             = $(document),
        footer                  = $("div#footerdiv"),
        bodycontrainer          = $("div#bodycontrainer"),
        bodyheader              = $("div#bodyhead"),
        bodyfunc                = $("div#bodyfunc"),
        bodycontent             = $("div#bodycontent"),
        bodysplit               = $("div#bodysplit"),
        headlogo                = $("div#headlogo"),
        headfunc                = $("div#headfunc"),
        funcitems               = $("ul.funcsub li"),
        logoutfunc              = $("a#logout"),
        logoimg                 = $("div#headlogo img"),
        bodyHeight              = bodyelement.innerHeight(),
        bodyWidth               = bodyelement.innerWidth(),
        headHeight              = bodyheader.outerHeight(),
        headWidth               = bodyheader.innerWidth(),
        logoWidth               = headlogo.outerWidth(),
        funcWidth               = bodyfunc.outerWidth(),
        footerHeight            = footer.outerHeight(),
        splitWidth              = bodysplit.outerWidth(),
        bodycontrainerHeight    = bodyHeight - footerHeight - 30,
        bodycontrainerWidth     = bodycontrainer.innerWidth(),
        bodycontentHeight       = bodycontrainerHeight - headHeight;

    headfunc.width(headWidth - logoWidth - 2);

    bodycontrainer
        .height(bodycontrainerHeight);

    bodyfunc
        .height(bodycontentHeight);

    bodysplit
        .height(bodycontentHeight + 2);

    bodycontent
        .width(bodycontrainerWidth - funcWidth - splitWidth - 2)
        .height(bodycontentHeight);

    funcitems
        .click(function () {

            var
                _func       = $(this),
                cssvalue    = '<sub id="_funcitemselector" style="float:right;"> >>>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</sub>',
                val;

            $("sub#_funcitemselector")
                .remove();

            val = _func.html();
            _func
                .html(val + cssvalue);
    });

    logoimg
        .attr("title", _companyname);

    logoutfunc
        .click(function () {
            return logoutfunc
                .confirm({ msg: "是否退出系统 ?" });
    });
});