using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Timeline : BaseModel
    {

        public long userId { get; set; }
        public virtual ApplicationUser user { get; set; }
        public long BasvuruId { get; set; }
        public virtual Basvuru basvuru { get; set; }
        public DateTime tarih { get; set; }
        public string durum { get; set; }

        public string not { get; set; }





    }
}