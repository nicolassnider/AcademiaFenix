using Microsoft.AspNetCore.Identity;

namespace AcademiaFenix.Domain
{
    public class AppUser:IdentityUser
    {
        public string DisplayName{get;set;}
        public bool IsAdmin{get;set;}
    }
}
