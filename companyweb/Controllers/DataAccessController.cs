using System;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Http;

namespace companyweb.Controllers
{
    [RoutePrefix("api/service")]
    public class DataAccessController : ApiController
    {
        private readonly Models.EFDbContext _db = new Models.EFDbContext();

        [Route("files")]
        public object[] GetImageFiles([FromUri]string code)
        {
            object[] value = null;
            try
            {
                value = (from t in _db.ArticleFiles
                         where t.Articlecode == code && t.Mime.StartsWith("image")
                         select new { title = t.Title, value = t.Name, code = t.Code })
                    .Distinct()
                    .ToArray();
            }
            catch (Exception /*e*/) {
                value = new object[0];
            }

            return value;
        }

        [Route("medias")]
        public object[] GetMediaFiles([FromUri]string code)
        {
            object[] value = null;
            try
            {
                value = (from t in _db.ArticleFiles
                         where t.Articlecode == code && t.Mime.StartsWith("video")
                         select new { text = t.Title, value = t.Code, name = t.Name, mime = t.Mime, Id=t.Id })
                    .Distinct()
                    .ToArray();
            }
            catch (Exception /*e*/)
            {
                value = new object[0];
            }

            return value;
        }

        [Route("add")]
        public IHttpActionResult AddArticle([FromBody]Models.Article article)
        {
            try
            {
                article.Publishstatus = (int)Models.Article.ArticlePublishStatus.Save;
                _db.Articles.Add(article);
                int val = _db.SaveChanges();
            }
            catch (Exception /*e*/) { }

            if (article.IsSingle())
                return RedirectToRoute("Default", new { controller = "Managerment", action = "SingleArticles", cate = article.Category, tag = article.Tag });

            return RedirectToRoute("Default", new { controller = "Managerment", action = "Articles", cate = article.Category });
        }

        [Route("upd")]
        public IHttpActionResult UpdArticle([FromBody]Models.Article article)
        {
            try
            {
                article.Updatetime = DateTime.Now;
                article.Publishstatus = (int)Models.Article.ArticlePublishStatus.Save;
                article.Authenticstatus = Models.Article.GenerateAuthenticstatus(
                    (byte)(
                    Models.Article.ArticleAuthenticstatus.Edit |
                    Models.Article.ArticleAuthenticstatus.Delete |
                    Models.Article.ArticleAuthenticstatus.Review));

                _db.Set<Models.Article>().Attach(article);
                _db.Entry(article).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
            }
            catch (Exception) { }

            if (article.IsSingle())
                return RedirectToRoute("Default", new { controller = "Managerment", action = "SingleArticles", cate = article.Category, tag = article.Tag });

            return RedirectToRoute("Default", new { controller = "Managerment", action = "Articles", cate = article.Category });
        }

        [Route("del")]
        [HttpGet]
        public int[] DelArticles([FromUri]params int[] ids)
        {
            try
            {
                IQueryable<Models.Article> result = _db.Articles.Where(t => ids.Contains(t.Id));
                foreach (Models.Article article in result)
                {
                    article.Publishstatus = (int)Models.Article.ArticlePublishStatus.Deleted;
                }
                _db.SaveChanges();
            }
            catch (Exception) { }
            return ids;
        }

        [Route("apply")]
        [HttpGet]
        public IHttpActionResult ApplyReview(int id, string cate)
        {
            Models.Article article = null;
            try
            {
                article = _db.Articles.SingleOrDefault(t => t.Id == id);
                if (article != null)
                {
                    article.Publishstatus = (int)Models.Article.ArticlePublishStatus.ApplyReview;
                    article.Authenticstatus = Models.Article.GenerateAuthenticstatus(
                        (byte)(
                        Models.Article.ArticleAuthenticstatus.Delete |
                        Models.Article.ArticleAuthenticstatus.Review));

                    _db.SaveChanges();
                }
            }
            catch (Exception) { }

            return RedirectToRoute("Default",
                new { controller = "Managerment", action = "Articles", cate = cate ?? Models.Article.COMPANYCATEGORY });
        }

        [Route("pub")]
        [HttpGet]
        public IHttpActionResult PublishContent(int id, string cate)
        {
            Models.Article article = null;
            try
            {
                article = _db.Articles.SingleOrDefault(t => t.Id == id);
                if (article != null)
                {
                    article.Publishstatus = (int)Models.Article.ArticlePublishStatus.Published;
                    article.Publishtime = DateTime.Now;
                    article.Authenticstatus = Models.Article.GenerateAuthenticstatus(
                        (byte)(Models.Article.ArticleAuthenticstatus.Delete));

                    _db.SaveChanges();
                }
            }
            catch (Exception) { }

            return RedirectToRoute("Default",
                new { controller = "Managerment", action = "Articles", cate = cate ?? Models.Article.COMPANYCATEGORY });
        }

        [Route("unpub")]
        [HttpGet]
        public IHttpActionResult UnPublishContent(int id, string cate)
        {
            Models.Article article = null;
            try
            {
                article = _db.Articles.SingleOrDefault(t => t.Id == id);
                if (article != null)
                {
                    article.Publishstatus = (int)Models.Article.ArticlePublishStatus.UnPublic;
                    article.Authenticstatus = Models.Article.GenerateAuthenticstatus(
                        (byte)(Models.Article.ArticleAuthenticstatus.Delete | Models.Article.ArticleAuthenticstatus.Edit | Models.Article.ArticleAuthenticstatus.Publish));

                    _db.SaveChanges();
                }
            }
            catch (Exception) { }

            return RedirectToRoute("Default",
                new { controller = "Managerment", action = "Articles", cate = cate ?? Models.Article.COMPANYCATEGORY });
        }

