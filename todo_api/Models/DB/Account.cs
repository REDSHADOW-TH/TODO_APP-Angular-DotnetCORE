using System;
using System.Collections.Generic;

#nullable disable

namespace todo_api.Models.DB
{
    public partial class Account
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
