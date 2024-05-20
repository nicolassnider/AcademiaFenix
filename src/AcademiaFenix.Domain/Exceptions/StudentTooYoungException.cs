using AcademiaFenix.Domain.Constants;

namespace AcademiaFenix.Domain;

public class StudentLessThanFiveYearsOldException : Exception
{
    private const string DefaultMessage = DefaultMessages.StudentNameMissing;

    public StudentLessThanFiveYearsOldException(string message = DefaultMessage)
        : base(message) { }
}
