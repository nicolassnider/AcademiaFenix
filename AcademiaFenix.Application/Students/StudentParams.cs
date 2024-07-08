using AcademiaFenix.Application.Core;

namespace AcademiaFenix.Application.Students
{
    public class StudentParams : PagingParams
    {
        public bool IsBlackBelt { get; set; }
        public DateOnly AdmissionDate { get; set; }
    }
}
