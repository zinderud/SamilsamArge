using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class SelectedBasvuru : BaseModel
    {

        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Tc { get; set; }
        public long BasvuruNo { get; set; }
        public DateTime Tarih { get; set; }
        public string Durum { get; set; }
        public int DurumId { get; set; }
        public string BasvuruTuru { get; set; }
        public string BasvuruForm { get; set; }
        public DateTime BasvuruBaslangicTarih { get; set; }
        public DateTime BasvuruBitisTarih { get; set; }


    }
}