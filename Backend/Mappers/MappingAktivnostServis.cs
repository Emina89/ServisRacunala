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
                    .ForMember(dest => dest.PrimkaServisaModel, opt => opt.MapFrom(src => src.PrimkaServisa.Model));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<AktivnostServisDTOInsertUpdate, AktivnostServis>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<AktivnostServis, AktivnostServisDTOInsertUpdate>();
            }));
        }
    }
}
