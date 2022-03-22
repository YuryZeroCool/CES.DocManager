using CES.XmlFormat.Models;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;

//https://github.com/nissl-lab/npoi-examples

namespace CES.XmlFormat
{
    public class ReadExcel
    {
        private int count = 0;
        private readonly IWorkbook _workbook;

        public List<List<FuelWorkAccountingCard>> _SheetsArr;

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
            _SheetsArr = new List<List<FuelWorkAccountingCard>>();
        }

        public IEnumerable<List<FuelWorkAccountingCard>> readExcel()
        {
            var sum = 0;
            WrireAddresses();
            
            List<FuelWorkAccountingCard> rowsArr = null;

            _SheetsArr = new List<List<FuelWorkAccountingCard>>();

            for (int i = 0; i < _workbook.NumberOfSheets; i++)
            {
                rowsArr = new List<FuelWorkAccountingCard>();
                var rows = _workbook.GetSheetAt(i);
                if (rows == null) continue;

                for (int j = 0; j < rows.LastRowNum; j++)
                {
                    var row = rows.GetRow(j);
                    var isRow = row.GetCell(0).Address.FormatAsString();

                    if (isRow != null && isRow != "" && isRow[1] > '6')
                    {
                         var rowNew = new FuelWorkAccountingCard();
                        sum++;
                        for (var k = 0; k < row.LastCellNum; k++)
                        {
                            var cell = row.GetCell(k);
                            var cellAdress = cell.Address.FormatAsString();

                            if (cell != null && cell.ToString() != "" && cellAdress[0] == AddressDate[0] && cellAdress[1] > AddressDate[1])
                            {
                                rowNew.Date = DateTime.Parse(cell.ToString() + " 0:00:00");
                                continue;
                            }

                            if ('6' < cellAdress[1] && AddressNumberList[0] == cellAdress[0])
                            {
                                rowNew.NumberList = int.Parse(cell.ToString());
                                continue;
                            }

                            if ('6' < cellAdress[1] && AddressDriver[0] == cellAdress[0])
                            {
                                var nextAddress = (int.Parse(cellAdress[1].ToString()));
                                var str = rows.GetRow(nextAddress).GetCell(6);
                                if (rows.GetRow(nextAddress).GetCell(6).ToString() != "")
                                {
                                    rowNew.EngineHoursStart = double.Parse(rows.GetRow(nextAddress).GetCell(6).ToString());
                                    rowNew.EngineHoursEnd = double.Parse(rows.GetRow(nextAddress).GetCell(7).ToString());
                                }
                                rowNew.DriverFullName = cell.ToString();
                                continue;
                            }

                            if ('6' < cellAdress[1] && AddressMileageStart[0] == cellAdress[0])
                            {
                                rowNew.MileageStart = int.Parse(cell.ToString());
                                continue;
                            }


                            if ('6' < cellAdress[1] && AddressMileageEnd[0] == cellAdress[0])
                            {
                                rowNew.EngineHoursEnd = double.Parse(cell.ToString());
                                continue;
                            }

                            if ('6' < cellAdress[1] && AddressMileagePerDay[0] == cellAdress[0])
                            {
                                rowNew.MileagePerDay = int.Parse(cell.ToString());
                                continue;
                            }

                            if ('6' < cellAdress[1] && AddressFuelStart[0] == cellAdress[0])
                            {
                                rowNew.FuelStart = int.Parse(cell.ToString());
                                continue;
                            }

                            if ('6' < cellAdress[1] && AddressRefueling[0] == cellAdress[0])
                            {
                                rowNew.Refueling = double.Parse(cell.ToString());
                                continue;
                            }
                        }
                    }
                }


                foreach (IRow row in _workbook.GetSheetAt(0))
                {
                    var rowNew = new FuelWorkAccountingCard();
                    if (row.GetCell(0).ToString() == "ИТОГО")
                    {
                        break;
                    }
                    
                    rowsArr.Add(rowNew);
                }
                _SheetsArr.Add(rowsArr);
                //var date = new List<FuelWorkAccountingCard>();
                //date.Add(new FuelWorkAccountingCard() { DriverFullName = "вы" });
                //_SheetsArr.Add(date);

            }
            return _SheetsArr;

            //// WrireAddresses();

            // for (int j = 0; j < _workbook.NumberOfSheets; j++)
            // {
            //     if (_workbook.GetSheetAt(j) == null) continue;
            //     SheetArr = new List<FuelWorkAccountingCard>();

            //     foreach (IRow row in _workbook.GetSheetAt(j))
            //     {
            //         var 
            //                   work = new FuelWorkAccountingCard();
            //         for (var i = 0; i < row.LastCellNum; i++)
            //         {
            //             var cell = row.GetCell(i);

            //             if (cell.ToString() != null && cell.ToString() != "" && cell.Address.FormatAsString()[1] > '6')
            //             {
            //                 if (cell.ToString() == "ИТОГО")
            //                 {
            //                     return _SheetsArr;
            //                 }
            //                 if (cell != null)
            //                 {
                      
            //                     
            //                     
            //                     
            //                     
            //                     
            //                     
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressActualConsumption[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.ActualConsumption = int.Parse(cell.ToString());
            //                     //    continue;
            //                     //}
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressConsumptionAccordingToNorm[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.ConsumptionAccordingToNorm = double.Parse(cell.ToString());
            //                     //    continue;
            //                     //}
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressFuelEnd[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.FuelEnd = int.Parse(cell.ToString());
            //                     //    continue;
            //                     //}
            //                     if (IsValidModelFuelWorkAccountingCard(work))
            //                     {
            //                         SheetArr.Add(work);
            //                     }
            //                 }
            //             }
            //             else continue;
            //         }
            //     }
            //     _SheetsArr.Add(SheetArr);
            // }
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
                    if (CheackAddress())  return true;
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

//        public bool IsValidModelFuelWorkAccountingCard(FuelWorkAccountingCard work)
//        {
//            if(
//               work.Date.ToLongDateString() != ""
//               && work.Date >= new DateTime(2018, 6, 1)
//                && work.DriverFullName != ""
//                && work.FuelEnd != 0
//                && work.MileageEnd != 0
//                && work.MileagePerDay != 0
//                && work.MileageStart != 0
//                && work.NumberList != 0
//                && work.ConsumptionAccordingToNorm >= 0)
//            {
//                return true;
//            }
//            return false;
//        }

    
//}




