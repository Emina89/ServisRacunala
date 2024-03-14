using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KlijentController: ControllerBase
    {
        // Dependency injection
        // Definiraš privatno svojstvo
        private readonly EdunovaContext _context;

        // Dependency injection
        // U konstruktoru primir instancu i dodjeliš privatnom svojstvu
        public KlijentController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return new JsonResult(_context.Klijenti.ToList());
            }
            catch (Exception ex)
            {
return new JsonResult(ex.ToString());
            }
            
        }

        [HttpPost]
        public IActionResult Post(Klijent klijent)
        {
            _context.Klijenti.Add(klijent);
            _context.SaveChanges();
            return new JsonResult(klijent);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Klijent klijent)
        {
            var smjerIzBaze = _context.Klijenti.Find(sifra);
            // za sada ručno, kasnije će doći Mapper
            smjerIzBaze.Ime = klijent.Ime;
            smjerIzBaze.Prezime = klijent.Prezime;
            smjerIzBaze.Email = klijent.Email;
            smjerIzBaze.KontaktBroj = klijent.KontaktBroj;

            _context.Klijenti.Update(smjerIzBaze);
            _context.SaveChanges();

            return new JsonResult(smjerIzBaze);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var smjerIzBaze = _context.Klijenti.Find(sifra);
            _context.Klijenti.Remove(smjerIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }

    }
}