        [Route("failed")]
        [HttpGet]
        public IHttpActionResult ReviewFailed(int id)
        {
            Models.Article article = null;
            try
            {
                article = _db.Articles.SingleOrDefault(t => t.Id == id);
                if(article != null)
                {
                    article.Publishstatus = (int)Models.Article.ArticlePublishStatus.ReviewFailed;
                    article.Auditortime = DateTime.Now;
                    article.Authenticstatus = Models.Article.GenerateAuthenticstatus(
                        (byte)(
                        Models.Article.ArticleAuthenticstatus.Edit |
                        Models.Article.ArticleAuthenticstatus.Delete |
                        Models.Article.ArticleAuthenticstatus.Review));

                    _db.SaveChanges();
                }
            }
            catch (Exception) { }

            return RedirectToRoute("Default", new { controller = "Managerment", action = "AuditeContent" });
        }

        [Route("success")]
        [HttpGet]
        public IHttpActionResult ReviewSuccess(int id)
        {
            Models.Article article = null;
            try
            {
                article = _db.Articles.SingleOrDefault(t => t.Id == id);
                if (article != null)
                {
                    article.Publishstatus = (int)Models.Article.ArticlePublishStatus.ReviewSuccess;
                    article.Auditortime = DateTime.Now;
                    article.Authenticstatus = Models.Article.GenerateAuthenticstatus(
                        (byte)(
                        Models.Article.ArticleAuthenticstatus.Edit |
                        Models.Article.ArticleAuthenticstatus.Delete |
                        Models.Article.ArticleAuthenticstatus.Publish));

                    _db.SaveChanges();
                }
            }
            catch (Exception) { }

            return RedirectToRoute("Default", new { controller = "Managerment", action = "AuditeContent" });
        }

        [Route("list")]
        public Models.Article[] GetArticles([FromUri]string cate, [FromUri]int id, [FromUri]int count)
        {
            try
            {
                Models.Article[] data = (from t in _db.Articles
                                         where t.Category.Contains(cate) && t.Id > id && t.Publishstatus != (int)Models.Article.ArticlePublishStatus.Deleted
                                         orderby t.Id ascending, t.Tickcount descending
                                         select t)
                                         .Distinct()
                                         .Take(count)
                                         .ToArray();

                return data;
            }
            catch (Exception /*e*/)
            {
                return new Models.Article[0];
            }
        }

        [Route("listpic")]
        public Models.Article[] GetPicArticles([FromUri]string cate, [FromUri]int id, [FromUri]int count)
        {
            try
            {
                Models.Article[] data = (from t in _db.Articles
                                         where t.Category.Contains(cate) && t.Id > id && t.Publishstatus == (int)Models.Article.ArticlePublishStatus.Published && t.ThumbnailContent != null && t.ThumbnailContent != ""
                                         orderby t.Id ascending, t.Tickcount descending
                                         select t)
                                         .Distinct()
                                         .Take(count)
                                         .ToArray();

                return data;
            }
            catch (Exception /*e*/)
            {
                return new Models.Article[0];
            }
        }

        [Route("audites")]
        public Models.Article[] GetAuditeArticles([FromUri]int id, [FromUri]int count)
        {
            try
            {
                Models.Article[] data = (from t in _db.Articles
                                         where t.Id > id && t.Publishstatus == (int)Models.Article.ArticlePublishStatus.ApplyReview
                                         orderby t.Id ascending, t.Tickcount descending
                                         select t)
                                         .Distinct()
                                         .Take(count)
                                         .ToArray();

                return data;
            }
            catch (Exception /*e*/)
            {
                return new Models.Article[0];
            }
        }

        [Route("query")]
        [HttpGet]
        public Models.Article[] QueryArticles([FromUri]string query, [FromUri]int id, [FromUri]int count)
        {
            System.Threading.Thread.Sleep(500);
            try
            {
                if(string.IsNullOrWhiteSpace(query))
                    return new Models.Article[0];

                string querys = query.Trim();
                Models.Article[] data = (from t in _db.Articles
                                         where t.Id > id && (t.Title.Contains(querys) | t.Contenteditor.Contains(querys))
                                         orderby t.Id ascending, t.Tickcount descending
                                         select t)
                                         .Distinct()
                                         .Take(count)
                                         .ToArray();

                return data;
            }
            catch (Exception /*e*/)
            {
                return new Models.Article[0];
            }
        }

        [Route("tops")]
        [HttpGet]
        public Models.Article[] QueryTopArticles([FromUri]int count)
        {
            try
            {
                Models.Article[] data = (from t in _db.Articles
                                         where t.Topflag == (int)Models.Article.ArticleHomeTopFlag.Yes && t.Publishstatus == (int)Models.Article.ArticlePublishStatus.Published && t.ToppictureContent != null && t.ToppictureContent != ""
                                         orderby t.Id, t.Tickcount descending
                                         select t)
                                         .Distinct()
                                         .Take(count)
                                         .ToArray();

                return data;
            }
            catch (Exception /*e*/)
            {
                return new Models.Article[0];
            }
        }

        [Route("toppros")]
        [HttpGet]
        public Models.Article[] QueryTopProductAndService([FromUri]int count)
        {
            try
            {
                Models.Article[] data = (from t in _db.Articles
                                         where t.Topflag == (int)Models.Article.ArticleHomeTopFlag.Yes && t.Publishstatus == (int)Models.Article.ArticlePublishStatus.Published && t.Category == Models.Article.PRODUCTCATEGORY && t.ThumbnailContent != null && t.ThumbnailContent != ""
                                         orderby t.Id, t.Tickcount descending
                                         select t)
                                         .Distinct()
                                         .Take(count)
                                         .ToArray();
                return data;
            }
            catch (Exception /*e*/)
            {
                return new Models.Article[0];
            }
        }
    }
}
