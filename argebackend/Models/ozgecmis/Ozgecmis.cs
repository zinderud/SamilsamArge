using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Ozgecmis : BaseModel
    {

        public bool Sorumlu { get; set; }
        public string Ad { get; set; }
        public string Soyad { get; set; }
        public string DogumYeri { get; set; }
        public DateTime DogumTarihi { get; set; }
        public string YabanciDil { get; set; }
        public string Eposta { get; set; }
        public List<Unvan> Unvans { get; set; }
        public List<Arastirma> Arastirmas { get; set; }
        public List<Deneyim> Deneyims { get; set; }
        public List<Egitim> Egitims { get; set; }





    }
}