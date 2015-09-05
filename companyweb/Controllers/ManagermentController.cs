using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace companyweb.Controllers
{
    //[Authorize]
    //[RoutePrefix("main")]
    public class ManagermentController : Controller
    {
        public static readonly string ARTICLECODENAME = "code";
        public static readonly string ARTICLECATENAME = "category";
        public static readonly string ARTICLECONTENT = "context";
        public static readonly string EDITORFORMACTIONNAME = "formaction";

        private string _articleCode = Models.SerializableBasic.CreateEmptyCode(19);
        private string _articleCate = Models.SerializableBasic.CreateEmptyCode(1);
        private string _articleContext = "<div>这是示例内容, 请删除并重新编辑。</div>";

        public ManagermentController()
        {
            ViewData[ARTICLECODENAME] = _articleCode;
            ViewData[ARTICLECATENAME] = _articleCate;
            ViewData[ARTICLECONTENT] = _articleContext;
        }

        // GET: Managerment
        public ActionResult Index()
        {
            return View();
        }

        // 登录
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Logout()
        {
            RedirectToAction("logout", "api/service");
            return RedirectToAction("Login");
        }

        // 内容编辑
        public ActionResult Editor()
        {
            return View();
        }

        // 新增编辑
        public ActionResult Add(string cate/*内容分类*/, string code/*内容编码*/,
            bool single/*独立页面标识, true: 标识独立*/, int tag/*独立页面标识,枚举类:Models.Article.ArticleTag 的一个实例*/)
        {
            Models.Article article = null;
            ViewData[EDITORFORMACTIONNAME] = "upd";
            if (single)
            {
                article = GetSingleArticle(cate, code, tag);
                return View(article);
            }

            //此处重新编辑
            if (!string.IsNullOrWhiteSpace(code))
            {
                Models.EFDbContext db = new Models.EFDbContext();
                article = db.Articles.Single(t => t.Code == code);
                return View(article);
            }

            ViewData[EDITORFORMACTIONNAME] = "add";
            //此处新增
            if (string.IsNullOrWhiteSpace(cate))
                cate = Models.Article.COMPANYCATEGORY;

            article = new Models.Article() { Category = cate };
            return View(article);
        }

        public Models.Article GetSingleArticle(string cate, string code, int tag)
        {
            Models.Article article = null;
            if (!string.IsNullOrWhiteSpace(code))
            {
                Models.EFDbContext db = new Models.EFDbContext();
                article = db.Articles.SingleOrDefault(t => t.Code == code);
            }

            if (article == null)
            {
                ViewData[EDITORFORMACTIONNAME] = "add";
                article = new Models.Article() { Category = cate, Tag = tag };
            }

            return article;
        }

        // 内容列表
        [HttpGet]
        public ActionResult Articles(string cate)
        {
            if (string.IsNullOrWhiteSpace(cate))
                cate = Models.Article.PRODUCTCATEGORY;

            ViewData[ARTICLECATENAME] = cate;
            return View();
        }

        //  单页面内容信息
        [HttpGet]
        public ActionResult SingleArticles(string cate, int tag)
        {
            Models.EFDbContext db = new Models.EFDbContext();
            Models.Article article = db.Articles.SingleOrDefault(t => t.Category == cate && t.Tag == tag);

            if (article == null)
                article = new Models.Article() { Category = cate, Tag = tag };

            return View(article);
        }

        // 详细内容
        [HttpGet]
        public ActionResult Detail(int id)
        {
            Models.EFDbContext db = new Models.EFDbContext();
            Models.Article article = db.Articles.Single(t => t.Id == id);
            return View(article);
        }

        // 产品
        public ActionResult Products()
        {
            return RedirectToAction("Articles", new { cate = Models.Article.PRODUCTCATEGORY });
        }

        // 多媒体
        public ActionResult Medias()
        {
            return RedirectToAction("Articles", new { cate = Models.Article.MULITMEDIACATEGORY });
        }

        // 虚拟现实
        public ActionResult VirtualReality()
        {
            return RedirectToAction("Articles", new { cate = Models.Article.VIRTUALREALITYCATEGORY });
        }

        // 地图导航
        public ActionResult MapNavigation()
        {
            return RedirectToAction("Articles", new { cate = Models.Article.MAPNAVIGATIONCATEGORY });
        }

        // 效果图
        public ActionResult Suppositional()
        {
            return RedirectToAction("Articles", new { cate = Models.Article.SUPPOSITIONALCATEGORY });
        }

        // 案例
        public ActionResult Cassess()
        {
            return RedirectToAction("Articles", new { cate = Models.Article.CASECATEGORY });
        }

        public ActionResult Company()
        {
            return RedirectToAction("Articles", new { cate = Models.Article.COMPANYCATEGORY });
        }

        // 企业简介
        public ActionResult Introduction()
        {
            return RedirectToAction("SingleArticles", 
                new { cate = Models.Article.INTRODUCTIONCATEGORY, tag = (int)Models.Article.ArticleTag.Introduction });
        }

        // 企业文化
        public ActionResult Culture()
        {
            return RedirectToAction("SingleArticles", 
                new { cate = Models.Article.CULTURECATEGORY, tag = (int)Models.Article.ArticleTag.Culture });
        }

        // 重大事项
        public ActionResult Importments()
        {
            return RedirectToAction("Articles", new { cate = Models.Article.IMPORTMENTSCATEGORY });
        }

        // 联系我们
        public ActionResult Contact()
        {
            return RedirectToAction("SingleArticles", 
                new { cate = Models.Article.CONTACTCATEGORY, tag = (int)Models.Article.ArticleTag.Contact });
        }

        // 加入我们
        public ActionResult Joinus()
        {
            return RedirectToAction("SingleArticles", 
                new { cate = Models.Article.JOINUSCATEGORY, tag = (int)Models.Article.ArticleTag.Joinus });
        }

        // 内容审核
        public ActionResult AuditeContent()
        {
            return View();
        }

        // 综合查询
        public ActionResult QueryAt()
        {
            return View();
        }

        // 用户信息
        public ActionResult Userinfo()
        {
            return View();
        }

        // 上传文件
        public JsonResult UpFile(HttpPostedFileBase Filedata, string code, int cate)
        {
            string
                uploadpath = "/Upload/imgs/",
                folder = Server.MapPath("~" + uploadpath),
                filename = Filedata.FileName,
                mime = MimeMapping.GetMimeMapping(filename),
                namenoextension = Path.GetFileNameWithoutExtension(filename);

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            try
            {
                Filedata.SaveAs(folder + "\\" + filename);
                Models.ArticleFile file = new Models.ArticleFile()
                {
                    Articlecode = code,
                    Category = cate,
                    Name = uploadpath + filename,
                    Title = namenoextension,
                    Mime = mime,
                    Desc = namenoextension
                };

                Models.EFDbContext db = new Models.EFDbContext();
                file = db.ArticleFiles.Add(file);
                int ret = db.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(new { flag = false, message = e.Message });
            }

            return Json(new { flag = true });
        }
    }
}