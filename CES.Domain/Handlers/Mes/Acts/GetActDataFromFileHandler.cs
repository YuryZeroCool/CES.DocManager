using CES.Domain.Models.Request.Mes.Acts;
using MediatR;
using Microsoft.AspNetCore.Hosting;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class GetActDataFromFileHandler : IRequestHandler<GetActDataFromFileRequest, string>
    {
        private readonly IWebHostEnvironment _environment;

        public GetActDataFromFileHandler(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        
        public async Task<string> Handle(GetActDataFromFileRequest request, CancellationToken cancellationToken)
        {
            var path = Path.Combine(_environment.WebRootPath, "Act", request.FileName+".json");

            if (File.Exists(path))
            {
                var json = await File.ReadAllTextAsync(path, cancellationToken);
                if (json is not null)  return await Task.FromResult(json);
            }
            throw new NotImplementedException();
        }
    }
}
