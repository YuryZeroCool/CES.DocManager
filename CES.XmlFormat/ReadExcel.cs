using CES.XmlFormat.Models;
using System.Collections.Generic;
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


        public ReadExcel() { }

        public ReadExcel(IWorkbook work)
        {
            _workbook = work;
        }

        public ReadExcel(string nameFile)
        {
            _workbook = new DocMangerXMLContext(nameFile).workbook;
            _SheetsArr = new List<List<FuelWorkAccountingCardEntity>>();
        }

        public IEnumerable<List<FuelWorkAccountingCardEntity>> readExcel()
        {
            WrireAddresses();

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

        public bool WrireAddresses()
        {
            ISheet sheet = null;

            for (int i = 0; i < _workbook.NumberOfSheets; i++)
            {
                sheet = _workbook.GetSheetAt(i);
                if (null == sheet)
                {
                    continue;
                }
                else
                {
                    break;
                }
            }

            for (int i = 0; i < sheet.LastRowNum; i++)
            {
                IRow row = sheet.GetRow(i);

                for (int j = 0; j < row.LastCellNum; j++)
                {
                    ICell cell = row.GetCell(j);

                    if (cell != null && cell.ToString() != "")
                    {
                        if (cell.ToString() == "Дата")
                        {
                            AddressDate = cell.Address.FormatAsString();//ToString().Trim().Substring(0, 1)
                            continue;
                        }

                        if (cell.ToString() == "Номер")
                        {
                            AddressNumberList = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            continue;
                        }

                        if (cell.ToString().StartsWith("Водитель 84700"))
                        {
                            AddressDriver = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            continue;
                        }

                        if (cell.ToString() == "на начало" && AddressMileageStart == null)
                        {
                            AddressMileageStart = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            continue;
                        }

                        if (cell.ToString() == "на конец" && AddressMileageEnd == null)
                        {
                            AddressMileageEnd = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            continue;
                        }

                        if (cell.ToString() == "за день")
                        {
                            AddressMileagePerDay = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                        }

                        if (cell.ToString() == "на начало")
                        {
                            AddressFuelStart = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                        }

                        if (cell.ToString() == "Заправка")
                        {
                            AddressRefueling = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                        }

                        if (cell.ToString() == "по факту")
                        {
                            AddressActualConsumption = cell.Address.FormatAsString(); //.ToString().Trim().Substring(0, 1);
                        }

                        if (cell.ToString() == "по нормам")
                        {
                            AddressConsumptionAccordingToNorm = cell.Address.FormatAsString();
                        }

                        if (cell.ToString() == "на конец")
                        {
                            AddressFuelEnd = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                        }
                    }
                }
                if (AddressConsumptionAccordingToNorm is not null)
                {
                    if (CheackAddress()) return true;
                }
            }
            throw new Exception("Файл не того формата");
        }

        private bool CheackAddress()
        {
            if (AddressDate is not null && AddressNumberList is not null && AddressDriver is not null && AddressMileageStart is not null
                && AddressMileageEnd is not null && AddressMileagePerDay is not null && AddressFuelStart is not null
                && AddressRefueling is not null && AddressActualConsumption is not null && AddressConsumptionAccordingToNorm is not null && AddressFuelEnd is not null)
            {
                return true;
            }
            else return false;
        }
    }
}
