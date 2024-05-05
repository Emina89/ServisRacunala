using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingAktivnostServis : Mapping<AktivnostServis, AktivnostServisDTORead, AktivnostServisDTOInsertUpdate>
    {

        public MappingAktivnostServis()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<AktivnostServis, AktivnostServisDTORead>()
                .ConstructUsing(entitet =>
                 new AktivnostServisDTORead(
                    entitet.Id,
                    entitet.DatumZavrsetka,
                    entitet.Opis,
                    entitet.PrimkaServisa.Id,
                    entitet.PrimkaServisa.Vrsta,
                    entitet.PrimkaServisa.Model));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<AktivnostServisDTOInsertUpdate, AktivnostServis>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<AktivnostServis, AktivnostServisDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new AktivnostServisDTOInsertUpdate(
                   entitet.DatumZavrsetka,
                   entitet.Opis,
                   entitet.PrimkaServisaId,
                   entitet.PrimkaServisa.Vrsta,
                    entitet.PrimkaServisa.Model
                   ));
            }));
        }
    }
}
