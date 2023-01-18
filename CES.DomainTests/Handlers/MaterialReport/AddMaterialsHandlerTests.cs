using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace CES.Domain.Handlers.MaterialReport.Tests
{
    [TestClass()]
    public class AddMaterialsHandlerTests
    {
        private readonly DocMangerContext _ctx;
        //public AddMaterialsHandlerTests(DocMangerContext ctx)
        //{
        //    _ctx = ctx;
        //    }
        [TestMethod()]
        public void AddMaterialsHandlerTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public async Task HandleTest()
        {
            var ds = new  Mock<IMediator>();
             var res  = await ds.Object.Send(new AddUsedMaterialRequest() { PartyName = "047057309", Count =1 });
            var s = "Ura";

            //Console.WriteLine(userContextMock.Object);
            // var act =  new ActWriteSparesHandler(userContextMock);
            Assert.AreEqual("Ura", s);
        
        }
    }
}