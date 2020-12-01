using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using argebackend.Models;

namespace argebackend.Dto
{
    public class OzgecmisDto : BaseModel
    {
        public long UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public bool Sorumlu { get; set; }
        public string Ad { get; set; }
        public string Soyad { get; set; }
        public string DogumYeri { get; set; }
        public DateTime DogumTarihi { get; set; }
        public string YabanciDil { get; set; }
        public string Eposta { get; set; }
        public string Unvans { get; set; }
        public string Arastirmas { get; set; }
        public string Deneyims { get; set; }
        public string Egitims { get; set; }





    }
}