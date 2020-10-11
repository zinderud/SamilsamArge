using System;
using System.Collections.Generic;
using System.Text;

namespace ArgeBackend.DTO
{
    public class CourseSessionDTO
    {
        public int Id { get; set; }
        public int Capacity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CourseId { get; set; }
    }
}
