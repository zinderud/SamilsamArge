

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class BasvuruTuru : BaseModel
    {

        public string basvuruTuru { get; set; }
        public DateTime basvuruBaslangicTarih { get; set; }
        public DateTime basvuruBitisTarih { get; set; }





    }
}