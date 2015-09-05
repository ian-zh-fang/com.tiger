using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace companyweb.Controllers
{
    [RoutePrefix("api/service")]
    public class AccountController : ApiController
    {
        [Route("Logon")]
        [AllowAnonymous]
        public IHttpActionResult Logon([FromBody]Models.Account acc)
        {
            return RedirectToRoute("Default", new { controller = "Managerment" });
        }

        [Route("logout")]
        public IHttpActionResult Logout()
        {
            return Ok<bool>(true);
        }
    }
}
