using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KlijentController : ControllerBase
    {

        private readonly EdunovaContext _context;


        public KlijentController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Klijenti.ToList());
        }

        [HttpGet]
        [Route("{sifra:int}")]

        public IActionResult GetBySifra(int sifra)
        {
            return new JsonResult(_context.Klijenti.Find(sifra));
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