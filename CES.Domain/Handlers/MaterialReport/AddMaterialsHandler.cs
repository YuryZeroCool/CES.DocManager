using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Spire.Xls;

namespace CES.Domain.Handlers.MaterialReport
{
    public class AddMaterialsHandler : IRequestHandler<AddMaterialReportRequest, Unit>
    {
        private readonly DocMangerContext _ctx;

        private string? _nameProduct;

        private bool _isCurrentAccount;

        private readonly Workbook _workbook;

        public AddMaterialsHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            _workbook = new Workbook();
            _isCurrentAccount = false;
        }

        public async Task<Unit> Handle(AddMaterialReportRequest request, CancellationToken cancellationToken)
        {
            _workbook.LoadFromStream(request.File!.OpenReadStream());
            var sheet = _workbook.Worksheets[0];
            var currentRow = 0;

            await CreateAccount(sheet);

            var productGroup = await _ctx.ProductsGroupAccount.ToListAsync(cancellationToken);

            foreach (var account in productGroup) //прохожу по счетам 
            {
                for (var k = currentRow; k < sheet.Rows.Length; k++) // опеределяю количество строк документе 
                {
                    var cell = sheet.Rows[k].CellList[0].Text;

                    if (cell != null)
                    {
                        if (cell == account.AccountName)
                        {
                            _isCurrentAccount = true;
                            continue;
                        }
                        if (cell != account.AccountName && _isCurrentAccount)
                        {
                            _isCurrentAccount = false;
                            currentRow = k;
                            break;
                        }
                    }
                    else
                    {
                        if (_isCurrentAccount)
                        {
                            if (sheet.Rows[k].CellList[14].Value == "") continue;

                            if(sheet.Rows[k].CellList[1].Text != null) //Добавляем материал в БД 
                            {
                                var sheetUnit = sheet.Rows[k].CellList[6].Text;
                                
                                _nameProduct = sheet.Rows[k].CellList[1].Text;

                                var products =  await _ctx.Products.
                                        Include(p => p.Account).Where(x => x.Name == _nameProduct).ToListAsync(cancellationToken);

                                if (products == null)
                                {
                                    await CreateProduct(CreateUnit(sheetUnit, cancellationToken).Result, account);
                                }
                                else
                                {
                                    if (!products.Any(x => x.ProductGroupAccountId == account.Id))
                                    {
                                        await CreateProduct(CreateUnit(sheetUnit, cancellationToken).Result, account); //  DELETE FROM Products WHERE ID = 252  DELETE FROM Parties 
                                    }
                                }
                            }
                            else
                            {
                                if (sheet.Rows[k].CellList[2].Text == null) continue;

                                var currentProduct = await _ctx.Products.FirstOrDefaultAsync(p => p.Name == _nameProduct, cancellationToken);

                                var partyArr = sheet.Rows[k].CellList[2].Text.Split(" от ");

                                if (!_ctx.Parties.Any(p => p.Name == partyArr[0].Substring(7)))
                                {
                                    var sum = decimal.Parse(sheet.Rows[k].CellList[14].Value.Replace(" ", ""));

                                    await _ctx.Parties.AddAsync(new PartyEntity()
                                    {
                                        Name = partyArr[0][7..],
                                        DateCreated = DateTime.Now,
                                        Count = double.Parse(sheet.Rows[k].CellList[13].Value),
                                        TotalSum = sum,
                                        PartyDate = GetDate(partyArr[1]),
                                        Price = decimal.Parse(sheet.Rows[k].CellList[5].Value),
                                        Product = currentProduct
                                    }, cancellationToken);
                                    await _ctx.SaveChangesAsync(cancellationToken);
                                }
                                else
                                {
                                    var party = await _ctx.Parties.FirstOrDefaultAsync(p =>
                                        p.Name == partyArr[0].Substring(7), cancellationToken);
                                    if (party == null) throw new System.Exception("Error");

                                    var countMaterial = double.Parse(sheet.Rows[k].CellList[13].Value);
                                    var difference = Math.Abs(party.Count * .00001);

                                    if (Math.Abs(party.Count - countMaterial) <= difference)
                                    {
                                        party.Count = countMaterial;
                                        party.TotalSum = decimal.Parse(sheet.Rows[k].CellList[14].Value);
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

        private async Task CreateAccount(Worksheet sheet)
        {
            for (int i = 0; i < sheet.Rows.Length; i++)
            {
                var cell = sheet.Rows[i].CellList[0].Text;
                if (cell == null) continue;
                if (cell.StartsWith("По счету"))
                {
                    if (!_ctx.ProductsGroupAccount.Any(p => p.AccountName == cell))
                    {
                        _ctx.ProductsGroupAccount.Add(new ProductGroupAccountEntity()
                        {
                            AccountName = cell
                        });
                    }
                }
            }
            await _ctx.SaveChangesAsync();
        }

        private async Task CreateProduct(UnitEntity? unit, ProductGroupAccountEntity? account)
        {
            await _ctx.Products.AddAsync(new ProductEntity()
            {
                Name = _nameProduct,
                Account = account,
                Unit = unit
            });
            await _ctx.SaveChangesAsync();
        }

        private async Task<UnitEntity> CreateUnit(string sheetUnit, CancellationToken cancellationToken)
        {
            var materialUnit = await _ctx.Units.FirstOrDefaultAsync(p => p.Name == sheetUnit, cancellationToken);

             if(materialUnit == null)
             {
               materialUnit = new UnitEntity()
               {
                   Name = sheetUnit,
               };
                await _ctx.Units.AddAsync(materialUnit, cancellationToken);
                await _ctx.SaveChangesAsync(cancellationToken);
             }
            return await Task.FromResult(materialUnit);
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
