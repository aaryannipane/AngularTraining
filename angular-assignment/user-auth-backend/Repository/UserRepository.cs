using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using user_auth_backend.Models.Roles;
using user_auth_backend.Models.User;

namespace user_auth_backend.Repository
{
    public class UserRepository
    {
        private readonly static string _connectionString = ConfigurationManager.ConnectionStrings["userAuth"].ConnectionString;

        public static Tuple<bool, bool, bool> RegisterUser(UserModel user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
                {
                    con.Open();
                    
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("firstname", user.FirstName, DbType.String, ParameterDirection.Input);
                    parameters.Add("lastname", user.LastName, DbType.String, ParameterDirection.Input);
                    parameters.Add("username", user.Username, DbType.String, ParameterDirection.Input);
                    parameters.Add("email", user.Email, DbType.String, ParameterDirection.Input);
                    parameters.Add("password", user.Password, DbType.String, ParameterDirection.Input);
                    parameters.Add("dob", user.Dob, DbType.Date, ParameterDirection.Input);
                    parameters.Add("gender", user.Gender, DbType.String, ParameterDirection.Input);
                    parameters.Add("stateId", user.StateId, DbType.Int32, ParameterDirection.Input);
                    parameters.Add("cityId", user.CityId, DbType.Int32, ParameterDirection.Input);
                    parameters.Add("profileImage", user.ProfileImage, DbType.String, ParameterDirection.Input);

                    // roles
                    DataTable dt = new DataTable();
                    dt.Columns.Add("userId", typeof(int));
                    dt.Columns.Add("roleId", typeof(int));

                    foreach(Role role in user.Roles)
                    {
                        if (role.IsSelected) dt.Rows.Add(0, role.Id);
                    }

                    var tvp = dt.AsTableValuedParameter("dbo.userRoleType");
                    parameters.Add("roles", tvp, direction: ParameterDirection.Input);
                    parameters.Add("isUsernameDuplicate", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    parameters.Add("isEmailDuplicate", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    parameters.Add("isSuccess", dbType: DbType.Boolean, direction: ParameterDirection.Output);


                    
                    con.Execute("spInsertUser", parameters, commandType:CommandType.StoredProcedure);

                    bool isUsernameTaken = parameters.Get<bool>("isUsernameDuplicate");
                    bool isEmailTaken = parameters.Get<bool>("isEmailDuplicate");
                    bool isSuccess = parameters.Get<bool>("isSuccess");

                    return new Tuple<bool, bool, bool>(isUsernameTaken, isEmailTaken, isSuccess);

                }
            }
            catch (Exception ex) {
                throw new Exception("Failed to register user", ex);
            }
        }

        public static UserModel GetUserByUsernameEmail(string usernameEmail)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
                {
                    UserModel user = null;
                    con.Open();
                    con.Query<UserModel, Role, UserModel>("spGetUserByUsernameEmail", (userModel, role) =>
                    {
                        if (user == null)
                        {
                            user = userModel;
                            user.Roles = new List<Role>();
                        }
                        
                        user.Roles.Add(role);
                        
                        return user;
                    }, splitOn:"id", param:new{usernameEmail}, commandType: CommandType.StoredProcedure);
                    // con.Query<UserModel>("spGetUserByUsernameEmail", new {usernameEmail}, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return user;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to get user", ex);
            }
        }
    }
}