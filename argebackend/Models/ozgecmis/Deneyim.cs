using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Deneyim : BaseModel
    {

        public long OzgecmisID { get; set; }
        public string icerik { get; set; }

        public DateTime tarih { get; set; }
        public string aciklama { get; set; }




    }
}