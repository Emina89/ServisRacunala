using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PrimkaServisaController : ControllerBase
    {
        private readonly EdunovaContext _context;

        public PrimkaServisaController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return new JsonResult(_context.PrimkaServisa.Include(p => p.ServisniNalog).ToList());
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post(PrimkaServisa primkaServisa)
        {
            _context.PrimkaServisa.Add(primkaServisa);
            _context.SaveChanges();
            return new JsonResult(primkaServisa);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, PrimkaServisa primkaServisa)
        {
            if (id != primkaServisa.Id)
            {
                return BadRequest();
            }

            var existingPrimkaServisa = _context.PrimkaServisa.Find(id);
            if (existingPrimkaServisa == null)
            {
                return NotFound();
            }

            existingPrimkaServisa.Vrsta = primkaServisa.Vrsta;
            existingPrimkaServisa.Model = primkaServisa.Model;
            existingPrimkaServisa.ServisniNalogId = primkaServisa.ServisniNalogId;

            _context.SaveChanges();

            return new JsonResult(existingPrimkaServisa);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var primkaServisa = _context.PrimkaServisa.Find(id);
            if (primkaServisa == null)
            {
                return NotFound();
            }

            _context.PrimkaServisa.Remove(primkaServisa);
            _context.SaveChanges();

            return new JsonResult(new { message = "Obrisano", primkaServisa });
        }
    }
}
