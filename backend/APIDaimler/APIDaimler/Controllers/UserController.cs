using APIDaimler.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIDaimler.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace APIDaimler.Controllers
{
    [EnableCors("corsRules")]
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly usersContext _dbcontext;

        public UserController(usersContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("getUsers")]
        public IActionResult Get()
        {
            List<User> users = new List<User>();
            try
            {
                users = _dbcontext.Users.Include(r => r.Role).ToList();
                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = users });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { message = ex.Message, response = users });
            }
            
        }

        [HttpGet]
        [Route("getUser/{id:int}")]
        public IActionResult getUser(int id)
        {
            User user = _dbcontext.Users.Find(id);
            if (user == null) { return BadRequest("User was not found with id " + id); }

            try
            {                
                user = _dbcontext.Users.Include(r => r.Role).Where(u=>u.Id == id).FirstOrDefault();
                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = user });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { message = ex.Message, response = user });
            }
        }

        [HttpPost]
        [Route("create")]
        public IActionResult createUser([FromBody] User newUser) {

            User userExist = _dbcontext.Users.Where(u=>u.UserName == newUser.UserName).FirstOrDefault();

            if (userExist != null) { return BadRequest("User name already exist! " +
                "please try with another user name");}

            try
            {
                _dbcontext.Users.Add(newUser);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, new { message = "User Created Successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest , new { message = ex.Message});
            }
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public IActionResult deleteUser(int id)
        {
            User user = _dbcontext.Users.Find(id);
            if (user == null) { return BadRequest("User was not found with id " + id); }

            if (user.RoleId == 1){ return BadRequest("Cannot Delete an Admin user, " +
                "change the roll of the user and then try to delete it!" ); 
            }

            try
            {
                _dbcontext.Remove(user);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { message = "User deleted Successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("edit")]
        public IActionResult editUser([FromBody] User userToEdit)
        {

            User user = _dbcontext.Users.Find(userToEdit.Id);
            if (user == null) { return BadRequest("User was not found with id " + userToEdit.Id); }

            try
            {
                user.Password = userToEdit.Password;
                user.RoleId = userToEdit.RoleId;
                
                _dbcontext.Update(user);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, new { message = "User Updated Successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { message = ex.Message });
            }
        }
    }
}
