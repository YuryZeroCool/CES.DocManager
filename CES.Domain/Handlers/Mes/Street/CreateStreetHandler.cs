using AutoMapper;
using CES.Domain.Models.Request.Mes.Street;
using CES.Domain.Models.Response.Mes.Street;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Street
{
    public class CreateStreetHandler : IRequestHandler<CreateStreetRequest, CreateStreetResponse>
    {
        public readonly DocMangerContext _ctx;

        public readonly IMapper _mapper;

        public CreateStreetHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<CreateStreetResponse> Handle(CreateStreetRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.Streets == null)
            {
                throw new System.Exception("Контекст улиц не инициализирован.");
            }
            string trimmedStreet = request.Street.Trim();
            if (string.IsNullOrWhiteSpace(trimmedStreet))
            {
                throw new System.Exception("Название улицы не может быть пустым значением");
            }
            if (await _ctx.Streets.AnyAsync(x => x.Name.Trim() == trimmedStreet, cancellationToken))
            {
                throw new System.Exception("Такая улица уже существует");
            }
            var addedStreet = new StreetEntity() { Name = trimmedStreet };
            await _ctx.Streets.AddAsync(addedStreet, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);
            return _mapper.Map<CreateStreetResponse>(addedStreet);
        }
    }
}
