using CES.XmlFormat.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace CES.XmlFormat.Tests
{
    [TestClass()]
    public class ReadExcelTests
    {
        //IWorkbook workbook = new XSSFWorkbook();
        public Mock<IWorkbook> mock = new Mock<IWorkbook>();
        [TestMethod()]
        public void IsValidModelFuelWorkAccountingCardTest()
        {
            var work = new FuelWorkAccountingCard()
            {
                Date = new System.DateTime(2018, 6, 1), //Дата
                DriverFullName = "Кишкурно Ю.Н",// Фамилия
                ActualConsumption = 1, // Фактическое потребление топлива
                ConsumptionAccordingToNorm = 2,//Потребление топлива по норме 
                NumberList = 97852, //Номер путевого листа
                FuelStart = 15, // Топливо нам начало 
                FuelEnd = 15,// Топливо наконец рабочегог дня 
                Refueling = 15, // Заправка
                MileagePerDay = 100,//Пробег за день
                MileageStart = 12, // Показание спидометра  на начало 
                MileageEnd = 12, // Показание на конец дня
                                 // Отклонение  в топливе 
            };
            ReadExcel excel = new ReadExcel();

          //  Assert.AreEqual(true, excel.IsValidModelFuelWorkAccountingCard(work));
        }

        //[TestMethod()]
        //public void readExcelNumberListTest()
        //{
        //    IWorkbook workbook = new XSSFWorkbook();
        //    var sheet = workbook.CreateSheet("Лист 1");

        //    //var row5 = sheet.CreateRow(5);

        //    //row5.CreateCell(1).SetCellValue("Дата"); //Дата

        //    var row = sheet.CreateRow(6);

        //    row.CreateCell(1).SetCellValue("01.02.2022"); //Дата
        //    row.CreateCell(2).SetCellValue(97366); // Номер
        //    row.CreateCell(3).SetCellValue("ПИКУЛИК В.А.,(3)"); // Водитель
        //    row.CreateCell(6).SetCellValue(84700); // Пробег  на начало
        //    row.CreateCell(7).SetCellValue(84724); // Пробег на конец
        //    row.CreateCell(8).SetCellValue(24); //  За день 
        //    row.CreateCell(10).SetCellValue(16);// Топливо на начало 
        //    row.CreateCell(11).SetCellValue(""); // Заправка
        //    row.CreateCell(12).SetCellValue(2); // Расход по факту
        //    row.CreateCell(13).SetCellValue(1.9); // Расход по нормам 
        //    row.CreateCell(14).SetCellValue(14); //  на конец 

        //    mock.Setup(p => p.GetSheet("Лист 1")).Returns(sheet);
        //    ReadExcel excel = new ReadExcel(mock.Object);

        //    var result1 = excel.readExcel().ToList();
         
        //    //Assert.AreEqual("01.02.2022", result1[0][0].Date.ToString());
        //    //Assert.AreEqual(97366, result1[0].);
        //    Assert.AreEqual("ПИКУЛИК В.А.,(3)", result1[0][0].DriverFullName.ToString());

        //}

        [TestMethod()]
        public void WrireAddressesTest()
        {
            IWorkbook workbook = new XSSFWorkbook();
            var sheet = workbook.CreateSheet("Лист 1");
            var row = sheet.CreateRow(5);

            row.CreateCell(1).SetCellValue("Дата"); //Дата
            row.CreateCell(2).SetCellValue("Номер"); // Номер
            row.CreateCell(3).SetCellValue("Водитель 84700"); // Водитель
            row.CreateCell(6).SetCellValue("на начало"); // Пробег  на начало
            row.CreateCell(7).SetCellValue("на конец"); // Пробег на конец
            row.CreateCell(8).SetCellValue("за день"); //  За день 
            row.CreateCell(10).SetCellValue("на начало");// Топливо на начало 
            row.CreateCell(11).SetCellValue("Заправка"); // Заправка
            row.CreateCell(12).SetCellValue("по факту"); // Расход по факту
            row.CreateCell(13).SetCellValue("по нормам"); // Расход по нормам 
            row.CreateCell(14).SetCellValue("на конец"); //  на конец 

            mock.Setup(p => p.GetSheet("Лист 1")).Returns(sheet);
            ReadExcel excel = new ReadExcel(mock.Object);
          //  excel.WrireAddresses();

            Assert.AreEqual("D4", excel.AddressDriver);
        }
    }
}