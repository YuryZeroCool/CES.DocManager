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

        public  List<List<FuelWorkAccountingCard>> _SheetsArr;

        public string AddressDate
        {
            private set => AddressDate = " ";
            get
            {
                return AddressDate;
            }
        }

        public string AddressNumberList
        {
            private set => AddressNumberList = "";
            get
            {
                return AddressNumberList;
            }
        }

        public string AddressDriver
        {
            private set => AddressDriver = "";
            get
            {
                return AddressDriver;
            }
        }

        public string AddressHoursWorked
        {
            private set => AddressHoursWorked = "";
            get
            {
                return AddressHoursWorked;
            }
        }

        public string AddressMileageStart
        {
            private set => AddressMileageStart = "";
            get
            {
                return AddressMileageStart;
            }
        }

        public string AddressMileageEnd
        {
            private set => AddressMileageEnd = "";
            get
            {
                return AddressMileageEnd;
            }
        }

        public string AddressMileagePerDay
        {
            private set => AddressMileagePerDay = "";
            get
            {
                return AddressMileagePerDay;
            }
        }

        public string AddressFuelStart {
            private set => AddressFuelStart = "";
            get
            {
                return AddressFuelStart;
            }
        }

        public string AddressRefueling
        {
            private set => AddressRefueling = "";
            get
            {
                return AddressRefueling;
            }
        }

        public string AddressActualConsumption
        {
            private set => AddressActualConsumption = "";
            get
            {    
            return AddressActualConsumption;
            } 
        }

        public string AddressConsumptionAccordingToNorm
        {
            private set => AddressConsumptionAccordingToNorm = "";
            get
            {
                return AddressConsumptionAccordingToNorm;
            }
        }
        
        public string AddressFuelEnd 
        {
            private set => AddressFuelEnd="";
            get
            {
                return AddressFuelEnd;
            }
        }
         
        public string AddressDeviation
        {
            private set => AddressDeviation = " ";
            get
            {
                return AddressDeviation;
            }
        }
      
        public string EngineHoursStart
        {
            private set => EngineHoursEnd = "";
            get
            {
                return EngineHoursEnd;
            }
        }
     
        public string EngineHoursEnd

        {
            private set => EngineHoursEnd = "";
            get
            {
                return EngineHoursEnd;
            }
        }

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
            List<FuelWorkAccountingCard> rowsArr = null;
            _SheetsArr = new List<List<FuelWorkAccountingCard>>();

            for (int j = 0; j < _workbook.NumberOfSheets; j++)
            {
                 rowsArr = new List<FuelWorkAccountingCard>();

                if (_workbook.GetSheetAt(0) == null) continue;

                foreach (IRow row in _workbook.GetSheetAt(0))
                {
                    var rowNew = new FuelWorkAccountingCard();
                    if (row.GetCell(0).ToString() == "ИТОГО")
                    {
                        break;
                    }
                    for (var i = 0; i < row.LastCellNum; i++)
                    {
                        var cell = row.GetCell(i).ToString();

                        if (cell != null && cell.ToString() != "")
                        {
                            rowNew.DriverFullName = "Кикурно" + i.ToString();
                        }
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
            //         var work = new FuelWorkAccountingCard();
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
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressDate[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.Date = DateTime.Parse(cell.ToString() + " 0:00:00");
            //                     //    continue;
            //                     //}
            //                     if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                         && AddressNumberList[0] == cell.Address.FormatAsString()[0])
            //                     {
            //                         work.NumberList = int.Parse(cell.ToString());
            //                         continue;
            //                     }
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressDriver[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    var nextAddress = (int.Parse(cell.Address.FormatAsString()[1].ToString()));
            //                     //    if (_workbook.GetSheetAt(4).GetRow(nextAddress).GetCell(3).BooleanCellValue)
            //                     //    {
            //                     //        work.EngineHoursStart = double.Parse(_workbook.GetSheetAt(4).GetRow(nextAddress).GetCell(6).ToString());
            //                     //        work.EngineHoursEnd = double.Parse(_workbook.GetSheetAt(4).GetRow(nextAddress).GetCell(7).ToString());
            //                     //    }
            //                     //    work.DriverFullName = cell.ToString();
            //                     //    continue;
            //                     //}
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressMileageStart[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.MileageStart = int.Parse(cell.ToString());
            //                     //    continue;
            //                     //}
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressMileageEnd[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.EngineHoursEnd = double.Parse(cell.ToString());
            //                     //    continue;
            //                     //}
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressMileagePerDay[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.MileagePerDay = int.Parse(cell.ToString());
            //                     //    continue;
            //                     //}
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressFuelStart[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.FuelStart = int.Parse(cell.ToString());
            //                     //    continue;
            //                     //}
            //                     //if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
            //                     //    && AddressRefueling[0] == cell.Address.FormatAsString()[0])
            //                     //{
            //                     //    work.Refueling = double.Parse(cell.ToString());
            //                     //    continue;
            //                     //}
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

        //public void WrireAddresses()
        //{
        //    for (int i = 0; i < _workbook.NumberOfSheets; i++)
        //    {
        //        if (null == _workbook.GetSheetAt(i)) continue;

        //        foreach (IRow row in _workbook.GetSheetAt(i))
        //        {
        //            for (var j = 0; j < row.LastCellNum; j++)
        //            {
        //                var cell = row.GetCell(j);
        //                if (cell != null)
        //                {
        //                    if (cell.ToString() == "Дата")
        //                    {
        //                        AddressDate = cell.Address.FormatAsString();//ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "Номер")
        //                    {
        //                        AddressNumberList = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString().StartsWith("Водитель 84700"))
        //                    {
        //                        AddressDriver = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "на начало" && AddressMileageStart == "")
        //                    {
        //                        AddressMileageStart = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "на конец" && AddressMileageEnd == "")
        //                    {
        //                        AddressMileageEnd = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "за день")
        //                    {
        //                        AddressMileagePerDay = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "на начало")
        //                    {
        //                        AddressFuelStart = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "Заправка")
        //                    {
        //                        AddressRefueling = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "по факту")
        //                    {
        //                        AddressActualConsumption = cell.Address.FormatAsString(); //.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "по нормам")
        //                    {
        //                        AddressConsumptionAccordingToNorm = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                    if (cell.ToString() == "на конец")
        //                    {
        //                        AddressFuelEnd = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
        //                    }
        //                }
        //            }
        //            if (IsValidModel()) break;
        //        }
        //    }
        //}

        private bool IsValidModel()
        {
            if (AddressDate != "" && AddressNumberList != "" && AddressDriver != ""
                        && AddressHoursWorked != "" && AddressMileageStart != ""
                        && AddressMileageEnd != "" && AddressMileagePerDay != ""
                        && AddressFuelStart != "" && AddressRefueling != "" && AddressActualConsumption != ""
                        && AddressConsumptionAccordingToNorm != "" && AddressFuelEnd != ""
                        && AddressDeviation != "")
            {
                return true;
            }
            else return false;
        }

        public bool IsValidModelFuelWorkAccountingCard(FuelWorkAccountingCard work)
        {
            if(
               work.Date.ToLongDateString() != ""
               && work.Date >= new DateTime(2018, 6, 1)
                && work.DriverFullName != ""
                && work.FuelEnd != 0
                && work.MileageEnd != 0
                && work.MileagePerDay != 0
                && work.MileageStart != 0
                && work.NumberList != 0
                && work.ConsumptionAccordingToNorm >= 0)
            {
                return true;
            }
            return false;
        }

    }
}


