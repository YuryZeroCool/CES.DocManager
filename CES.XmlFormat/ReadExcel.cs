using CES.XmlFormat.Models;
using NPOI.SS.UserModel;
using static System.Int32;

namespace CES.XmlFormat
{
    public class ReadExcel
    {
        private readonly IWorkbook? _workbook;

        public List<List<FuelWorkAccountingCardEntity>>? _SheetsArr;

        private string? AddressDate { get; set; }  //Дата

        public string? AddressNumberList { get; set; } //Номер путевого листа

        public string? AddressDriver { get; set; } // Фамилия

        public string? AddressHoursWorked { get; set; } // Часы отработаные 

        public string? AddressMileageStart { get; set; } // Показание спидометра  на начало 

        public string? AddressMileageEnd { get; set; } // Показание на конец дня

        public string? AddressMileagePerDay { get; set; } //Пробег за день

        public string? AddressFuelStart { get; set; } // Топливо нам начало 

        public string? AddressRefueling { get; set; } // Заправка

        public string? AddressActualConsumption { get; set; } // Фактическое потребление топлива

        public string? AddressConsumptionAccordingToNorm { get; set; } //Потребление топлива по норме 

        public string? AddressFuelEnd { get; set; } // Топливо наконец рабочегог дня 

        public string? EngineHoursStart { get; set; } //Старт часов работы двигателя

        public string? EngineHoursEnd { get; set; } // Окончание работы двигателя

        public IEnumerable<List<FuelWorkAccountingCardEntity>> ReadExcelDocument()
        {
            _SheetsArr = new List<List<FuelWorkAccountingCardEntity>>();

            if (_workbook == null) throw new SystemException("Упс! Что-то пошло не так");

                for (var i = 0; i < _workbook.NumberOfSheets; i++)
                {
                    var rows = _workbook.GetSheetAt(i);
                    if (rows == null || rows.LastRowNum == 0) continue;

                    var rowsArr = new List<FuelWorkAccountingCardEntity>();

                    for (var j = 0; j < rows.LastRowNum; j++)
                    {
                        var row = rows.GetRow(j);
                        var isRow = row.GetCell(0).Address.FormatAsString();
                        var cellA = row.GetCell(0).ToString();

                        var result = TryParse(cellA, out _);

                        if (cellA == "ИТОГО") break;

                        if (isRow != null && cellA != "" && result)
                        {
                            var rowNew = new FuelWorkAccountingCardEntity();

                            for (var k = 0; k < row.LastCellNum; k++)
                            {
                                var cell = row.GetCell(k);

                                var cellAddress = cell.Address.FormatAsString();

                                if (AddressDate != null && cellAddress[0] == AddressDate[0])
                                {
                                    if (cell.ToString() == "") continue;
                                    rowNew.Date = DateTime.Parse(cell + " 0:00:00");
                                    continue;
                                }

                                if (AddressNumberList != null && AddressNumberList[0] == cellAddress[0])
                                {
                                    if (cell.ToString() == "") continue;
                                    rowNew.NumberList = Parse(cell.ToString() ?? string.Empty);
                                    continue;
                                }

                                if (AddressDriver != null && AddressDriver[0] == cellAddress[0])
                                {
                                    if (cell.ToString() == "") continue;
                                    var res = TryParse(cellAddress[1..], out var nextAddress);
                                    if (!res) continue;

                                    if (rows.GetRow(nextAddress).GetCell(6).ToString() != "")
                                    {
                                        rowNew.EngineHoursStart = double.Parse(rows.GetRow(nextAddress)
                                            .GetCell(6).ToString() ?? string.Empty);
                                        rowNew.EngineHoursEnd = double.Parse(rows.GetRow(nextAddress)
                                            .GetCell(7).ToString() ?? string.Empty);
                                    }

                                    rowNew.DriverFullName = cell.ToString();
                                    continue;
                                }

                                if (AddressMileageStart != null && AddressMileageStart[0] == cellAddress[0])
                                {
                                    if (cell.ToString() == "") continue;
                                    rowNew.MileageStart = Parse(cell.ToString() ?? string.Empty);
                                    continue;
                                }

                                if (AddressMileageEnd != null && AddressMileageEnd[0] == cellAddress[0])
                                {
                                    if (cell.ToString() == "") continue;
                                    rowNew.EngineHoursEnd = double.Parse(cell.ToString() ?? string.Empty);
                                    continue;
                                }

                                if (AddressMileagePerDay != null && AddressMileagePerDay[0] == cellAddress[0])
                                {
                                    if (cell.ToString() == "") continue;
                                    rowNew.MileagePerDay = Parse(cell.ToString() ?? string.Empty);
                                    continue;
                                }

                                if (AddressFuelStart != null && AddressFuelStart[0] == cellAddress[0])
                                {
                                    if (cell.ToString() == "") continue;
                                    rowNew.FuelStart = Parse(cell.ToString() ?? string.Empty);
                                    continue;
                                }

                                if (AddressRefueling != null && AddressRefueling[0] == cellAddress[0])
                                {
                                    if (cell.ToString() == "") continue;
                                    rowNew.Refueling = double.Parse(cell.ToString() ?? string.Empty);
                                    continue;
                                }
                            }

                            rowsArr.Add(rowNew);
                        }
                    }

                    _SheetsArr.Add(rowsArr);
                }

            return _SheetsArr;
        }
    }
}
