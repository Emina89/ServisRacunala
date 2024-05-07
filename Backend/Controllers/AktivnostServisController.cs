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
                throw new Exception("Ne postoji aktivnost servis s ID-om " + id + " u bazi");
            }

            return entitetIzbaze;
        }

        protected override AktivnostServis KreirajEntitet(AktivnostServisDTOInsertUpdate dto)
        {
            // Pronalazimo povezanu primku servisa na temelju ID-a iz DTO-a
            var primkaServisa = _context.PrimkaServisa.Find(dto.PrimkaServisaId)
                ?? throw new Exception("Ne postoji primka servisa s ID-om " + dto.PrimkaServisaId + " u bazi");

            // Provjeravamo je li primkaServisa null
            if (primkaServisa == null)
            {
                throw new Exception("Primka servisa ne postoji.");
            }

            // Provjeravamo postoji li model primke servisa
            if (string.IsNullOrEmpty(primkaServisa.Model))
            {
                throw new Exception("Model primke servisa nije postavljen.");
            }

            // Stvaramo novi entitet AktivnostServis i postavljamo potrebne informacije
            var entitet = new AktivnostServis
            {
                DatumZavrsetka = dto.DatumZavrsetka,
                Opis = dto.Opis,
                PrimkaServisa = primkaServisa
            };

            // Dodajemo novi entitet u kontekst i spremamo promjene u bazu podataka
            _context.AktivnostServis.Add(entitet);
            _context.SaveChanges();

            return entitet;
        }


        protected override AktivnostServis PromjeniEntitet(AktivnostServisDTOInsertUpdate dto, AktivnostServis entitet)
        {
            var primkaServisa = _context.PrimkaServisa.Find(dto.PrimkaServisaId) ?? throw new Exception("Ne postoji primka servisa s ID-om " + dto.PrimkaServisaId + " u bazi");

            // Provjerite je li primkaServisa null
            if (primkaServisa == null)
            {
                throw new Exception("Primka servisa ne postoji.");
            }

            // Provjerite postoji li model primke servisa
            if (string.IsNullOrEmpty(primkaServisa.Model))
            {
                throw new Exception("Model primke servisa nije postavljen.");
            }

            // Postavite model aktivnosti servisa
            entitet.PrimkaServisa.Model = primkaServisa.Model;

            return entitet;
        }


        protected override void KontrolaBrisanje(AktivnostServis entitet)
        {
            // Provjeravamo postoji li povezana primka servisa
            if (entitet.PrimkaServisa != null)
            {
                throw new Exception("Nije moguće izbrisati aktivnost servisa jer je povezana s primkom servisa.");
            }
        }
    }
}
