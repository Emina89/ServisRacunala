using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AktivnostServisController : ControllerBase
    {
        private readonly EdunovaContext _context;

        public AktivnostServisController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return new JsonResult(_context.AktivnostServis.ToList());
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post(AktivnostServis aktivnostServis)
        {
            _context.AktivnostServis.Add(aktivnostServis);
            _context.SaveChanges();
            return new JsonResult(aktivnostServis);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, AktivnostServis aktivnostServis)
        {
            if (id != aktivnostServis.Id)
            {
                return BadRequest();
            }

            var existingAktivnostServis = _context.AktivnostServis.Find(id);
            if (existingAktivnostServis == null)
            {
                return NotFound();
            }

            existingAktivnostServis.PrimkaServisaId = aktivnostServis.PrimkaServisaId;
            existingAktivnostServis.DatumZavrsetka = aktivnostServis.DatumZavrsetka;
            existingAktivnostServis.Opis = aktivnostServis.Opis;

            _context.SaveChanges();

            return new JsonResult(existingAktivnostServis);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var aktivnostServis = _context.AktivnostServis.Find(id);
            if (aktivnostServis == null)
            {
                return NotFound();
            }

            _context.AktivnostServis.Remove(aktivnostServis);
            _context.SaveChanges();

            return new JsonResult(new { message = "Obrisano", aktivnostServis });
        }
    }
}
