﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace user_auth_backend.Models.Roles
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsSelected { get; set; }
    }
}