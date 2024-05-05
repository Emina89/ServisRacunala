using AutoMapper;
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
    public class PrimkaServisaController : EdunovaController<PrimkaServisa, PrimkaServisaDTORead, PrimkaServisaDTOInsertUpdate>
    {
        public PrimkaServisaController(EdunovaContext context) : base(context)
        {
            DbSet = _context.PrimkaServisa;
            _mapper = new MappingPrimkaServisa();
        }

        protected override List<PrimkaServisaDTORead> UcitajSve()
        {
            var lista = DbSet?.Include(p => p.ServisniNalog.Klijent).ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected override PrimkaServisa NadiEntitet(int id)
        {
            var entitetIzbaze = DbSet?.Include(p => p.ServisniNalog.Klijent).FirstOrDefault(p => p.Id == id);
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji primka servisa s ID-om " + id + " u bazi");
            }

            return entitetIzbaze;
        }

        protected override PrimkaServisa KreirajEntitet(PrimkaServisaDTOInsertUpdate dto)
        {
            var servisniNalog = _context.ServisniNalozi.Find(dto.ServisniNalogId) ?? throw new Exception("Ne postoji servisni nalog s ID-om " + dto.ServisniNalogId + " u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.ServisniNalog = servisniNalog;
            return entitet;
        }

        protected override PrimkaServisa PromjeniEntitet(PrimkaServisaDTOInsertUpdate dto, PrimkaServisa entitet)
        {
            var servisniNalog = _context.ServisniNalozi.Find(dto.ServisniNalogId) ?? throw new Exception("Ne postoji servisni nalog s ID-om " + dto.ServisniNalogId + " u bazi");
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.ServisniNalog = servisniNalog;
            return entitet;
        }

        protected override void KontrolaBrisanje(PrimkaServisa entitet)
        {
            // Dodajte kontrolu brisanja ako je potrebno
        }
    }
}
