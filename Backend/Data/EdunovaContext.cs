﻿

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
        public DbSet<ServisniNalog> ServisniNalozi { get; set; }
        public DbSet<Osoba> Osoba { get; set; }

    }
}
