using System.Collections.Generic;
using System.Threading.Tasks;
using CES.InfraSecurity.Models;

namespace CES.Domain.Interfaces
{
    public interface IJwtGenerator
    {
        Task<string> CreateTokenAsync(UserEntity userEntity, IList<string> roles);
         bool ValidateToken(string tokenRefresh);
    }
}
