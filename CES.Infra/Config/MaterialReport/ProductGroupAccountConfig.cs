using CES.Infra.Models.MaterialReport;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.MaterialReport
{
    public class ProductGroupAccountConfig : IEntityTypeConfiguration<ProductGroupAccountEntity>
    {
        public void Configure(EntityTypeBuilder<ProductGroupAccountEntity> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(t => t.AccountName)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasMany(x => x.Products)
                .WithOne(p => p.Account)
                .HasForeignKey(k => k.ProductGroupAccountId);
        }
    }
}
