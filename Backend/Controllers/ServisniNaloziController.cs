using Backend.Data;
using Backend.Mappers;
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
    public class ServisniNaloziController : EdunovaController<ServisniNalozi, ServisniNalogDTORead, ServisniNalogDTOInsertUpdate>
    {
        public ServisniNaloziController(EdunovaContext context) : base(context)
        {
            DbSet = _context.ServisniNalozi;
            _mapper = new MappingServisniNalog();
        }

        protected override List<ServisniNalogDTORead> UcitajSve()
        {
            var lista = DbSet?.Include(p => p.Klijent).ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override ServisniNalozi NadiEntitet(int id)
        {
            var entitetIzbaze = DbSet?.Include(p => p.Klijent).FirstOrDefault(p => p.Id == id);
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji servisni nalog s ID-om " + id + " u bazi");
            }

            return entitetIzbaze;
        }
        protected override ServisniNalozi KreirajEntitet(ServisniNalogDTOInsertUpdate dto)
        {
            var klijent = _context.Klijenti.Find(dto.KlijentId) ?? throw new Exception("Ne postoji klijent s ID-om " + dto.KlijentId + " u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Klijent = klijent;
            return entitet;
        }

        protected override ServisniNalozi PromjeniEntitet(ServisniNalogDTOInsertUpdate dto, ServisniNalozi entitet)
        {
            var klijent = _context.Klijenti.Find(dto.KlijentId) ?? throw new Exception("Ne postoji klijent s ID-om " + dto.KlijentId + " u bazi");
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Klijent = klijent;
            return entitet;
        }
        protected override void KontrolaBrisanje(ServisniNalozi entitet)
        {
            
        }
    }
}
