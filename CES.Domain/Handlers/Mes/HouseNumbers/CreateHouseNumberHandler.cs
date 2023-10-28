using AutoMapper;
using CES.Domain.Models.Request.Mes.HouseNumbers;
using CES.Domain.Models.Response.Mes.HouseNumbers;
using CES.Domain.Models.Response.Mes.Street;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.Mes.HouseNumbers
{
    public class CreateHouseNumberHandler : IRequestHandler<CreateHouseNumberRequest, CreateHouseNumberResponse>
    {
        private readonly IMapper _mapper;

        private readonly DocMangerContext _ctx;

        public CreateHouseNumberHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<CreateHouseNumberResponse> Handle(CreateHouseNumberRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.HouseNumbers == null)
            {
                throw new System.Exception("Контекст номеров домов не инициализирован.");
            }
            if (request.HouseNumber == null) throw new System.Exception("Номер дома не может быть пустым значением.");

            string trimmedHouseNumbers = request.HouseNumber.Trim();
            if (string.IsNullOrWhiteSpace(trimmedHouseNumbers))
            {
                throw new System.Exception("Номер дома  не может быть пустым значением.");
            }
            if (await _ctx.HouseNumbers.AnyAsync(x => x.Number.Trim() == trimmedHouseNumbers, cancellationToken))
            {
                throw new System.Exception("Такой номер дома уже существует.");
            }
            var addedHouseNumbers = new HouseNumberEntity() { Number = trimmedHouseNumbers };
            await _ctx.HouseNumbers.AddAsync(addedHouseNumbers, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);
            return _mapper.Map<CreateHouseNumberResponse>(addedHouseNumbers);
        }
    }
}
