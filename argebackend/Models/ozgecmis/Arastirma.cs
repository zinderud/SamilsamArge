using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Arastirma : BaseModel
    {


        public DateTime Tarih { get; set; }
        public string Acıklama { get; set; }



    }
}