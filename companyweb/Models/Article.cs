using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;

namespace companyweb.Models
{
    [Serializable]
    public class Article : SerializableBasic
    {
        public static readonly string PRODUCTCATEGORY = "001";
        public static readonly string CASECATEGORY = "002";
        public static readonly string MULITMEDIACATEGORY = "002-1";
        public static readonly string VIRTUALREALITYCATEGORY = "002-2";
        public static readonly string SUPPOSITIONALCATEGORY = "002-3";
        public static readonly string MAPNAVIGATIONCATEGORY = "002-4";
        public static readonly string COMPANYCATEGORY = "003";
        public static readonly string INTRODUCTIONCATEGORY = "003-1";
        public static readonly string CULTURECATEGORY = "003-2";
        public static readonly string IMPORTMENTSCATEGORY = "003-3";
        public static readonly string CONTACTCATEGORY = "003-4";
        public static readonly string JOINUSCATEGORY = "003-5";

        private int _id = 0;
        private string _code = CreateCode();
        private string _title = "请输入内容标题";
        private DateTime _createtime = DateTime.Now;
        private DateTime _updatetime = DateTime.Now;
        private DateTime _publishtime = DateTime.Now;
        private string _authorcode = CreateEmptyCode();
        private string _author = "none";
        private int _publishstatus = (int)ArticlePublishStatus.Creating;
        private string _publishtext = ARTICLEPUBLISHSTATUSTEXTCOLLECTION[ArticlePublishStatus.Creating];
        private string _auditorcode = CreateEmptyCode();
        private string _auditor = "none";
        private DateTime _auditortime = DateTime.Now;
        private string _thumbnail = CreateEmptyCode();
        private string _toppicture = CreateEmptyCode();
        private int _topflag = (int)ArticleHomeTopFlag.No;
        private int _tickcount = 0;
        private int _tag = (int)ArticleTag.Normal;
        private string _context = "<div style=\"color:lightgray;\">没有内容</div>";
        private string _category = CreateEmptyCode(1);
        private string _authenticstatus = GenerateAuthenticstatus((byte)(ArticleAuthenticstatus.Edit | ArticleAuthenticstatus.Delete | ArticleAuthenticstatus.Review));
        private string _thumbnailContent = string.Empty;
        private string _toppictureContent = string.Empty;
        private string _thumbnailname = string.Empty;
        private string _toppicturename = string.Empty;

        public Article() { }

        public Article(SerializationInfo info, StreamingContext context):base(info, context) { }

        //判断当前内容是否为单页列表
        public bool IsSingle()
        {
            ArticleTag tag = (ArticleTag)_tag;

            return
                tag == ArticleTag.Aboutus |
                tag == ArticleTag.Another |
                tag == ArticleTag.Contact |
                tag == ArticleTag.Culture |
                tag == ArticleTag.Introduction |
                tag == ArticleTag.Joinus;
        }

        //文章ID
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        //文章编号. 这是一个19个字符的字节编码
        [Key]
        public string Code
        {
            get { return _code; }
            set { _code = value; }
        }

        //文章标题
        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }

        //文章被保存到数据库中的时刻
        public DateTime Createtime
        {
            get { return _createtime; }
            set { _createtime = value; }
        }

        //文章内容发生变化. 并被重新保存存到数据库中的时刻
        public DateTime Updatetime
        {
            get { return _updatetime; }
            set { _updatetime = value; }
        }

        //文章被审核通过之后. 文章被发布的时刻
        public DateTime Publishtime
        {
            get { return _publishtime; }
            set { _publishtime = value; }
        }

        //文章作者编码
        public string Authorcode
        {
            get { return _authorcode; }
            set { _authorcode = value; }
        }

        //文章作者
        public string Author
        {
            get { return _author; }
            set { _author = value; }
        }

        //文章发布状态。分类: (枚举类: companyweb.Models.Article.ArticlePublishStatus 实例)
        public int Publishstatus
        {
            get { return _publishstatus; }
            set { _publishstatus = value; }
        }

        //文章发布状态说明。分类: (已保存 )(申请审核 )(已审核 )(被驳回 )(已发布 )(删除标记 )
        public string Publishtext
        {
            get {
                return _publishtext
                    = ARTICLEPUBLISHSTATUSTEXTCOLLECTION[(ArticlePublishStatus)Publishstatus];
            }
            set { _publishtext = value; }
        }

        //审核人员标记。例如: 人员名称. 这是一个19个字符组成的编码串
        public string Auditorcode
        {
            get { return _auditorcode; }
            set { _auditorcode = value; }
        }

        //审核员姓名
        public string Auditor
        {
            get { return _auditor; }
            set { _auditor = value; }
        }

        //文章被审核通过的时刻
        public DateTime Auditortime
        {
            get { return _auditortime; }
            set { _auditortime = value; }
        }

        //标识文章的缩略图文件编码.
        public string Thumbnail
        {
            get { return _thumbnail; }
            set { _thumbnail = value; }
        }

        //标识文章的缩略图文件路径
        public string ThumbnailContent
        {
            get { return _thumbnailContent; }
            set { _thumbnailContent = value; }
        }

