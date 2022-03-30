using Microsoft.VisualStudio.TestTools.UnitTesting;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CES.XmlFormat.Tests
{
    [TestClass()]
    public class ReadExcelTests
    {
        int length;
        private IWorkbook _workbook = null;

        private List<string> Date = new List<string>();
        private List<int> NumberList = new List<int>();
        private List<string> DriverFullName = new();

        private List<int> HoursWorked = new List<int>();

        private List<int> MileageStart = new List<int>();
        private List<int> MileageEnd = new List<int>();
        private List<int> MileagePerDay = new List<int>();

        private List<int> FuelStart = new List<int>();
        private List<int> FuelEnd = new List<int>();
        private List<double> Refueling = new List<double>();
        private List<int> ActualConsumption = new List<int>();
        private List<double> ConsumptionAccordingToNorm = new List<double>();

        private List<double> EngineHoursStart = new List<double>();
        private List<double> EngineHoursEnd = new List<double>();

        [TestInitialize]
        public void ReadExceltTestInitialize()
        {
            _workbook =  new XSSFWorkbook();
            var random = new Random();
            ISheet sheets = null;

            for (int i = 0; i < 1; i++)
            {
                sheets = _workbook.CreateSheet(i.ToString());
                CreateHeader(sheets);
                CreateBody(sheets);
                CreateFooter(sheets);              
            }
        }

        [TestMethod()]
        public void HeaderTest()
        {
            var sheet = _workbook.GetSheetAt(0);

            var row4 = sheet.GetRow(3);
            var row5 = sheet.GetRow(4);
            var row6 = sheet.GetRow(5);

            Assert.AreEqual("B4", row4.GetCell(1).Address.FormatAsString()); //Дата
            Assert.AreEqual("C4", row4.GetCell(2).Address.FormatAsString()); //Номер путевого листа
            Assert.AreEqual("D4", row4.GetCell(3).Address.FormatAsString()); // Фамилия
            Assert.AreEqual("E5", row5.GetCell(4).Address.FormatAsString()); // Часы отработаные 
            Assert.AreEqual("G5", row5.GetCell(6).Address.FormatAsString());  // Показание спидометра  на начало 
            Assert.AreEqual("H5", row5.GetCell(7).Address.FormatAsString()); // Показание на конец дня
            Assert.AreEqual("I5", row5.GetCell(8).Address.FormatAsString());//Пробег за день
            Assert.AreEqual("K5", row5.GetCell(10).Address.FormatAsString()); // Топливо нам начало 
            Assert.AreEqual("L5", row5.GetCell(11).Address.FormatAsString()); // Заправка
            Assert.AreEqual("M6", row6.GetCell(12).Address.FormatAsString()); // Фактическое потребление топлива
            Assert.AreEqual("N6", row6.GetCell(13).Address.FormatAsString()); //Потребление топлива по норме
            Assert.AreEqual("O5", row5.GetCell(14).Address.FormatAsString()); // Топливо наконец рабочегог дня

            Assert.AreEqual("Дата", row4.GetCell(1).ToString()); //Дата
            Assert.AreEqual("Номер", row4.GetCell(2).ToString()); //Номер путевого листа
            Assert.AreEqual("Водитель 84700", row4.GetCell(3).ToString()); // Фамилия
            Assert.AreEqual("часы", row5.GetCell(4).ToString()); // Часы отработаные 
            Assert.AreEqual("на начало", row5.GetCell(6).ToString());  // Показание спидометра  на начало 
            Assert.AreEqual("на конец", row5.GetCell(7).ToString()); // Показание на конец дня
            Assert.AreEqual("за день", row5.GetCell(8).ToString());//Пробег за день
            Assert.AreEqual("на начало", row5.GetCell(10).ToString()); // Топливо нам начало 
            Assert.AreEqual("Заправка", row5.GetCell(11).ToString()); // Заправка
            Assert.AreEqual("по факту", row6.GetCell(12).ToString()); // Фактическое потребление топлива
            Assert.AreEqual("по нормам", row6.GetCell(13).ToString()); //Потребление топлива по норме
            Assert.AreEqual("на конец", row5.GetCell(14).ToString()); // Топливо наконец рабочегог дня
        }

        [TestMethod]
        public void BodyTest()
        {
            var sheetGet = _workbook.GetSheetAt(0);
            new ReadExcel(_workbook).WrireAddresses();

            Assert.AreEqual("B7", sheetGet.GetRow(6).GetCell(1).Address.FormatAsString());
            Assert.AreEqual("C7", sheetGet.GetRow(6).GetCell(2).Address.FormatAsString());
            Assert.AreEqual("D7", sheetGet.GetRow(6).GetCell(3).Address.FormatAsString());

            Assert.AreEqual("E7", sheetGet.GetRow(6).GetCell(4).Address.FormatAsString());

            Assert.AreEqual("G7", sheetGet.GetRow(6).GetCell(6).Address.FormatAsString());
            Assert.AreEqual("H7", sheetGet.GetRow(6).GetCell(7).Address.FormatAsString());
            Assert.AreEqual("I7", sheetGet.GetRow(6).GetCell(8).Address.FormatAsString());

            Assert.AreEqual("K7", sheetGet.GetRow(6).GetCell(10).Address.FormatAsString());
            Assert.AreEqual("L7", sheetGet.GetRow(6).GetCell(11).Address.FormatAsString());
            Assert.AreEqual("M7", sheetGet.GetRow(6).GetCell(12).Address.FormatAsString());
            Assert.AreEqual("N7", sheetGet.GetRow(6).GetCell(13).Address.FormatAsString());
            Assert.AreEqual("O7", sheetGet.GetRow(6).GetCell(14).Address.FormatAsString());
        }

        [TestMethod]
        public void FooterTest()
        {
            var sheet = _workbook.GetSheetAt(0);
            bool isValide = false;
            foreach (IRow row in sheet)
            {
           
                if (row != null)
                {
                    foreach (ICell cell in row)
                    {
                        if (cell != null)
                        {
                            if (cell.Address.FormatAsString()[0] == 'A')
                            {
                                if (cell.ToString() == "ИТОГО") isValide = true;
                            }
                        }
                    }
                }
            }
            Assert.IsTrue(isValide);
        }

        [TestMethod()]
        public void ReadExcelofMazTest()
        {


            //Assert.AreEqual("A46", sheetGet.GetRow(45).GetCell(0).Address.FormatAsString());

            //Assert.AreEqual("ИТОГО", sheetGet.GetRow(45).GetCell(0).ToString());


            //Assert.AreEqual(resArr.ToList()[0][5].Date.ToShortDateString(), "06.02.2022"); /*1 Дата*/
            //Assert.AreEqual(1268952, 0); /*2 Номер*/
            //Assert.AreEqual(0, 0); /*3 Водитель*/

            //Assert.AreEqual(216, 0); /*4 Часы*/

            //Assert.AreEqual(432133, 0); /*5 на начало пробег*/
            //Assert.AreEqual(432644, 0); /*6 на конец пробег*/
            //Assert.AreEqual(511, 0); /*7 за день пробег*/

            //Assert.AreEqual(977, 0); /*8 на начало топливо*/
            //Assert.AreEqual(730, 0); /*9 заправка*/
            //// Assert.AreEqual(715, 0); /*10 по факту топливо*/
            ////Assert.AreEqual(716.3, 0); /*11 по нормам топлива*/
            //Assert.AreEqual(992, 0); /*12 на конец топливо*/

            //Assert.AreEqual(18287, 0); /*13 моточасы на начало*/
            //Assert.AreEqual(18330, 0); /*14 моточасы на конец*/
        }

        [TestMethod()]
        public void ReadExcelTest()
        {
            ReadExcel excel = new ReadExcel(_workbook);
            int sumNumberList = 0;
            int HoursWorked = 0;

            int MileageStart = 0;
            int MileageEnd = 0;
            int MileagePerDay = 0;

            int RefuelingFuelStart = 0;
            double Refueling = 0;
            int FuelEnd = 0;

            excel.readExcel();
            var res = excel._SheetsArr;

            foreach (var FulelList in res)
            {
                foreach (var FuelWork in FulelList)
                {
                    sumNumberList += FuelWork.NumberList;
                    HoursWorked += FuelWork.HoursWorked;
                    MileageStart += FuelWork.MileageStart;
                    MileageEnd += FuelWork.MileageEnd;
                    MileagePerDay += FuelWork.MileagePerDay;

                    RefuelingFuelStart += FuelWork.FuelStart;
                    Refueling += FuelWork.Refueling;
                    FuelEnd += FuelWork.FuelEnd;

                }
            }

            Assert.AreEqual(NumberList[0], res[0][0].NumberList); //Номер
            //Assert.AreEqual(DriverFullName[5], res[0][5].DriverFullName); //Водитель 84700

            //Assert.AreEqual(328, HoursWorked); //часы

            //Assert.AreEqual(1451106, MileageStart); //на начало Пробег 
            //Assert.AreEqual(1452393, MileageEnd);  // на конец Пробег 
            //Assert.AreEqual(1287, MileagePerDay); //за день Пробег 

            //Assert.AreEqual(385, RefuelingFuelStart); //на начало Топливо:(ДТ) 
            //Assert.AreEqual(110.01, Refueling); //Заправка
            //                                    // Assert.AreEqual(92, 2); //по факту
            //                                    //Assert.AreEqual(98.5, 2); //по нормам
            //Assert.AreEqual(403, FuelEnd); //на конец


        }

        [TestMethod()]
        public void WrireAddressesTest()
        {
            ReadExcel excel = new ReadExcel(_workbook);
            excel.WrireAddresses();

            Assert.AreEqual("B4", excel.AddressDate); //Дата
            Assert.AreEqual("C4", excel.AddressNumberList); //Номер путевого листа
            Assert.AreEqual("D4", excel.AddressDriver); // Фамилия

            Assert.AreEqual("E5", excel.AddressHoursWorked); // Часы отработаные 

            Assert.AreEqual("G5", excel.AddressMileageStart);  // Показание спидометра  на начало 
            Assert.AreEqual("H5", excel.AddressMileageEnd); // Показание на конец дня
            Assert.AreEqual("I5", excel.AddressMileagePerDay);//Пробег за день

            Assert.AreEqual("K5", excel.AddressFuelStart); // Топливо нам начало 
            Assert.AreEqual("L5", excel.AddressRefueling); // Заправка
            Assert.AreEqual("M6", excel.AddressActualConsumption); // Фактическое потребление топлива
            Assert.AreEqual("N6", excel.AddressConsumptionAccordingToNorm); //Потребление топлива по норме
            Assert.AreEqual("O5", excel.AddressFuelEnd); // Топливо наконец рабочегог дня

            // Assert.AreEqual("",excel.EngineHoursStart); //Старт часов работы двигателя
            //Assert.AreEqual("",excel.EngineHoursEnd); // Окончание работы двигателя

        }

        [TestMethod()]
        public void CheackAddressTest()
        {
            ReadExcel excel = new ReadExcel(_workbook);
            excel.WrireAddresses();
            Assert.IsTrue(excel.CheackAddress());
        }

        private ISheet CreateHeader(ISheet sheet)
        {
            var row4 = sheet.CreateRow(3);
            var row5 = sheet.CreateRow(4);
            var row6 = sheet.CreateRow(5);

            row4.CreateCell(1).SetCellValue("Дата"); //Дата B4                                                
            row4.CreateCell(2).SetCellValue("Номер"); // Номер  C4
            row4.CreateCell(3).SetCellValue("Водитель 84700"); // Водитель D4

            row5.CreateCell(4).SetCellValue("часы"); // Часы отработаные   E5

            row5.CreateCell(6).SetCellValue("на начало"); // Пробег  на начало G5
            row5.CreateCell(7).SetCellValue("на конец"); // Пробег на конец  H5
            row5.CreateCell(8).SetCellValue("за день"); //  За день I5

            row5.CreateCell(10).SetCellValue("на начало");// Топливо на начало  K5
            row5.CreateCell(11).SetCellValue("Заправка"); // Заправка   L5
            row6.CreateCell(12).SetCellValue("по факту"); // Расход по факту M6
            row6.CreateCell(13).SetCellValue("по нормам"); // Расход по нормам  N6
            row5.CreateCell(14).SetCellValue("на конец"); //  на конец    O5

            return sheet;
        }

        private ISheet CreateBody(ISheet sheet)
        {
            IRow row = null;
            var index = 0;

            /*1 Дата*/
            Date.Clear();
            Date = GetRandomDate();
            /*2 Номер*/
            NumberList.Clear();
            NumberList = GetRandomInt();
            /*3 Водитель*/
            DriverFullName.Clear();
            DriverFullName = GetRandomFullName();
            /*4 Часы*/
            HoursWorked.Clear();
            HoursWorked = GetRandomInt();
            /*5 на начало пробег*/
            MileageStart.Clear();
            MileageStart = GetRandomInt();
            /*6 на конец пробег*/
            MileageEnd.Clear();
            MileageEnd = GetRandomInt();
            /*7 за день пробег*/
            MileagePerDay.Clear();
            MileagePerDay = GetRandomInt();
            /*8 на начало топливо*/
            FuelStart.Clear();
            FuelStart = GetRandomInt();
            /*9 заправка*/
            Refueling.Clear();
         
            /*10 по факту топливо*/
            ActualConsumption.Clear();
            ActualConsumption = GetRandomInt();
            /*11 по нормам топлива*/
            ConsumptionAccordingToNorm.Clear();
            ConsumptionAccordingToNorm = GetRandomDouble(2,25);
            /*12 на конец топливо*/
            FuelEnd.Clear();
            FuelEnd = GetRandomInt();
            /*13 моточасы на начало*/
            EngineHoursStart.Clear();
            EngineHoursStart = GetRandomEngineHours();
            /*14 моточасы на конец*/
            EngineHoursEnd.Clear();
            EngineHoursEnd = GetRandomEngineHours();

            for (int i = 6; i < length; i += 3) /* строки*/
            {
                row = sheet.CreateRow(i);

                for (int j = 0; j < 16; j++) /* колонки*/
                {
                    var cell = row.CreateCell(j);

                    if (cell != null && index < length)
                    {
                        if (cell.Address.FormatAsString()[0] == 'B') // Дата
                        {
                            cell.SetCellValue(Date[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'C')) //Номер
                        {
                            cell.SetCellValue(NumberList[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'D')) // Водитель
                        {
                            cell.SetCellValue(DriverFullName[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'E')) //Часы
                        {
                            cell.SetCellValue(HoursWorked[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'G')) //На начало пробег
                        {
                            cell.SetCellValue(MileageStart[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'H')) // на конец пробег
                        {
                            cell.SetCellValue(MileageEnd[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'I')) // за день пробег
                        {
                            cell.SetCellValue(MileagePerDay[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'K')) // на на чало топлива 
                        {
                            cell.SetCellValue(FuelStart[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'L')) // заправака
                        {
                            var res = GetRandomRefueling();
                            if (res != 0)
                            {
                                cell.SetCellValue(res);
                                continue;
                            }
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'M')) // расход по факту
                        {
                            cell.SetCellValue(ActualConsumption[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'N')) // расход по нормам 
                        {
                            cell.SetCellValue(ConsumptionAccordingToNorm[index]);
                            continue;
                        }

                        if ((cell.Address.FormatAsString()[0] == 'O')) // на конец топлива
                        {
                            cell.SetCellValue(FuelEnd[index]);
                            continue;
                        }
                    }
                }
                index++;
            }

            var random = new Random();
            if (random.Next(2) == 1)
            {
                index = 0;

                for (int i = 7; i <= length - 2; i += 3)
                {
                    var rowNew = sheet.CreateRow(i);
                    rowNew.CreateCell(6).SetCellValue(EngineHoursStart[index]);

                    rowNew.CreateCell(7).SetCellValue(EngineHoursEnd[index]);
                    index++;
                }
            }
            return sheet;
        }

        private ISheet CreateFooter(ISheet sheet)
        {
            sheet.CreateRow(length).CreateCell(0).SetCellValue("ИТОГО");

            return sheet;
        }

        private List<int> GetRandomInt()
        {
            var random = new Random();

            if (length == 0) length = random.Next(1, 30);

            var numbers = new List<int>();
            for (int i = 0; i < length; i++)
            {
                numbers.Add(random.Next(1, 10000));
            }
            return numbers;
        }

        private List<double> GetRandomDouble( int min, int max)
        {
            var random = new Random();

            if (length == 0) length = random.Next(1, 30);

            var numbers = new List<double>();
            for (int i = 0; i < length; i++)
            {
                numbers.Add(Convert.ToDouble(random.Next(min, max) / 10.0));
            }
            return numbers;
        }

        private double GetRandomRefueling()
        {
            var random = new Random();

            if (random.Next(2) == 1) return Convert.ToDouble(random.Next(1, 1000) / 10.0);
            return 0;
        }

        private List<string> GetRandomDate()
        {
            var random = new Random();
            var dateList = new List<string>();

            if (length == 0) length = random.Next(1, 30);

            for (int i = 0; i < length; i++)
            {
                dateList.Add(new DateTime(2021, random.Next(1,13), random.Next(1,25)).ToShortDateString());
            }

            return dateList;
        }

        private List<string> GetRandomFullName()
        {
            var random = new Random();
            var fullList = new List<string>();
            var  fullNames = new  string[3] 

            { "Логвин Сергей  Васильевич,(525)", "ПИКУЛИК В.А.,(3)", "БОРОДАВКА И.И.,(986)" };
            if (length == 0) length = random.Next(1, 30);

            for (int i = 0; i < length; i++)
            {
                fullList.Add(fullNames[random.Next(3)]);
            }
            return fullList;
        }

        private List<double> GetRandomEngineHours()
        {
            return GetRandomDouble(1, 7);
        }

    } 
}