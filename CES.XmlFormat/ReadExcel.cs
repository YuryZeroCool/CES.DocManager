using CES.XmlFormat.Models;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
//https://github.com/nissl-lab/npoi-examples

namespace CES.XmlFormat
{
    public class ReadExcel
    {
        private readonly IWorkbook _workbook;

        public List<List<FuelWorkAccountingCard>> _SheetsArr;

        public  string AddressDate { get; set; }  //Дата

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

        //public string EngineHoursStart { get; set; } 
        //public string EngineHoursEnd { get; set; } 

        public ReadExcel() { }

        public ReadExcel(IWorkbook work)
        {
            _workbook = work;
        }

        public ReadExcel(string nameFile)
        {
            _workbook = new DocMangerXMLContext(nameFile).workbook;
            _SheetsArr = new List<List<FuelWorkAccountingCard>>();
        }

        public IEnumerable<List<FuelWorkAccountingCard>> readExcel()
        {
            WrireAddresses();
            
            List<FuelWorkAccountingCard> rowsArr = null;
            _SheetsArr = new List<List<FuelWorkAccountingCard>>();

            for (int i = 0; i < _workbook.NumberOfSheets; i++) // Страницы 
            {
                var sheet = _workbook.GetSheetAt(i);

                if (sheet == null) continue;

               // if(sheet.LastRowNum == 0) continue;

                rowsArr = new List<FuelWorkAccountingCard>();

                for (int j = 0; j < sheet.LastRowNum; j++) // Строки 
                {
                    var row = sheet.GetRow(j);
                  
                    if (row == null) continue;
                    if (row.LastCellNum == 0) continue;
                

                  var cellA = row.GetCell(0);
     

                    var cellD = row.GetCell(3);

                    var cellB = row.GetCell(1);

                    if (cellA != null)
                    {
                        if (cellA.ToString() == "ИТОГО") break;
                    }

                    if (cellB == null) continue;
                  
                    var result = int.TryParse(cellB.Address.FormatAsString().Substring(1), out var numberAddress);

                    if (!result) continue;

                    if ( cellD != null && numberAddress > 6)
                    {
                         var rowNew = new FuelWorkAccountingCard();

                        for (var k = 0; k < row.LastCellNum; k++) //Столбцы
                        {
                            var cell = row.GetCell(k);
                            if (cell == null) continue;
                            var cellAdress = cell.Address.FormatAsString();

                            if (!int.TryParse(cellAdress.Substring(1), out var number)) continue;

                            if (number < 6) continue;

                            if (AddressDate[0] == cellAdress[0])
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

                            if ( AddressDriver[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                var res = int.TryParse(cellAdress.Substring(1), out var nextAddress);
                                if (!res) continue;

                                if(sheet.GetRow(nextAddress) != null) 
                                {
                                    if (sheet.GetRow(nextAddress).GetCell(6) != null)
                                    {
                                        rowNew.EngineHoursStart = double.Parse(sheet.GetRow(nextAddress).GetCell(6).ToString());
                                        rowNew.EngineHoursEnd = double.Parse(sheet.GetRow(nextAddress).GetCell(7).ToString());
                                    }
                                }
                               
                                rowNew.DriverFullName = cell.ToString();
                                continue;
                            }

                            if (AddressHoursWorked[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.HoursWorked = int.Parse(cell.ToString());
                                continue;
                            }

                            if ( AddressMileageStart[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.MileageStart = int.Parse(cell.ToString());
                                continue;
                            }

                            if ( AddressMileageEnd[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.MileageEnd = int.Parse(cell.ToString());
                                continue;
                            }

                            if ( AddressMileagePerDay[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.MileagePerDay = int.Parse(cell.ToString());
                                continue;
                            }

                            if ( AddressFuelStart[0] == cellAdress[0])
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

                            if (AddressFuelEnd[0] == cellAdress[0])
                            {
                                if (cell.ToString() == "") continue;
                                rowNew.FuelEnd = int.Parse(cell.ToString());
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

            for (int i = 0; i <= sheet.LastRowNum; i++)
            {
                IRow row = sheet.GetRow(i);

                if (row == null) continue;

                for (int j = 0; j < row.LastCellNum; j++)
                {
                    ICell cell = row.GetCell(j);

                    if (cell != null && cell.ToString() != "")
                    {
                        if (cell.ToString() == "Дата")
                        {
                            AddressDate = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "Номер")
                        {
                            AddressNumberList = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString().StartsWith("Водитель 84700"))
                        {
                            AddressDriver = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString().StartsWith("часы"))
                        {
                            AddressHoursWorked = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "на начало" && AddressMileageStart == null)
                        {
                            AddressMileageStart = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "на конец" && AddressMileageEnd == null)
                        {
                            AddressMileageEnd = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "за день")
                        {
                            AddressMileagePerDay = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "на начало")
                        {
                            AddressFuelStart = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "Заправка")
                        {
                            AddressRefueling = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "по факту")
                        {
                            AddressActualConsumption = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "по нормам")
                        {
                            AddressConsumptionAccordingToNorm = cell.Address.FormatAsString();
                            continue;
                        }

                        if (cell.ToString() == "на конец")
                        {
                            AddressFuelEnd = cell.Address.FormatAsString();
                            continue;
                        }
                    }
                }
                if (AddressConsumptionAccordingToNorm is not null)
                {
                    if (CheackAddress())  return true;
                }
            }
           throw new Exception("Файл не того формата");
        }

        public bool CheackAddress()
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





