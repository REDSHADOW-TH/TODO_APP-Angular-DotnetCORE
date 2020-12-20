using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using todo_api.Models.DB;

namespace todo_api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private todo_dbContext _context = new todo_dbContext();

        [HttpGet]
        [Route("login")]
        public IActionResult Login(string user, string password) {
            bool query = _context.Accounts
                                .Where(i => i.Username == user && i.Password == password)
                                .ToList()
                                .Count() > 0;
            if (query) {
                return Ok(new { status = 200, message = "Login success." });
            } else {
                return Ok(new { status = 404, message = "Username or password not found." });
            }
        }

        [HttpGet]
        [Route("register")]
        public IActionResult Register(string user, string password) {
            bool checkExists = _context.Accounts.Where(i => i.Username == user)
                            .ToList()
                            .Count() > 0;
            if (checkExists) {
                return Ok(new { status = 401, message=$"{user} is exists." });
            } else {
                try {
                    _context.Accounts.Add(new Account() {
                        Username = user, Password = password
                    });
                    _context.SaveChanges();
                    return Ok(new { status = 200, message = "Register Success" });
                } catch {
                    return Ok(new { status = 500, message = "Register fail server is error" });
                }
            }
            
        }

    }
}

