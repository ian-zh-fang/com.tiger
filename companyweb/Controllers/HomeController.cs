using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace companyweb.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        [AllowAnonymous]
        public ActionResult Index()
        {
            return RedirectToAction("Index", new { controller = "Home", area = "UI" });
        }

        [AllowAnonymous]
        public ActionResult Products()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Casess()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Aboutus()
        {
            return View();
        }
    }
}