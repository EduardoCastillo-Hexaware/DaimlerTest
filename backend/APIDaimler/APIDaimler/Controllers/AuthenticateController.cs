using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using APIDaimler.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace APIDaimler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly string _secretKey;
        public readonly usersContext _dbcontext;

        public AuthenticateController(IConfiguration config, usersContext dbcontext) {
            _secretKey = config.GetSection("settings").GetSection("secretkey").ToString();
            _dbcontext = dbcontext;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] User userLogin)
        {
            User user = _dbcontext.Users.Where(u=>
            u.UserName== userLogin.UserName && u.Password== userLogin.Password).FirstOrDefault();

            if (user != null)
            {
                var keyBytes = Encoding.ASCII.GetBytes(_secretKey);
                var claims = new ClaimsIdentity();

                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, userLogin.UserName));

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddMinutes(15),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(keyBytes),
                        SecurityAlgorithms.HmacSha256Signature
                        ),
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

                string tokenCreated = tokenHandler.WriteToken(tokenConfig);

                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = tokenCreated });
            }
            else {
                return StatusCode(StatusCodes.Status200OK, new { message = "Incorrect User Name or Password", response = "" });
            }
        }
    }
}
