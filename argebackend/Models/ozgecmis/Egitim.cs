using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Egitim : BaseModel
    {

        public string icerik { get; set; }

        public DateTime tarih { get; set; }
        public string acıklama { get; set; }



    }
}