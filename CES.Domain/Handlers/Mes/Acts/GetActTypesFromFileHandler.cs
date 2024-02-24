using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class GetActTypesFromFileHandler : IRequestHandler<GetActTypesFromFileRequest, IEnumerable<GetActTypesFromFileResponse>>
    {
        private readonly IWebHostEnvironment _environment;

        private readonly List<GetActTypesFromFileResponse> _actNames;

        public GetActTypesFromFileHandler(IWebHostEnvironment environment) 
        {
            _environment = environment;
            _actNames = new List<GetActTypesFromFileResponse>();
        }

        public async Task<IEnumerable<GetActTypesFromFileResponse>> Handle(GetActTypesFromFileRequest request, CancellationToken cancellationToken)
        {
            var path = Path.Combine(_environment.WebRootPath, "Act");
            if (Directory.Exists(path))
            {
                foreach (var item in Directory.GetFiles(path))
                {
                    if(item is not null) 
                    {
                        var json = JsonConvert.DeserializeObject<GetActTypesFromFileResponse>(await File.ReadAllTextAsync(item, cancellationToken));
                        if (Environment.OSVersion.Platform == PlatformID.Win32NT)
                        {
                            // мы под windows
                            if (json is not null)
                            {
                                json.FileName = item.Split("\\").Last().Split(".").First();
                                _actNames.Add(json);
                            }
                        }
                        else
                        {
                            // мы под Linux
                            if (json is not null)
                            {
                                json.FileName = item.Split("/").Last().Split(".").First();
                                _actNames.Add(json);
                            }
                        }  
                    }              
                }
                return await Task.FromResult(_actNames);
            }
            throw new NotImplementedException();
        }
    }
}