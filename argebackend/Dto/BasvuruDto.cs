using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using argebackend.Models;

namespace argebackend.Dto
{
    public class BasvuruDto : BaseModel
    {


        public long BasvuruNo { get; set; }
        public DateTime Tarih { get; set; }
        public string Durum { get; set; }
        public int DurumId { get; set; }
        public int BasvuruTuruId { get; set; }
        public string BasvuruTuru { get; set; }
        public string BasvuruForm { get; set; }



    }
}