using AcademiaFenix.Domain.Constants;

namespace AcademiaFenix.Domain.Exceptions
{
	public class StudentNameMissingException:Exception
    {
        private const string DefaultMessage = DefaultMessages.StudantNameMissing;
        public StudentNameMissingException(string message = DefaultMessage):base(message) { 
        }
    }
}
