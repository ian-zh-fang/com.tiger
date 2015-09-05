using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace companyweb.Areas.UI.Controllers
{
    public class HomeController : Controller
    {
        public static readonly string CATEGORYNAME = "cate";
        public static readonly string REGIONNAME = "region";
        public static readonly string AREANAME = "areaname";

        // GET: UI/Home
        public ActionResult Index()
        {
            return View();
        }

        // 关于我们
        public ActionResult Aboutus()
        {
            return View();
        }

        // 产品及服务
        public ActionResult ProductAndService()
        {
            return View();
        }

        // 解决方案和案例
        public ActionResult SolutionAndCase()
        {
            return View();
        }

        // 联系我们
        public ActionResult Contact()
        {
            return View();
        }

        // 详细内容
        [HttpGet]
        public ActionResult Detail(int id)
        {
            Models.EFDbContext db = new Models.EFDbContext();
            Models.Article article = db.Articles.Single(t => t.Id == id);
            return View(article);
        }

        // 内容列表
        [HttpGet]
        public ActionResult PicList(string cate)
        {
            if (string.IsNullOrWhiteSpace(cate))
                cate = Models.Article.PRODUCTCATEGORY;

            ViewData[CATEGORYNAME] = cate;
            ViewData[REGIONNAME] = RegionLocation(cate);
            ViewData[AREANAME] = AreaLocation(cate);
            return View();
        }

        private string RegionLocation(string cate)
        {
            if (Models.Article.PRODUCTCATEGORY == cate.Trim())
                return "产品及服务";

            if (Models.Article.MULITMEDIACATEGORY == cate.Trim())
                return "多媒体";

            if (Models.Article.VIRTUALREALITYCATEGORY == cate.Trim())
                return "虚拟现实";

            if (Models.Article.MAPNAVIGATIONCATEGORY == cate.Trim())
                return "地图导航";

            if (Models.Article.SUPPOSITIONALCATEGORY == cate.Trim())
                return "效果图";

            if (Models.Article.CASECATEGORY == cate.Trim())
                return "解决方案及案例";

            return "";
        }

        private string AreaLocation(string cate)
        {
            if (cate.Contains(Models.Article.CASECATEGORY))
                return "解决方案及案例";


            if (cate.Contains(Models.Article.PRODUCTCATEGORY))
                return "产品及服务";

            return "";
        }
    }
}