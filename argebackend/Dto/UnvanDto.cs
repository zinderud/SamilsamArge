using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using argebackend.Models;

namespace argebackend.Dto
{
    public class UnvanDto : BaseModel
    {


        public DateTime Tarih { get; set; }
        public string Acıklama { get; set; }



    }
}