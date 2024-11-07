using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using Microsoft.IdentityModel.Tokens;
using user_auth_backend.Models;
using user_auth_backend.Models.Roles;
using user_auth_backend.Models.User;
using user_auth_backend.Repository;
using Microsoft.Ajax.Utilities;

namespace user_auth_backend.Controllers
{
    [RoutePrefix("api/v1")]
    public class UserController : ApiController
    {

        [HttpPost]
        [Route("user")]
        public HttpResponseMessage RegisterUser()
        {
            // check all data valid
            // save file 
            // save details in db

            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            //HttpContext.Current.Request.Files[0].SaveAs("C:\\Application\\AngularTraining\\angular-assignment\\user-auth-backend\\App_Data\\myfile.png");




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
                    user.StateId = stateId;
                }
                if(Int32.TryParse(city, out int cityId))
                {
                    user.CityId = cityId;
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

        [HttpPost]
        [Route("login")]
        public HttpResponseMessage Login([FromBody] LoginModel loginData)
        {
            Trace.WriteLine(loginData.usernameEmail);
            try
            {
                UserModel user = UserRepository.GetUserByUsernameEmail(loginData.usernameEmail);
                

                if (user == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid username or email");
                }

                if (user.Password != loginData.password)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Invalid password");
                }
                
                // create jwt token and put it in body to store in local storage
                var token = GenerateJwtToken(user.Username, user.Roles);
                token = EncryptToken(token);
                
                
                return Request.CreateResponse(HttpStatusCode.OK, new {token
                });
                
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("user")]
        public HttpResponseMessage GetUser()
        {
            
            Trace.WriteLine("get username and fetch data of user");
            UserModel user = UserRepository.GetUserByUsernameEmail(User.Identity.Name);


            if (user == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid username");
            }

            return Request.CreateResponse(HttpStatusCode.OK, new {user.FirstName, user.LastName, user.ProfileImage});
        }
        
        private string GenerateJwtToken(string username, List<Role> roles)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(ConfigurationManager.AppSettings["JwtKey"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

   

        private string EncryptToken(string token)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.ASCII.GetBytes("b4G7rXyPz8LwN3KdQs6H2MvZc1TjU9Wh");
                var iv = aes.IV;

                using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                {
                    var tokenBytes = Encoding.UTF8.GetBytes(token);
                    var encryptedBytes = encryptor.TransformFinalBlock(tokenBytes, 0, tokenBytes.Length);
                    
                    var result = new byte[iv.Length + encryptedBytes.Length];
                    Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
                    Buffer.BlockCopy(encryptedBytes, 0, result, iv.Length, encryptedBytes.Length);
                    
                    return Convert.ToBase64String(result);
                }
            }
        }
    }
}
