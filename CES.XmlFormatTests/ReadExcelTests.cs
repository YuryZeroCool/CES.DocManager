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
        private IWorkbook _workbook = null;

        private List<string> Date = new List<string>();
        private List<int> NumberList = new List<int>();
        private List<string> DriverFullName = new List<string>();

        private List<int> HoursWorked = new List<int>();

        private List<int> MileageStart = new List<int>();
        private List<int> MileageEnd = new List<int>();
        private List<int> MileagePerDay = new List<int>();

        private List<int> FuelStart = new List<int>();
        private List<int> FuelEnd = new List<int>();
        private List<double> Refueling = new List<double>();
        private List<int> ActualConsumption = new List<int>();
        private List<double> ConsumptionAccordingToNorm = new List<double>();

        [TestInitialize]
        public void ReadExceltTestInitialize()
        {
            var countRow = 6;
            var countRefueling = 0;
            var sheet = workbook.CreateSheet("Лист 1");

            var row4 = sheet.CreateRow(3);
            var row5 = sheet.CreateRow(4);
            var row6 = sheet.CreateRow(5);

            var row58 = sheet.CreateRow(57);

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

            row58.CreateCell(0).SetCellValue("ИТОГО"); //  на конец    O5

            foreach (var item in new string[17] 
            {
                new DateTime(2022, 2, 1).ToShortDateString(),
                new DateTime(2022, 2, 2).ToShortDateString(),
                new DateTime(2022, 2, 6).ToShortDateString(), 
                new DateTime(2022, 2, 7).ToShortDateString(), 
                new DateTime(2022, 2, 10).ToShortDateString(),
                new DateTime(2022, 2, 11).ToShortDateString(),
                new DateTime(2022, 2, 13).ToShortDateString(), 
                new DateTime(2022, 2, 14).ToShortDateString(), 
                new DateTime(2022, 2, 15).ToShortDateString(), 
                new DateTime(2022, 2, 16).ToShortDateString(), 
                new DateTime(2022, 2, 17).ToShortDateString(),
                new DateTime(2022, 2, 18).ToShortDateString(), 
                new DateTime(2022, 2, 21).ToShortDateString(), 
                new DateTime(2022, 2, 21).ToShortDateString(), 
                new DateTime(2022, 2, 22).ToShortDateString(), 
                new DateTime(2022, 2, 23).ToShortDateString(), 
                new DateTime(2022, 2, 23).ToShortDateString()
            })
            {
                Date.Add(item);
            }

            foreach (var item in new int[17] 
            { 
                97366, 97395, 97503, 97522, 97607, 97635, 97686, 97706, 97734, 97762, 
                97790, 97819, 97890, 97890, 97919, 97947, 97947
            })
            {
                NumberList.Add(item);
            }

            foreach (var item in new string[17] 
            {
                "ПИКУЛИК В.А.,(3)", "ПИКУЛИК В.А.,(3)", "РАДКЕВИЧ Н.Н.,(792)",
                "БОРОДАВКА И.И.,(986)", "ДЕНИСОВ А.Д.,(15)", "Логвин Сергей  Васильевич,(525)",
                "ПОЗНЯК В.С.,(19)", "ПИКУЛИК В.А.,(3)","Логвин Сергей  Васильевич,(525)",
                "ПИКУЛИК В.А.,(3)", "ПИКУЛИК В.А.,(3)","ПИКУЛИК В.А.,(3)", "МУХО В.С.,(17)",
                "ПЕСКОВОЙ А.А.,(701)", "ПИКУЛИК В.А.,(3)", "ПИКУЛИК В.А.,(3)", 
                "БОРОДАВКА И.И.,(986)"
            })
            {
                DriverFullName.Add(item);
            }             
           
            foreach (var item in new int[17]
            {
                8, 24, 24, 24, 8, 24, 24, 24, 24, 8, 8, 8, 24, 24, 24, 24, 24
            })
            {
                HoursWorked.Add(item);
            }
 
            foreach (var item in new int[17] 
            {
                84700, 84724, 84818, 84980, 85050, 85098,85249, 85394, 85461,
                85536, 85574, 85623, 85703, 85710, 85765, 85832, 85889
            })
            {
                MileageStart.Add(item);
            }
            foreach (var item in new int[17] 
            {
                84724, 84818, 84980, 85050, 85098, 85249, 85394, 85461, 85536,
                85574, 85623, 85703, 85710, 85765, 85832, 85889, 85987 })
            {
                MileageEnd.Add(item);
            }

            foreach (var item in new int[17]
            {
                24, 94, 162, 70, 48, 151, 145, 67, 75, 38, 49, 80, 7, 55, 67, 57, 98 
            })
            {
                MileagePerDay.Add(item);
            }
 
            foreach (var item in new int[17] 
            {
                16, 14, 10, 18, 45, 41, 29, 17, 12, 36, 33, 29, 23, 22, 18, 13, 9 
            })
            {
                FuelStart.Add(item);
            }
          
            foreach (var item in new int[17]
            {
                14, 10, 18, 45, 41, 29, 17, 12, 36, 33, 29, 23, 22, 18, 13, 9, 34 
            })
            {
                FuelEnd.Add(item);
            }

            Refueling.Add(20.01);
            Refueling.Add(30);
            Refueling.Add(30);
            Refueling.Add(30);

            foreach (var item in new int[17] { 2, 4, 12, 3, 4, 12, 12, 5, 6, 3, 4, 6, 1, 4, 5, 4, 5 })
            {
                ActualConsumption.Add(item);
            }
 
            foreach (var item in new double[17] 
            { 
                1.9, 7.5, 13, 5.6, 3.5, 11,11.6,5.4,6,2.8,3.6,5.8,0.5,4,4.9,4.2,7.2 })
            {
                ConsumptionAccordingToNorm.Add(item);
            }

            for (int i = 0; i <= Date.Count-1; i++)
            {
               var row = sheet.CreateRow(countRow);

                for (int j = 0; j <= 16; j++)
                {
                    if (j == 1)
                    {
                        row.CreateCell(j).SetCellValue(Date[i].ToString());
                         var adress= row.GetCell(j).Address.FormatAsString();
                        continue;
                    }
                    if (j == 2)
                    {
                        row.CreateCell(j).SetCellValue(NumberList[i]);
                        continue;
                    }
                    if (j == 3)
                    {
                        row.CreateCell(j).SetCellValue(DriverFullName[i]);
                        continue;
                    }
                    if (j == 4)
                    {
                        row.CreateCell(j).SetCellValue(HoursWorked[i]);
                        continue;
                    }
                    if (j == 6)
                    {
                       row.CreateCell(j).SetCellValue(MileageStart[i]);
                        continue;
                    }
                    if (j == 7)
                    {
                        row.CreateCell(j).SetCellValue(MileageEnd[i]);
                        continue;
                    }
                    if (j == 8)
                    {
                        row.CreateCell(j).SetCellValue(MileagePerDay[i]);
                        continue;
                    }
                    if (j == 10) 
                    {
                        row.CreateCell(j).SetCellValue(FuelStart[i]);
                        continue;
                    }
                    if (j == 11) 
                    {
                        if (i==2|| i == 3 || i == 8 || i == 16)
                        {
                            row.CreateCell(j).SetCellValue(Refueling[countRefueling]);
                            countRefueling++;
                        }
                        
                        continue;
                    }
                    if (j == 12) 
                    {
                        row.CreateCell(j).SetCellValue(ActualConsumption[i]);
                        continue;
                    }
                    if (j == 13) 
                    {
                        row.CreateCell(j).SetCellValue(ConsumptionAccordingToNorm[i]);
                        continue;
                    }
                    if (j == 14) 
                    {
                        row.CreateCell(j).SetCellValue(FuelEnd[i]);
                        continue;
                    }
                }
                countRow += 3;
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
           
            foreach (ISheet row in _workbook.GetSheetAt(0))
            {
                bool isValide = false;
                if(row != null)
                {
                    foreach (ICell cell in row)
                    {
                        if (cell != null)
                        {
                            if(cell.Address.FormatAsString()[0] =='A')
                            {
                                if (cell.ToString() == "ИТОГО") isValide = true;
                            }
                        }
                    }
                }
                Assert.IsTrue(isValide);
            }
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
            ReadExcel excel = new ReadExcel(workbook);
            int sumNumberList = 0;
            int HoursWorked = 0;

            int MileageStart = 0;
            int MileageEnd = 0;
            int MileagePerDay = 0;

            int RefuelingFuelStart = 0;
            double Refueling = 0;
            int FuelEnd = 0;

            excel.readExcel();
           var res=  excel._SheetsArr;

            foreach (var FulelList in res)
            {
                foreach (var FuelWork in FulelList)
                {
                    sumNumberList += FuelWork.NumberList;
                    HoursWorked += FuelWork.HoursWorked;
                    MileageStart += FuelWork.MileageStart;
                    MileageEnd += FuelWork.MileageEnd;
                    MileagePerDay+= FuelWork.MileagePerDay;
            
                    RefuelingFuelStart+= FuelWork.FuelStart;
                    Refueling+= FuelWork.Refueling;
                    FuelEnd += FuelWork.FuelEnd;

                }
            }
  
            Assert.AreEqual(1661118, sumNumberList) ; //Номер
            Assert.AreEqual(DriverFullName[5], res[0][5].DriverFullName); //Водитель 84700

            Assert.AreEqual(328, HoursWorked); //часы

            Assert.AreEqual(1451106, MileageStart); //на начало Пробег 
            Assert.AreEqual(1452393, MileageEnd);  // на конец Пробег 
            Assert.AreEqual(1287, MileagePerDay); //за день Пробег 

            Assert.AreEqual(385, RefuelingFuelStart); //на начало Топливо:(ДТ) 
            Assert.AreEqual(110.01, Refueling); //Заправка
           // Assert.AreEqual(92, 2); //по факту
            //Assert.AreEqual(98.5, 2); //по нормам
            Assert.AreEqual(403, FuelEnd); //на конец


        }

        [TestMethod()]
        public void WrireAddressesTest()
        {
            ReadExcel excel = new ReadExcel(CreateFileMazTest("Lis"));
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

        private IWorkbook CreateFileMazTest(string name)
        {
            IWorkbook workbook = new XSSFWorkbook();

            var sheet = workbook.CreateSheet(name);
       
            return workbook;
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
            var refuelCount = 0;

            List<string> Date = new List<string>();
            List<int> NumberList = new List<int>();
            List<string> DriverFullName = new List<string>();

            List<int> HoursWorked = new List<int>();

            List<int> MileageStart = new List<int>();
            List<int> MileageEnd = new List<int>();
            List<int> MileagePerDay = new List<int>();

            List<int> FuelStart = new List<int>();
            List<int> FuelEnd = new List<int>();
            List<double> Refueling = new List<double>();
            List<int> ActualConsumption = new List<int>();
            List<double> ConsumptionAccordingToNorm = new List<double>();

            List<double> EngineHoursStart = new List<double>();
            List<double> EngineHoursEnd = new List<double>();

            /*1 Дата*/
            foreach (var item in new string[13] {
                new DateTime(2022, 2, 1).ToShortDateString(),
                new DateTime(2022, 2, 2).ToShortDateString(),
                new DateTime(2022, 2, 3).ToShortDateString(),
                new DateTime(2022, 2, 4).ToShortDateString(),
                new DateTime(2022, 2, 5).ToShortDateString(),
                new DateTime(2022, 2, 6).ToShortDateString(),
                new DateTime(2022, 2, 9).ToShortDateString(),
                new DateTime(2022, 2, 10).ToShortDateString(),
                new DateTime(2022, 2, 14).ToShortDateString(),
                new DateTime(2022, 2, 17).ToShortDateString(),
                new DateTime(2022, 2, 18).ToShortDateString(),
                new DateTime(2022, 2, 21).ToShortDateString(),
                new DateTime(2022, 2, 22).ToShortDateString()
            })
            {
                Date.Add(item);
            }
            /*2 Номер*/
            foreach (var item in new int[13]
            { 97370, 97399, 97427, 97455, 97481, 97483, 97582,
                97611, 97710, 97794, 97823, 97894, 97923 })
            {
                NumberList.Add(item);
            }
            /*3 Водитель*/
            foreach (var item in new string[13]
            {
                "НЕСТЕРОВИЧ А.С.,(318)","НЕСТЕРОВИЧ А.С.,(318)",
                 "ГАЙДУК С.В.,(772)","ГАЙДУК С.В.,(772)",
                "НЕСТЕРОВИЧ А.С.,(318)", "НЕСТЕРОВИЧ А.С.,(318)",
                "НЕСТЕРОВИЧ А.С.,(318)","НЕСТЕРОВИЧ А.С.,(318)",
                "НЕСТЕРОВИЧ А.С.,(318)","НЕСТЕРОВИЧ А.С.,(318)",
                "НЕСТЕРОВИЧ А.С.,(318)","НЕСТЕРОВИЧ А.С.,(318)",
                "НЕСТЕРОВИЧ А.С.,(318)"})
            {
                DriverFullName.Add(item);
            }
            /*4 Часы*/
            foreach (var item in new int[13] { 12, 12, 12, 12, 12, 12, 12, 24, 24, 24, 24, 24, 12 })
            {
                HoursWorked.Add(item);
            }
            /*5 на начало пробег*/
            foreach (var item in new int[13]
            { 33029, 33061, 33088, 33130, 33187, 33194, 33233, 33251, 33300, 33346, 33383, 33448, 33483 })
            {
                MileageStart.Add(item);
            }
            /*6 на конец пробег*/
            foreach (var item in new int[13]
            {
                33061, 33088, 33130, 33187, 33194, 33233, 33251, 33300, 33346, 33383,
                33448, 33483, 33540
            })
            {
                MileageEnd.Add(item);
            }
            /*7 за день пробег*/
            foreach (var item in new int[13] { 32, 27, 42, 57, 7, 39, 18, 49, 46, 37, 65, 35, 57 })
            {
                MileagePerDay.Add(item);
            }
            /*8 на начало топливо*/
            foreach (var item in new int[13]
            { 47,85, 50, 84, 75,60, 72, 54, 101, 147,91, 80,31 })
            {
                FuelStart.Add(item);
            }
            /*9 заправка*/
            foreach (var item in new double[8] { 100, 100, 100, 50, 120, 100, 60, 100 })
            {
                Refueling.Add(item);
            }
            /*10 по факту топливо*/
            foreach (var item in new int[13] { 62, 35, 66, 109, 15, 38, 18, 73, 54, 56, 71, 49, 69 })
            {
                ActualConsumption.Add(item);
            }
            /*11 по нормам топлива*/
            foreach (var item in new double[13]
            { 62.3, 34.8, 65.6, 109.3, 15.2, 37.7, 18.4, 73, 54, 56.4, 71.4, 49.3, 68.9 })
            {
                ConsumptionAccordingToNorm.Add(item);
            }
            /*12 на конец топливо*/
            foreach (var item in new int[13] { 85, 50, 84, 75, 60, 72, 54, 101, 147, 91, 80, 31, 62 })
            {
                FuelEnd.Add(item);
            }
            /*13 моточасы на начало*/
            foreach (var item in new double[13]
            { 1387, 1391, 1393, 1397, 1404, 1405, 1407, 1408, 1412, 1415, 1419, 1423, 1426 })
            {
                EngineHoursStart.Add(item);
            }
            /*14 моточасы на конец*/
            foreach (var item in new double[13]
            { 1391,1393, 1397, 1404, 1405, 1407, 1408, 1412,1415,1419,1423, 1426, 1430 })
            {
                EngineHoursEnd.Add(item);
            }

            for (int i = 6; i < 46; i += 3) /* строки*/
            {
                row = sheet.CreateRow(i);

                for (int j = 0; j < 16; j++) /* колонки*/
                {
                    var cell = row.CreateCell(j);

                    if (cell != null && index < 13)
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
                            if (i == 6)
                            {
                                cell.SetCellValue(Refueling[refuelCount]);
                                refuelCount++;
                                continue;
                            }
                            if (i == 12)
                            {
                                cell.SetCellValue(Refueling[refuelCount]);
                                refuelCount++;
                                continue;
                            }
                            if (i == 15)
                            {
                                cell.SetCellValue(Refueling[refuelCount]);
                                refuelCount++;
                                continue;
                            }
                            if (i == 21)
                            {
                                cell.SetCellValue(Refueling[refuelCount]);
                                refuelCount++;
                                continue;
                            }
                            if (i == 27)
                            {
                                cell.SetCellValue(Refueling[refuelCount]);
                                refuelCount++;
                                continue;
                            }
                            if (i == 30)
                            {
                                cell.SetCellValue(Refueling[refuelCount]);
                                refuelCount++;
                                continue;
                            }
                            if (i == 36)
                            {
                                cell.SetCellValue(Refueling[refuelCount]);
                                refuelCount++;
                                continue;
                            }
                            if (i == 42)
                            {
                                cell.SetCellValue(Refueling[refuelCount]);
                                refuelCount++;
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
            index = 0;
            for (int i = 7; i <= 44; i += 3)
            {
                var rowNew = sheet.CreateRow(i);
                rowNew.CreateCell(6).SetCellValue(EngineHoursStart[index]);

                rowNew.CreateCell(7).SetCellValue(EngineHoursEnd[index]);
                index++;
            }

            return sheet;
        }

        private ISheet CreateFooter(ISheet sheet)
        {
            sheet.CreateRow(sheet.LastRowNum).CreateCell(0).SetCellValue("ИТОГО");

            return sheet;
        }
    }
}