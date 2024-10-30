using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using user_auth_backend.Models.Roles;
using user_auth_backend.Repository;

namespace user_auth_backend.Controllers
{
    [RoutePrefix("api/v1")]
    public class RolesController : ApiController
    {

        [HttpGet]
        [Route("roles")]
        public HttpResponseMessage GetRoles() {
            try
            {
                List<Role> roles = RoleRepository.getRoles();
                return Request.CreateResponse(HttpStatusCode.OK, roles);
            }
            catch (Exception ex) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
