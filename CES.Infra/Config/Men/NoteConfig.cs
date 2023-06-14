using CES.Infra.Models;
using CES.Infra.Models.Men;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Men
{
    public class NoteConfig : IEntityTypeConfiguration<NoteEntity>
    {
        public void Configure(EntityTypeBuilder<NoteEntity> builder)
        {
                builder.Property(x => x.Date)
                    .HasColumnType("DATETIME"); 
        }
    }
}
