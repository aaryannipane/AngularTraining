using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using user_auth_backend.Models.StateCity;

namespace user_auth_backend.Repository
{
    public class StateCityRepository
    {
        private readonly static string _connectionString = ConfigurationManager.ConnectionStrings["userAuth"].ConnectionString;

        public static List<State> getAllStates()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
                {
                    con.Open();
                    return con.Query<State>("spGetState", commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Failed to get states", ex);
            }
        }

        public static List<City> getCitysByStateId(int stateId) {
            try
            {
                using (SqlConnection con = new SqlConnection(_connectionString))
                {
                    con.Open();
                    return con.Query<City>("spGetCityByStateId", new {stateId}, commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Failed to get citys", ex);
            }
        }
    }
}