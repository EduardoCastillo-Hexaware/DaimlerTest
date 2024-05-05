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
    public class RoleController : ControllerBase
    {
        public readonly usersContext _dbcontext;

        public RoleController(usersContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("getRoles")]
        public IActionResult Get()
        {
            List<Role> roles = new List<Role>();
            try
            {
                roles = _dbcontext.Roles.ToList();
                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = roles });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { message = ex.Message, response = roles });
            }
        }

        [HttpGet]
        [Route("getRole/{id:int}")]
        public IActionResult GetRole(int id)
        {

            Role role = _dbcontext.Roles.Find(id);
            if (role == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new
                {
                    message = "Role was not found with id " + id
                });
            }

            try
            {
                role = _dbcontext.Roles.Where(r => r.Id == id).FirstOrDefault();
                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = role });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { message = ex.Message, response = role });
            }
        }

        [HttpPost]
        [Route("create")]
        public IActionResult createRole([FromBody] Role newRole)
        {

            try
            {
                _dbcontext.Roles.Add(newRole);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, new { message = "Role Created Successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public IActionResult deleteRole(int id)
        {
            Role role = _dbcontext.Roles.Find(id);
            if (role == null) { 
                return StatusCode(StatusCodes.Status400BadRequest, new { 
                message = "Role was not found with id " + id 
            }); }

            try
            {
                _dbcontext.Remove(role);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { message = "Role deleted Successfully" });
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains(
                    "The DELETE statement conflicted with the REFERENCE constraint")) { 
                    return StatusCode(StatusCodes.Status400BadRequest, new { 
                        message = "Unable to Delete Entity, Role to deleted is assgined to some user" 
                    }); 
                }    
                return StatusCode(StatusCodes.Status400BadRequest, new { message = ex.Message });
            }
        }
    }
}
