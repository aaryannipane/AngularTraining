using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace user_auth_backend.Models.StateCity
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string StateId { get; set; }
        public State State { get; set; }
    }
}