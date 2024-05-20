using AcademiaFenix.Domain.Constants;

namespace AcademiaFenix.Domain.Exceptions
{
	public class StudentNameMissingException:Exception
    {
        private const string DefaultMessage = DefaultMessages.StudentNameMissing;
        public StudentNameMissingException(string message = DefaultMessage):base(message) { 
        }
    }
}
