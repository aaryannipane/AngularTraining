using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace user_auth_backend.Models.StateCity
{
    public class State
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<City> Cities { get; set; }
        
    }
}