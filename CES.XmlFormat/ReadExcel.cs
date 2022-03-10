using CES.XmlFormat.Models;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;

//https://github.com/nissl-lab/npoi-examples

namespace CES.XmlFormat
{
    public class ReadExcel
    {
        private List<List<string>> data = new();

        private string AddressDate = "";
        private string AddressNumberList = "";

        private string AddressDriver = "";

        private string AddressHoursWorked = "";

        private string AddressMileageStart = "";
        private string AddressMileageEnd = "";
        private string AddressMileagePerDay = "";

        private string AddressFuelStart = "";
        private string AddressRefueling = "";
        private string AddressActualConsumption = "";
        private string AddressConsumptionAccordingToNorm = "";
        private string AddressFuelEnd = "";

        private string AddressDeviation = "";

        private string EngineHoursStart = "";
        private string EngineHoursEnd = "";

        public IEnumerable<List<string>> readExcel(string nameFile)
        {
            IWorkbook workbook = WorkbookFactory.Create(nameFile);

            WrireAddresses(workbook);


            foreach (IRow row in workbook.GetSheetAt(4))
            {
                var strArr = new List<string>();

                for (var i = 0; i < row.LastCellNum; i++)
                {
                    var cell = row.GetCell(i);
                    if (cell != null)
                    { 
                        var work = new FuelWorkAccountingCard();

                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString()) 
                            && AddressDate[0] == cell.Address.FormatAsString()[0])
                        {
                            work.Date = DateTime.Parse(cell.ToString());
                            continue;
                        }

                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
                            && AddressNumberList[0] == cell.Address.FormatAsString()[0])
                        {
                            work.NumberList = int.Parse(cell.ToString());
                            continue;
                        }
                        
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
                            && AddressDriver[0] == cell.Address.FormatAsString()[0])
                        {
                            var nextAddress = (int.Parse(cell.Address.FormatAsString()[1].ToString()));
                            if(workbook.GetSheetAt(4).GetRow(nextAddress).GetCell(3).ToString() == "")
                            {
                               work.EngineHoursStart  = double.Parse(workbook.GetSheetAt(4).GetRow(nextAddress).GetCell(6).ToString());
                               work.EngineHoursEnd = double.Parse(workbook.GetSheetAt(4).GetRow(nextAddress).GetCell(7).ToString());
                            }
                            work.DriverFullName = cell.ToString();
                            continue;
                        }
                          
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
                            && AddressHoursWorked[0] == cell.Address.FormatAsString()[0])
                        {
                            work.HoursWorked = int.Parse(cell.ToString());
                            continue;
                        }
                          
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
                            && AddressMileageStart[0] == cell.Address.FormatAsString()[0])
                        {
                            work.MileageStart = int.Parse(cell.ToString());
                            continue;
                        }
                          
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString()) 
                            && AddressMileageEnd[0] == cell.Address.FormatAsString()[0])
                        {
                            work.EngineHoursEnd = double.Parse(cell.ToString());
                            continue;
                        }
                                            
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
                            && AddressMileagePerDay[0] == cell.Address.FormatAsString()[0])
                        {
                            work.MileagePerDay = int.Parse(cell.ToString());
                            continue;
                        }
                            
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString()) 
                            && AddressFuelStart[0] == cell.Address.FormatAsString()[0])
                        {
                            work.FuelStart = int.Parse(cell.ToString());
                            continue;
                        }
                            
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString()) 
                            && AddressRefueling[0] == cell.Address.FormatAsString()[0])
                        {
                            work.Refueling = int.Parse(cell.ToString());
                            continue;
                        }             
                    
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString()) 
                            && AddressActualConsumption[0] == cell.Address.FormatAsString()[0])
                        {
                            work.ActualConsumption = int.Parse(cell.ToString());
                            continue;
                        }                       
                     
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString()) 
                            && AddressConsumptionAccordingToNorm[0] == cell.Address.FormatAsString()[0])
                        {
                            work.ConsumptionAccordingToNorm = double.Parse(cell.ToString());
                            continue;
                        }
                                               
                        if (6 < int.Parse(cell.Address.FormatAsString()[1].ToString())
                            && AddressFuelEnd[0] == cell.Address.FormatAsString()[0])
                        {
                            work.FuelEnd = int.Parse(cell.ToString());
                            continue;
                        }

                        strArr.Add(cell.ToString());
                    }
                }
                data.Add(strArr);
            }

            return data;
        }
    
        private void WrireAddresses(IWorkbook workbook) 
        {
            var sheets = workbook.NumberOfSheets;
            for (int i = 0; i < workbook.NumberOfSheets; i++)
            {
                if (null == workbook.GetSheetAt(i)) continue;

                foreach (IRow row in workbook.GetSheetAt(i))
                {
                    for (var j = 0; j < row.LastCellNum; j++)
                    {
                        var cell = row.GetCell(j);
                        if (cell != null)
                        {
                            if (cell.ToString() == "Дата")
                            {
                            AddressDate = cell.Address.FormatAsString();//ToString().Trim().Substring(0, 1);
                            }
                            if (cell.ToString() == "Номер")
                            {
                                AddressNumberList = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            }
                            if (cell.ToString().StartsWith("Водитель"))
                            {
                                AddressDriver = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            }
                            if (cell.ToString() == "часы")
                            {
                                AddressHoursWorked = cell.Address.FormatAsString(); //.ToString().Trim().Substring(0, 1);
                            }
                            if (cell.ToString() == "на начало" && AddressMileageStart == "")
                            {
                                AddressMileageStart = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            }
                            if (cell.ToString() == "на конец" && AddressMileageEnd == "")
                            {
                                AddressMileageEnd = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
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
                                AddressConsumptionAccordingToNorm = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            }
                            if (cell.ToString() == "на конец")
                            {
                                AddressFuelEnd = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            }
                            if (cell.ToString() == "откло-нение")
                            {
                                AddressDeviation = cell.Address.FormatAsString();//.ToString().Trim().Substring(0, 1);
                            }
                        }
                    }
                    if (AddressDate != "" && AddressNumberList != "" && AddressDriver != ""
                        && AddressHoursWorked != "" && AddressMileageStart != ""
                        && AddressMileageEnd != "" && AddressMileagePerDay != ""
                        && AddressFuelStart != "" && AddressRefueling != "" && AddressActualConsumption != ""
                        && AddressConsumptionAccordingToNorm != "" && AddressFuelEnd != ""
                        && AddressDeviation != "")
                    {
                        break;
                    }
                }
            }
        }
    }
}

