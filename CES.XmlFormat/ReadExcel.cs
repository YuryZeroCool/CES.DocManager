using CES.XmlFormat.Models;
using NPOI.SS.UserModel;

namespace CES.XmlFormat
{
    public class ReadExcel
    {
        private readonly IWorkbook _workbook;

        public List<List<FuelWorkAccountingCardEntity>> _SheetsArr;

        private string AddressDate { get; set; }  //Дата

        public string AddressNumberList { get; set; } //Номер путевого листа

        public string AddressDriver { get; set; } // Фамилия

        public string AddressHoursWorked { get; set; } // Часы отработаные 

        public string AddressMileageStart { get; set; } // Показание спидометра  на начало 

        public string AddressMileageEnd { get; set; } // Показание на конец дня

        public string AddressMileagePerDay { get; set; } //Пробег за день

        public string AddressFuelStart { get; set; } // Топливо нам начало 

        public string AddressRefueling { get; set; } // Заправка

        public string AddressActualConsumption { get; set; } // Фактическое потребление топлива

        public string AddressConsumptionAccordingToNorm { get; set; } //Потребление топлива по норме 

        public string AddressFuelEnd { get; set; } // Топливо наконец рабочегог дня 

        public string EngineHoursStart { get; set; } //Старт часов работы двигателя

        public string EngineHoursEnd { get; set; } // Окончание работы двигателя




        
        public IEnumerable<List<FuelWorkAccountingCardEntity>> readExcel()
        {
            List<FuelWorkAccountingCardEntity> rowsArr = null;

            _SheetsArr = new List<List<FuelWorkAccountingCardEntity>>();

            for (int i = 0; i < _workbook.NumberOfSheets; i++)
            {
                var rows = _workbook.GetSheetAt(i);
                if (rows == null || rows.LastRowNum == 0) continue;

                rowsArr = new List<FuelWorkAccountingCardEntity>();

                for (int j = 0; j < rows.LastRowNum; j++)
                {
                    var row = rows.GetRow(j);
                    var isRow = row.GetCell(0).Address.FormatAsString();
                    var cellA = row.GetCell(0).ToString();

                    var result = int.TryParse(cellA, out var number);

                    if (cellA == "ИТОГО") break;

                    if (isRow != null && cellA != "" && result)
                    {
                        var rowNew = new FuelWorkAccountingCardEntity();

                        for (var k = 0; k < row.LastCellNum; k++)
                        {
                            var cell = row.GetCell(k);

                            var cellAdress = cell.Address.FormatAsString();

                            if (cellAdress[0] == AddressDate[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.Date = DateTime.Parse(cell.ToString() + " 0:00:00");
                                continue;
                            }

                            if (AddressNumberList[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.NumberList = int.Parse(cell.ToString());
                                continue;
                            }

                            if (AddressDriver[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                var res = int.TryParse(cellAdress.Substring(1), out var nextAddress);
                                if (!res) continue;

                                if (rows.GetRow(nextAddress).GetCell(6).ToString() != "")
                                {
                                    rowNew.EngineHoursStart = double.Parse(rows.GetRow(nextAddress).GetCell(6).ToString());
                                    rowNew.EngineHoursEnd = double.Parse(rows.GetRow(nextAddress).GetCell(7).ToString());
                                }
                                rowNew.DriverFullName = cell.ToString();
                                continue;
                            }

                            if (AddressMileageStart[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.MileageStart = int.Parse(cell.ToString());
                                continue;
                            }

                            if (AddressMileageEnd[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.EngineHoursEnd = double.Parse(cell.ToString());
                                continue;
                            }

                            if (AddressMileagePerDay[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.MileagePerDay = int.Parse(cell.ToString());
                                continue;
                            }

                            if (AddressFuelStart[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.FuelStart = int.Parse(cell.ToString());
                                continue;
                            }

                            if (AddressRefueling[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.Refueling = double.Parse(cell.ToString());
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
