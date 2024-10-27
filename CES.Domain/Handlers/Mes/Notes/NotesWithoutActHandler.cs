using AutoMapper;
using CES.Domain.Handlers.Comparers;
using CES.Domain.Models.Request.Mes.Notes;
using CES.Domain.Models.Response.Mes.Notes;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Notes
{
    public class NoteWithoutActHandler : IRequestHandler<NotesWithoutActRequest, IEnumerable<NotesWithoutActResponse>>
    {
        private readonly IMapper _mapper;

        private readonly DocMangerContext _ctx;

        public NoteWithoutActHandler(IMapper mapper, DocMangerContext ctx)
        {
            _mapper = mapper;
            _ctx = ctx;
        }

        public async Task<IEnumerable<NotesWithoutActResponse>> Handle(NotesWithoutActRequest request, CancellationToken cancellationToken)
        {
            var s = request.Filter;
            if (_ctx.NoteEntities == null)
            {
                throw new System.Exception("Контекст заявок не инициализирован.");
            }
            // Парсинг даты из запроса
            DateTime minDate = request.Min;
            DateTime maxDate = request.Max;
            request.Limit = 500;
            // Инициализация запроса с фильтрацией по отсутствию "Act"
            var query = _ctx.NoteEntities
                .Include(x => x.Street)
                .Include(x => x.HouseNumber)
                .Include(x => x.Entrance)
                .Where(x => x.Act == null)  // Фильтр по отсутствию акта
                .Where(x => x.Date.Date >= minDate.Date && x.Date.Date <= maxDate.Date);  // Фильтрация по диапазону дат

            // Фильтрация по поисковому значению (если оно указано)
            if (!string.IsNullOrEmpty(request.SearchValue) && !string.IsNullOrEmpty(request.Filter))
            {

                query = request.Filter switch
                {
                    "address" => query = query.Where(x => x.Street != null && x.Street.Name.Contains(request.SearchValue)),
                    "tel" => query = query.Where(x => x.Tel != null && x.Tel.ToUpper().Replace(" ", "").Contains(request.SearchValue.ToUpper().Replace(" ", ""))),
                    "comment" => query = query.Where(x => x.Comment != null && x.Comment.ToUpper().Replace(" ", "").Contains(request.SearchValue.ToUpper().Replace(" ", ""))),
                    _ => query
                };
            }

            // Сортировка
            var comparer = new DateComparer();
            var notes = await query
                .OrderByDescending(x => x.Date)  // Сортировка по дате по убыванию
                .ToListAsync(cancellationToken);

            // Пагинация (если количество записей ограничено)
            var paginatedNotes = notes
                .Skip((request.Page - 1) * request.Limit)  // Пропуск предыдущих страниц
                .Take(request.Limit)                       // Ограничение по количеству записей на странице
                .ToList();

            // Проверка наличия результатов
            if (!paginatedNotes.Any())
            {
                return await Task.FromResult(new List<NotesWithoutActResponse>());
            }

            // Маппинг результатов и возврат
            return await Task.FromResult(_mapper.Map<List<NotesWithoutActResponse>>(paginatedNotes));

            throw new NotImplementedException();
        }
    }
}