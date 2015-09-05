// 全局函数, 此处不应该和第三方模块有交互。
// 例如jQuery, Extjs等等。

var
    emptyFunc = function () { },
    //将编码模式( 字符串 )内容权限说明符转换成逻辑模式( 布尔值 )权限说明符, 
    //权限编码有四个阿拉伯数字组成的字串, 
    //从左至右分别标识可编辑状态、可删除状态、可审核状态以及可发布状态.
    parseauthenticstatus = function (val) {

        var codes,
            setting = {
                isEdit: false,//可编辑状态: true
                isDelete: false,//可删除状态: true
                isApply: false,//可审核状态: true
                isPublish: false//可发布状态: true
            };

        if (typeof val !== 'string')
            return setting;

        setting.isEdit      = val.charAt(0) === '1';
        setting.isDelete    = val.charAt(1) === '1';
        setting.isApply     = val.charAt(2) === '1';
        setting.isPublish   = val.charAt(3) === '1';

        return setting;
    },
    //验证内容审批权限
    checkeditauthenticstate = function (val) {

        if (!confirm("是否编辑 ?"))
            return false;

        var state = parseauthenticstatus(val);
        if (!state.isEdit) {
            alert('权限不足.');
        }

        return state.isEdit;
    },
    //验证内容申请审批
    checkapplyauthenticstate = function (val) {
        if (!confirm("是否申请审核 ?"))
            return false;

        var state = parseauthenticstatus(val);
        if (!state.isApply)
            alert("权限不足 .");

        return state.isApply;
    },
    //验证内容发布权限
    checkpublishauthenticstate = function (val) {

        if (!confirm("是否发布 ?"))
            return false;

        var state = parseauthenticstatus(val);
        if (!state.isPublish) {
            alert('权限不足.');
        }

        return state.isPublish;
    },
    //验证内容发布权限
    checkunpublishauthenticstate = function (val) {

        if (!confirm("是否撤回发布 ?"))
            return false;

        //var state = parseauthenticstatus(val);
        //if (!state.isPublish) {
        //    alert('权限不足.');
        //}

        //return state.isPublish;
        return true;
    },
    //验证内容通过审批权限
    checkauditeauthenticstate = function (val) {

        if (!confirm("是否通过审批当前内容 ?"))
            return false;

        var state = parseauthenticstatus(val);
        if (!state.isApply) {
            alert('权限不足.');
        }

        return state.isApply;
    },
    //验证内容审批被驳回权限
    checkauditefailedauthenticstate = function (val) {
        if (!confirm("是否驳回 ?"))
            return false;

        var state = parseauthenticstatus(val);
        if (!state.isApply)
            alert('权限不足.');

        return state.isApply;
    },
    //新窗口中打开详细内容
    showarticlecontentbyNewWindow = function (id) {
        
        window.open("/Managerment/Detail/" + id, "_blank");
    };