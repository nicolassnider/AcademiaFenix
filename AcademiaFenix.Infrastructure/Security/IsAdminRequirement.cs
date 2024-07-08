
using AcademiaFenix.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace AcademiaFenix.Infrastructure.Security
{
    public class IsAdminRequirement:IAuthorizationRequirement
    {
    }
    public class IsAdminRequirementHandler: AuthorizationHandler<IsAdminRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsAdminRequirementHandler(DataContext dbContext,IHttpContextAccessor httpContextAccessor)
        {
            this._dbContext = dbContext;
            this._httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAdminRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId==null) return Task.CompletedTask;

            var isAdmin = _dbContext.Users.Any(x=>x.Id==userId && x.IsAdmin==true);
            if(isAdmin) context.Succeed(requirement);
            return Task.CompletedTask;            
        }
    }
}
