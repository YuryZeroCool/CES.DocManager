using AutoMapper;
using CES.Domain.Handlers.Mes;
using CES.Domain.Models.Request.Mes;
using CES.Infra;
using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;

namespace CES.DomainTests.Handlers.MaterialReport
{
    [TestFixture]
    public class SearchOrganizationHandlerTests
    {
        private SearchOrganizationHandler _handler;
        private Mock<DocMangerContext> _mockContext;
        private Mock<IMapper> _mockMapper;

        [SetUp]
        public void Setup()
        {
            _mockContext = new Mock<DocMangerContext>();
            _mockMapper = new Mock<IMapper>();
            _handler = new SearchOrganizationHandler(_mockContext.Object, _mockMapper.Object);
        }

        [Test]
        public async Task Handle_WhenTitleIsNull_ReturnsAllOrganizations()
        {
            // Arrange
            var request = new SearchOrganizationRequest
            {
                Title = null,
                Page = 1,
                Limit = 10
            };

            var organizations = new List<OrganizationEntity>
        {
            new OrganizationEntity { Name = "Organization 1" },
            new OrganizationEntity { Name = "Organization 2" }
        };

            _mockContext.Setup(ctx => ctx.OrganizationEntities).Returns(MockDbSet(organizations));

            // Act
            var response = await _handler.Handle(request, CancellationToken.None);

            // Assert
            Assert.AreEqual(2, response.Organizations.Count); // Assuming there are 2 organizations in the list
            Assert.AreEqual(1, response.TotalPage); // Assuming there is only 1 page
            _mockContext.Verify(ctx => ctx.OrganizationEntities, Times.Once);
            _mockContext.Verify(ctx => ctx.OrganizationEntities.Count(), Times.Once);
            _mockContext.Verify(ctx => ctx.OrganizationEntities.Skip(0).Take(10).ToList(), Times.Once);
        }

        [Test]
        public async Task Handle_WhenTitleIsNotNull_ReturnsFilteredOrganizations()
        {
            // Arrange
            var request = new SearchOrganizationRequest
            {
                Title = "Organization",
                Page = 1,
                Limit = 10
            };

            var organizations = new List<OrganizationEntity>
        {
            new OrganizationEntity { Name = "Organization 1" },
            new OrganizationEntity { Name = "Organization 2" }
        };

            _mockContext.Setup(ctx => ctx.OrganizationEntities).Returns(MockDbSet(organizations));

            // Act
            var response = await _handler.Handle(request, CancellationToken.None);

            // Assert
            Assert.AreEqual(2, response.Organizations.Count); // Assuming there are 2 organizations in the list
            Assert.AreEqual(1, response.TotalPage); // Assuming there is only 1 page
            _mockContext.Verify(ctx => ctx.OrganizationEntities, Times.Once);
            _mockContext.Verify(ctx => ctx.OrganizationEntities.Count(), Times.Once);
            _mockContext.Verify(ctx => ctx.OrganizationEntities
                .Where(x => x.Name.Contains(request.Title))
                .Skip(0)
                .Take(10)
                .ToList(), Times.Once);
        }

        private DbSet<T> MockDbSet<T>(IEnumerable<T> data) where T : class
        {
            var queryableData = data.AsQueryable();

            var mockSet = new Mock<DbSet<T>>();
            mockSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryableData.Provider);
            mockSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryableData.Expression);
            mockSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryableData.ElementType);
            mockSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(queryableData.GetEnumerator());

            return mockSet.Object;
        }
    }
}
