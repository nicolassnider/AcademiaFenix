using AcademiaFenix.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademiaFenix.Application.Students
{
    public class StudentCreateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public ColorBelt ColorBelt { get; set; }
        public DanLevel DanLevel { get; set; }
    }
}
