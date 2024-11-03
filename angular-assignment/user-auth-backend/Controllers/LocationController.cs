using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Optimization;
using user_auth_backend.Models.StateCity;
using user_auth_backend.Repository;

namespace user_auth_backend.Controllers
{
    [RoutePrefix("api/v1")]
    public class LocationController : ApiController
    {
        [Authorize]
        [HttpGet]
        [Route("states")]
        public HttpResponseMessage States()
        {
            try
            {
                List<State> states = StateCityRepository.getAllStates();
                return Request.CreateResponse(HttpStatusCode.OK, states);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("citys/{stateId}")]
        public HttpResponseMessage Citys(int stateId)
        {
            try
            {
                List<City> citys = StateCityRepository.getCitysByStateId(stateId);
                return Request.CreateResponse(HttpStatusCode.OK, citys);
            }
            catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
