using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class BasvuruForm : BaseModel
    {


        public long FormNo { get; set; }
        public DateTime Tarih { get; set; }
        public string Detay { get; set; }
        public long BasvuruId { get; set; }
        public Basvuru Basvuru { get; set; }



    }
}