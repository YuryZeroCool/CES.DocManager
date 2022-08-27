using CES.Domain.Models.Request.Report;
using MediatR;

namespace CES.Domain.Handlers.Report
{
    public class UploadingHandler : IRequestHandler<UploadingRequest, int>
    {
        public async Task<int> Handle(UploadingRequest request, CancellationToken cancellationToken)
        {
            try
            {
                DirectoryInfo dirInfo = new(request.Path + "/download");
                foreach (FileInfo file in dirInfo.GetFiles())
                {
                    file.Delete();
                }

                string fileName = String.Format(@"{0}.xls", Guid.NewGuid());

                using (var fileStream = new FileStream(request.Path + "/download/" + fileName, FileMode.Create))
                {
                    await request.Uploading.CopyToAsync(fileStream, cancellationToken);
                }
                return await Task.FromResult(200);
            }
            catch (System.Exception)
            {
                return await Task.FromResult(500);
            }
        }
    }
}
