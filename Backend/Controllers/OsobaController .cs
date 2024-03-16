using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OsobaController : ControllerBase
    {
        // Dependency injection
        // Definiraš privatno svojstvo
        private readonly EdunovaContext _context;

        // Dependency injection
        // U konstruktoru primir instancu i dodjeliš privatnom svojstvu
        public OsobaController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return new JsonResult(_context.Osoba.ToList());
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.ToString());
            }

        }

        [HttpPost]
        public IActionResult Post(int brojOsoba)
        {
            for (int i = 0; i < brojOsoba; i++)

            {
                var novaOsoba = new Osoba
                {
                    Ime = Faker.Name.First(),
                    Prezime = Faker.Name.Last(),
                    Email = Faker.Internet.Email()
                };

                _context.Osoba.Add(novaOsoba);
            }

                return Ok("Dodane su" + brojOsoba +  "nove osobe");
            }
        
    



        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Osoba osoba)
        {
            var smjerIzBaze = _context.Osoba.Find(sifra);
            // za sada ručno, kasnije će doći Mapper
            smjerIzBaze.Ime = osoba.Ime;
            smjerIzBaze.Prezime = osoba.Prezime;
            smjerIzBaze.Email = osoba.Email;
           

            _context.Osoba.Update(smjerIzBaze);
            _context.SaveChanges();

            return new JsonResult(smjerIzBaze);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var smjerIzBaze = _context.Osoba.Find(sifra);
            _context.Osoba.Remove(smjerIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }

    }
}