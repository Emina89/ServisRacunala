

using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class EdunovaContext:DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> options) 
            : base(options) { 

        }

        public DbSet<Klijent> Klijenti { get; set; }
        public DbSet<ServisniNalozi> ServisniNalozi { get; set; }
        public DbSet<PrimkaServisa> PrimkaServisa { get; set; }
        public DbSet<AktivnostServis> AktivnostServis { get; set; }

    }
}
