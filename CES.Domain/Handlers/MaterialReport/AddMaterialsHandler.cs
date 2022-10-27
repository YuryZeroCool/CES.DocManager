using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;

namespace CES.Domain.Handlers.MaterialReport
{
    public class AddMaterialsHandler : IRequestHandler<AddMaterialReportRequest, Unit>
    {
        private readonly DocMangerContext _ctx;

        private string? NameProduct;

        private bool IsCurrentAccount = false;

        private Stream? fs;

        private IWorkbook? wk;

        public AddMaterialsHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
      
        public async Task<Unit> Handle(AddMaterialReportRequest request, CancellationToken cancellationToken)
        {
       
            int currentRow = 0;
            using (fs = request.File!.OpenReadStream())
            {
                wk = WorkbookFactory.Create(fs);
            }
            await CheckAccountExist(wk);
            for (int i = 0; i < wk.NumberOfSheets; i++) // По страницам
            {
                var sheet = wk.GetSheetAt(i);
                var productGroup = _ctx.ProductsGroupAccount.ToList();
                foreach (var account in productGroup) //прохожу по счетам 
                {
                    account.AccountName = account.AccountName!.Trim();
                    for (int k = currentRow; k < sheet.LastRowNum; k++) // опеределяю количество строк документе 
                    {
                        var cell = sheet.GetRow(k).GetCell(0);

                        if (cell != null)
                        {
                            if (cell.ToString() == account.AccountName)
                            {
                                IsCurrentAccount = true;
                                continue;
                            }
                            if (cell.ToString() != account.AccountName && IsCurrentAccount &&
                                !cell.ToString()!.Equals(""))
                            {
                                IsCurrentAccount = false;
                                currentRow = k;
                                break;
                            }

                            if (IsCurrentAccount)
                            {
                                var sheetUnit = sheet.GetRow(k).GetCell(6);
                                var unit = await _ctx.Units.FirstOrDefaultAsync(p =>
                                    p.Name!.Trim() == sheetUnit.ToString(), cancellationToken);
                                 NameProduct = sheet.GetRow(k).GetCell(1).ToString()!;

                                var products = await  _ctx.Products.Where(x => x.Name == NameProduct)
                                     .Include(p => p.Account).ToListAsync();

                                 if (products.Count == 0)
                                 {
                                    await CheckProductExist(unit, account);
                                 }
                                else
                                {
                                    foreach (var item in products)
                                    {
                                        if (item.ProductGroupAccountId != account.Id)
                                        {
                                            await CheckProductExist(unit, account); //  DELETE FROM Products WHERE ID = 252
                                        }   
                                    }
                                }
                            }
                        }
                        else
                        {
                            if (IsCurrentAccount) // Добовляем партию
                            {
                                if (sheet.GetRow(k).GetCell(2) == null) continue;

                                var currentProduct = await _ctx.Products.FirstOrDefaultAsync(x => x.Name == NameProduct, cancellationToken);

                                var partyArr = sheet.GetRow(k).GetCell(2).ToString()!.Split(" от ");

                                if (!_ctx.Parties.Any(p => p.Name == partyArr[0].Substring(7)))
                                {
                                    await _ctx.Parties.AddAsync(new PartyEntity()
                                    {
                                        Name = partyArr[0][7..],
                                        DateCreated = DateTime.Now,
                                        Count = Double.Parse(sheet.GetRow(k).GetCell(13).ToString()!),
                                        PartyDate = GetDate(partyArr[1]),
                                        Price = decimal.Parse(sheet.GetRow(k).GetCell(5).ToString()!),
                                        Product = currentProduct
                                    },cancellationToken);
                                    await _ctx.SaveChangesAsync(cancellationToken);
                                }
                                else
                                {
                                    var party = await _ctx.Parties.FirstOrDefaultAsync(p =>
                                        p.Name == partyArr[0].Substring(7),cancellationToken);
                                   var countMaterial =  Double.Parse(sheet.GetRow(k).GetCell(13).ToString()!);

                                    if (party!.Count != countMaterial)
                                    {
                                        party.Count = countMaterial;
                                        _ctx.Parties.Update(party);
                                       await _ctx.SaveChangesAsync(cancellationToken);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return await Task.FromResult(new Unit());
        }

        private async Task CheckAccountExist(IWorkbook wk)
        {
            ISheet sheet = wk.GetSheetAt(0);
            for (int i = 0; i < sheet.LastRowNum; i++)
            {
                var cell = sheet.GetRow(i).GetCell(0);
                if (cell == null) continue;
                if (!cell.ToString()!.Equals("") && cell.ToString()!.StartsWith("По счету"))
                {
                    if (!_ctx.ProductsGroupAccount.Any(p => p.AccountName == cell.ToString()))
                    {
                        _ctx.ProductsGroupAccount.Add(new ProductGroupAccountEntity()
                        {
                            AccountName = cell.ToString()
                        });
                    }
                }
            }
            await _ctx.SaveChangesAsync();
        }

        private async Task CheckProductExist(UnitEntity? unit, ProductGroupAccountEntity? account)
        {
            await _ctx.Products.AddAsync(new ProductEntity()
            {
                Name = NameProduct,
                Account = account,
                Unit = unit
            });
            await _ctx.SaveChangesAsync();
        }

        private static DateTime GetDate(string date)
        { 
            var dateArr = date.Split(" ");

           var strDate = dateArr[0].Split(".").Reverse();
           var newDate = String.Join('-', strDate);

           if (dateArr[1].Length != 8) dateArr[1] = "00:00:00";
                
            return DateTime.ParseExact(string.Concat(newDate, "T", dateArr[1]),"s",null);
        }
    }
}
