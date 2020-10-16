using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class Person : BaseModel
    {

        ///<summary> isim  </summary>
        public string name { get; set; }

        ///<summary> Soyİsim  </summary>
        public string surname { get; set; }

        ///<summary> Mail Adresi  </summary>
        public string email { get; set; }

        ///<summary> Ünvan  </summary>


        public string title { get; set; }

        ///<summary> telefon  </summary>
        public long? phone { get; set; }

        ///<summary> Birimi  </summary>
        public string unit { get; set; }
        ///<summary> Arşiv durumu  </summary>
        public Boolean? isArchived { get; set; }

        ///<summary> departmentId  </summary>
        public long? departmentId { get; set; }






    }
}