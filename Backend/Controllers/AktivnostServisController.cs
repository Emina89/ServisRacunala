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
    public class AktivnostServisController : EdunovaController<AktivnostServis, AktivnostServisDTORead, AktivnostServisDTOInsertUpdate>
    {
        public AktivnostServisController(EdunovaContext context) : base(context)
        {
            DbSet = _context.AktivnostServis;
            _mapper = new MappingAktivnostServis();
        }

        protected override List<AktivnostServisDTORead> UcitajSve()
        {
            var lista = DbSet?.Include(p => p.PrimkaServisa).ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected override AktivnostServis NadiEntitet(int id)
        {
            var entitetIzbaze = DbSet?.Include(p => p.PrimkaServisa).FirstOrDefault(p => p.Id == id);
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji aktivnost servisa s ID-om " + id + " u bazi");
            }

            return entitetIzbaze;
        }

        protected override AktivnostServis KreirajEntitet(AktivnostServisDTOInsertUpdate dto)
        {
            var primkaServisa = _context.PrimkaServisa.Find(dto.PrimkaServisaId) ?? throw new Exception("Ne postoji primka servisa s ID-om " + dto.PrimkaServisaId + " u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.PrimkaServisa = primkaServisa;
            return entitet;
        }

        protected override AktivnostServis PromjeniEntitet(AktivnostServisDTOInsertUpdate dto, AktivnostServis entitet)
        {
            var primkaServisa = _context.PrimkaServisa.Find(dto.PrimkaServisaId) ?? throw new Exception("Ne postoji primka servisa s ID-om " + dto.PrimkaServisaId + " u bazi");
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.PrimkaServisa = primkaServisa;
            return entitet;
        }

        protected override void KontrolaBrisanje(AktivnostServis entitet)
        {
            // Ovdje možeš implementirati kontrolu brisanja ako je potrebno
        }
    }
}
