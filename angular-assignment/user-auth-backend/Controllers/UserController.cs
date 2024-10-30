using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using user_auth_backend.Models.User;

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

            //HttpContext.Current.Request.Files[0].SaveAs("C:\\Application\\AngularTraining\\angular-assignment\\user-auth-backend\\App_Data\\myfile.png");

            Debug.WriteLine(HttpContext.Current.Request.Files[0].FileName);


            string root = HttpContext.Current.Server.MapPath("~/App_Data");

            var provider = new MultipartFormDataStreamProvider(root);



            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
                string firstName = provider.FormData.GetValues("firstname")?.FirstOrDefault();
                string lastName = provider.FormData.GetValues("lastname")?.FirstOrDefault();
                string username = provider.FormData.GetValues("username")?.FirstOrDefault();
                string email = provider.FormData.GetValues("email")?.FirstOrDefault();
                string password = provider.FormData.GetValues("password")?.FirstOrDefault();
                string dob = provider.FormData.GetValues("dob")?.FirstOrDefault();
                string gender = provider.FormData.GetValues("gender")?.FirstOrDefault();
                string state = provider.FormData.GetValues("state")?.FirstOrDefault();
                string city = provider.FormData.GetValues("city")?.FirstOrDefault();
                string roles = provider.FormData.GetValues("roles")?.FirstOrDefault();
                var profileImage = HttpContext.Current.Request.Files[0]?.FileName;

                if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(dob) || string.IsNullOrEmpty(gender) || string.IsNullOrEmpty(state) || string.IsNullOrEmpty(city) || string.IsNullOrEmpty(roles) || string.IsNullOrEmpty(profileImage))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "All fields are required");
                }

                // all validation here

                UserModel user = new UserModel();
                user.FirstName = firstName;
                user.LastName = lastName;
                user.Username = username;
                user.Email = email;
                user.Password = password;
                if (DateTime.TryParse(dob, out DateTime date))
                {
                    user.Dob = date;
                }
                user.Gender = gender;
                if(Int32.TryParse(state, out int stateId))
                {
                    user.State = stateId;
                }
                if(Int32.TryParse(city, out int cityId))
                {
                    user.City = cityId;
                }

                

                 string[] rolesArr = roles.Split(',');
                Trace.WriteLine(rolesArr.Any((role) => role == "true"));
                user.Roles.ForEach(role =>
                {
                    if (Boolean.TryParse(rolesArr[role.Id-1], out bool value)) { 
                        role.IsSelected = value;
                    }
                });

                user.Roles.ForEach((role) =>
                {
                    Trace.WriteLine(role.Name + " " + role.IsSelected);
                });


                // save image to directory

                //TODO: save data to db

                // Show all the key-value pairs.
                //foreach (var key in provider.FormData.AllKeys)
                //{
                //    foreach (var val in provider.FormData.GetValues(key))
                //    {
                //        Debug.WriteLine(string.Format("{0}: {1}", key, val));
                //    }
                //}



                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
