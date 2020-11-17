using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Ozgecmis : BaseModel
    {
        public Ozgecmis()
        {
            unvans = new List<Unvan>();
            arastirmas = new List<Arastirma>();
            deneyims = new List<Deneyim>();
            egitims = new List<Egitim>();
        }

        public bool sorumlu { get; set; }
        public string tc { get; set; }
        public string ad { get; set; }
        public string soyad { get; set; }
        public string dogumYeri { get; set; }
        public DateTime dogumTarihi { get; set; }
        public string yabanciDil { get; set; }
        public string eposta { get; set; }
        public List<Unvan> unvans { get; set; }
        public List<Arastirma> arastirmas { get; set; }
        public List<Deneyim> deneyims { get; set; }
        public List<Egitim> egitims { get; set; }





    }
}