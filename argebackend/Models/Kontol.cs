using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace argebackend.Models
{
    public class Kontrol : BaseModel
    {



        public long basvuruId { get; set; }
        public virtual Basvuru basvuru { get; set; }
        public long atayanUserId { get; set; }
        public virtual ApplicationUser atayanUser { get; set; }
        public long atananUserId { get; set; }
        public virtual ApplicationUser atananUser { get; set; }
        public DateTime atamaTarih { get; set; }
        public string kontrolDurum { get; set; }
        public string kurumUstYazi { get; set; }
        public string dilekceBasvurusuUygunmu { get; set; }
        public string arastirmaBaslik { get; set; }
        public string arastirmaStatu { get; set; }
        public string arastirmaci { get; set; }
        public string danisman { get; set; }
        public string kurum { get; set; }
        public string arastirmaAmac { get; set; }
        public string arastirmaTuru { get; set; }
        public string arastirmaYeri { get; set; }
        public string arastirmaEvreni { get; set; }
        public string arastirmaHipotez { get; set; }
        public string arastirmaYontem { get; set; }
        public string arastirmaZamanAralik { get; set; }
        public string girisimselUygulama { get; set; }
        public string prospektifmi { get; set; }
        public string arastirmaBilimselYararAciklanmismi { get; set; }
        public string anketSorulariUygunmu { get; set; }
        public string onizinformvarmi { get; set; }
        public string basvuruformvarmi { get; set; }
        public string etikkurulvarmi { get; set; }
        public string bakanlikOnayvarmi { get; set; }
        public string butceFormvarmi { get; set; }
        public string ozgecmisvarmi { get; set; }
        public string kullanilacakevraklarvarmi { get; set; }
        public string ucedetLitaratur { get; set; }
        public string gorusler { get; set; }
        public DateTime kontrolTarih { get; set; }



    }
}