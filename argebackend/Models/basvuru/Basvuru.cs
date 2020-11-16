using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Basvuru : BaseModel
    {


        public long BasvuruNo { get; set; }
        public DateTime Tarih { get; set; }
        public string Durum { get; set; }
        public int DurumId { get; set; }
        public int BasvuruTuruId { get; set; }
        public string BasvuruTuru { get; set; }
        public BasvuruForm BasvuruForm { get; set; }



    }
}