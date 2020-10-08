using ArgeBackend.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArgeBackend.DTO
{
    public class CourseFieldDTO
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int FieldId { get; set; }
    }
}