        //标识文章的缩略图文件名称. 类似文章标题的功能。在需要以图片显示的位置时, 提供文章链接显示
        public string ThumbnailName
        {
            get { return _thumbnailname; }
            set { _thumbnailname = value; }
        }

        //首页顶部广告轮换图片文件编码
        public string Toppicture
        {
            get { return _toppicture; }
            set { _toppicture = value; }
        }

        //首页顶部广告轮换图片文件路径
        public string ToppictureContent
        {
            get { return _toppictureContent; }
            set { _toppictureContent = value; }
        }

        //首页顶部广告轮换图片文件名称
        public string ToppictureName
        {
            get { return _toppicturename; }
            set { _toppicturename = value; }
        }

        //文章置顶标记. (枚举类: companyweb.Models.Article.ArticleHomeTopFlag 实例)
        public int Topflag
        {
            get { return _topflag; }
            set { _topflag = value; }
        }

        //文章被浏览次数
        public int Tickcount
        {
            get { return _tickcount; }
            set { _tickcount = value; }
        }

        //文章标签。(枚举类: companyweb.Models.Article.ArticleTag 实例)
        public int Tag
        {
            get { return _tag; }
            set { _tag = value; }
        }

        //文章正文内容
        public string Contenteditor
        {
            get { return _context; }
            set { _context = value; }
        }

        //文章分类
        public string Category
        {
            get { return _category; }
            set { _category = value; }
        }

        //文章分类描述
        public string CategoryText
        {
            get
            {
                if (PRODUCTCATEGORY == _category.Trim())
                    return "产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品";

                if (MULITMEDIACATEGORY == _category.Trim())
                    return "多媒体";

                if (VIRTUALREALITYCATEGORY == _category.Trim())
                    return "虚拟现实";

                if (SUPPOSITIONALCATEGORY == _category.Trim())
                    return "效果图";

                if (MAPNAVIGATIONCATEGORY == _category.Trim())
                    return "地图导航";

                if (CASECATEGORY == _category.Trim())
                    return "案&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例";

                if (COMPANYCATEGORY == _category.Trim())
                    return "关于塔格";

                if (INTRODUCTIONCATEGORY == _category.Trim())
                    return "企业简介";

                if (CULTURECATEGORY == _category.Trim())
                    return "企业文化";

                if (IMPORTMENTSCATEGORY == _category.Trim())
                    return "重大事项";

                if (CONTACTCATEGORY == _category.Trim())
                    return "联系塔格";

                if (JOINUSCATEGORY == _category.Trim())
                    return "加入塔格";

                return string.Empty;
            }
        }

        //文章授权状态码。
        //该码是一个4个阿拉伯数字组成的字符串, 每一个字符代表文章的状态码, 从低位到高位分别标识可编辑状态、可删除状态、可审核状态以及可发布状态。
        //状态说明: (0: 禁止)(1: 允许)
        public string Authenticstatus
        {
            get { return _authenticstatus; }
            set { _authenticstatus = value; }
        }

        protected override Type myType
        {
            get
            {
                return GetType();
            }
        }

        public enum ArticlePublishStatus : byte
        {
            Save = 0x00,
            ApplyReview = 0x01,
            ReviewSuccess = 0x02,
            ReviewFailed = 0x03,
            Published = 0x04,
            Deleted = 0x05,
            Creating = 0x06,
            UnPublic = 0x07,
        }

        public static readonly Dictionary<ArticlePublishStatus, string>
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION = new Dictionary<ArticlePublishStatus, string>();

        static Article()
        {
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION.Add(ArticlePublishStatus.Save, "已经保存");
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION.Add(ArticlePublishStatus.ApplyReview, "申请审核");
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION.Add(ArticlePublishStatus.ReviewSuccess, "审核通过");
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION.Add(ArticlePublishStatus.ReviewFailed, "审核失败");
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION.Add(ArticlePublishStatus.Published, "已经发布");
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION.Add(ArticlePublishStatus.Deleted, "标记删除");
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION.Add(ArticlePublishStatus.Creating, "正在创建");
            ARTICLEPUBLISHSTATUSTEXTCOLLECTION.Add(ArticlePublishStatus.UnPublic, "撤回发布");
        }
        

        public enum ArticleHomeTopFlag : byte
        {
            No = 0x00,
            Yes = 0x01,
            Another = 0x02,
        }

        public enum ArticleTag : byte
        {
            Normal = 0x00,
            Notice = 0x01,
            Another = 0x02,
            Aboutus = 0x03,
            Introduction = 0x04,
            Culture = 0x05,
            Contact = 0x06,
            Joinus = 0x07,
        }

        //内容权限
        public enum ArticleAuthenticstatus:byte
        {
            Forbidden = 0x00,
            Publish = 0x01,
            Review = 0x02,
            Delete = 0x04,
            Edit = 0x08,
        }

        public static string GenerateAuthenticstatus(byte status)
        {
            string val = string.Empty;
            byte[] state = new byte[4];
            state[0] = (byte)((status & 0x08) >> 3);
            state[1] = (byte)((status & 0x04) >> 2);
            state[2] = (byte)((status & 0x02) >> 1);
            state[3] = (byte)(status & 0x01);

            return (val = string.Join("", state));
        }
    }
}
