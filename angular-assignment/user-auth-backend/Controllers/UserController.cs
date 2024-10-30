using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace user_auth_backend.Controllers
{
    [RoutePrefix("api/v1")]
    public class UserController : ApiController
    {

        [HttpPost]
        [Route("user")]
        public async Task<HttpResponseMessage> RegisterUser()
        {

            // check all data valid
            // save file 
            // save details in db

            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            HttpContext.Current.Request.Files[0].SaveAs("C:\\Application\\AngularTraining\\angular-assignment\\user-auth-backend\\App_Data\\myfile.png");

            Debug.WriteLine(HttpContext.Current.Request.Files[0].FileName);


            string root = HttpContext.Current.Server.MapPath("~/App_Data");

            var provider = new MultipartFormDataStreamProvider(root);

            //    var task = Request.Content.ReadAsMultipartAsync(provider).
            //ContinueWith<HttpResponseMessage>(t =>
            //{
            //    if (t.IsFaulted || t.IsCanceled)
            //    {
            //        Request.CreateErrorResponse(HttpStatusCode.InternalServerError, t.Exception);
            //    }

            //    // This illustrates how to get the file names.
            //    foreach (MultipartFileData file in provider.FileData)
            //    {
            //        System.IO.File.Move(file.Headers.ContentDisposition.FileName, root+".jpg");
            //        Trace.WriteLine(file.Headers.ContentDisposition.FileName);
            //        Trace.WriteLine("Server file path: " + file.LocalFileName);
            //    }
            //    return Request.CreateResponse(HttpStatusCode.OK);
            //});
            //return Request.CreateResponse(HttpStatusCode.OK);



            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                // Show all the key-value pairs.
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        Debug.WriteLine(string.Format("{0}: {1}", key, val));
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
