using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using user_auth_backend.Models.Roles;

namespace user_auth_backend.Repository
{
    public class RoleRepository
    {
        private readonly static string _connectionString = ConfigurationManager.ConnectionStrings["userAuth"].ConnectionString;

        public static List<Role> getRoles()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString)) {
                    return con.Query<Role>("spGetAllRoles", commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to get roles", ex);
            }
        }
    }
}