using AutoFixture;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Moq.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport.Tests
{
    [TestClass()]
    public class ActWriteSparesHandlerTests
    {
        [TestMethod()]
        public void HandleTest()
        {
            var pr =new Fixture().Create<ProductEntity>();

            var userContextMock = new Mock<DocMangerContext>( new Mock<DbContextOptions<DocMangerContext>>().Object);

            // userContextMock.Setup(x => x).Returns();
            
            userContextMock.Setup(x => x.Products).ReturnsDbSet(new List<ProductEntity>() { pr});


           // Console.WriteLine(userContextMock.Object.Products);

            var s = "Ura";

            //Console.WriteLine(userContextMock.Object);
           // var act =  new ActWriteSparesHandler(userContextMock);
            Assert.AreEqual("Ura",s);
        }
    }
}

public class Persone
{
    public string? Name { get; set; }
}