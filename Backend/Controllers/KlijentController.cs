using System.Text;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KlijentController : EdunovaController<Klijent, KlijentDTORead, KlijentDTOInsertUpdate>
    {
        public KlijentController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Klijenti;
        }
        protected override void KontrolaBrisanje(Klijent entitet)
        {
            var lista = _context.ServisniNalozi
                .Include(x => x.Klijent)
                .Where(x => x.Klijent.Id == entitet.Id)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Klijent se ne može obrisati jer se nalazi na servisnim nalozima: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Klijent).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }
    }
}