using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class UserinRole : BaseModel
    {

        public string UserId { get; set; }  
    public string Username { get; set; }  
    public string Email { get; set; }  
    public string Role { get; set; } 
     public string RoleId { get; set; } 




    }
}