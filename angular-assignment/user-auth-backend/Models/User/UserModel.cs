using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using user_auth_backend.Models.Roles;

namespace user_auth_backend.Models.User
{
    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime Dob { get; set; }
        public string Gender { get; set; }
        public int State { get; set; }
        public int City { get; set; }
        public string ProfileImage { get; set; }
        public List<Role> Roles { get; set; } = new List<Role>() { new Role()
        {
            Id = 1,
            Name = "admin",
            IsSelected = false
        } , new Role()
        {
             Id = 2,
            Name = "seller",
            IsSelected = false
        }, new Role()
        {
             Id = 3,
            Name = "buyer",
            IsSelected = false
        }
        };
    }
}