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
    public class ServisniNalogController : ControllerBase
    {
        private readonly EdunovaContext _context;

        public ServisniNalogController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return new JsonResult(_context.ServisniNalozi.ToList());
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.ToString());
            }

        }

        [HttpPost]
        public IActionResult Post(ServisniNalog servisniNalog)
        {
            _context.ServisniNalozi.Add(servisniNalog);
            _context.SaveChanges();
            return new JsonResult(servisniNalog);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ServisniNalog servisniNalog)
        {
            if (id != servisniNalog.Id)
            {
                return BadRequest();
            }

            var existingServisniNalog = _context.ServisniNalozi.Find(id);
            if (existingServisniNalog == null)
            {
                return NotFound();
            }

            existingServisniNalog.KlijentId = servisniNalog.KlijentId;
            existingServisniNalog.DatumNaloga = servisniNalog.DatumNaloga;
            existingServisniNalog.OpisKvara = servisniNalog.OpisKvara;

            _context.SaveChanges();

            return new JsonResult(existingServisniNalog);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var servisniNalog = _context.ServisniNalozi.Find(id);
            if (servisniNalog == null)
            {
                return NotFound();
            }

            _context.ServisniNalozi.Remove(servisniNalog);
            _context.SaveChanges();

            return new JsonResult(new { message = "Obrisano", servisniNalog });
        }
    }
}