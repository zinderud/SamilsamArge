using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Incele : BaseModel
    {

        public long UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public long BasvuruId { get; set; }
        public virtual Basvuru basvuru { get; set; }
        public string Durum { get; set; }
        public string mesaj { get; set; }





    }
}