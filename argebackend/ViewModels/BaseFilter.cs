using System;

namespace argebackend.ViewModels
{
    public class BaseFilter
    {
        public string searchString { get; set; }

    }
    public class BasvuruFilter
    {
        public string searchString { get; set; }
        public string basvuruBitisTarih { get; set; }
        public string BasvuruTuru { get; set; }
        public string UserId { get; set; }

    }
}