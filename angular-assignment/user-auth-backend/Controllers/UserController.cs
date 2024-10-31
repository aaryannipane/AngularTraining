using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using user_auth_backend.Models.Roles;
using user_auth_backend.Models.User;
using user_auth_backend.Repository;

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



            Trace.WriteLine(HttpContext.Current.Request.Form["firstname"]);


            try
            {
                string firstName = HttpContext.Current.Request.Form["firstname"];
                string lastName = HttpContext.Current.Request.Form["lastname"];
                string username = HttpContext.Current.Request.Form["username"];
                string email = HttpContext.Current.Request.Form["email"];
                string password = HttpContext.Current.Request.Form["password"];
                string dob = HttpContext.Current.Request.Form["dob"];
                string gender = HttpContext.Current.Request.Form["gender"];
                string state = HttpContext.Current.Request.Form["state"];
                string city = HttpContext.Current.Request.Form["city"];
                string roles = HttpContext.Current.Request.Form["roles"];
                var profileImage = HttpContext.Current.Request.Files[0]?.FileName;

                if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(dob) || string.IsNullOrEmpty(gender) || string.IsNullOrEmpty(state) || string.IsNullOrEmpty(city) || string.IsNullOrEmpty(roles) || string.IsNullOrEmpty(profileImage))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "All fields are required");
                }


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

                List<Role> selectedRoles = JsonConvert.DeserializeObject<List<Role>>(roles);
                user.Roles = selectedRoles;

                string uniqueImgName = Guid.NewGuid().ToString() + "-"+profileImage;

                user.ProfileImage = uniqueImgName;
                // save in db
                (bool isUsernameTaken, bool isEmailTaken, bool isSuccess) = UserRepository.RegisterUser(user);

                if (!isSuccess)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to create user");
                }

                if (isUsernameTaken && isEmailTaken) {
                    return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Username and Email is already taken");
                }

                if (isUsernameTaken)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Username is already taken");
                }

                if (isEmailTaken)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Email is already taken");
                }

                // save file only after success from db
                string imgFolderPath = HttpContext.Current.Server.MapPath("~/Content/Images");
                HttpContext.Current.Request.Files[0].SaveAs(Path.Combine(imgFolderPath, uniqueImgName));

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
