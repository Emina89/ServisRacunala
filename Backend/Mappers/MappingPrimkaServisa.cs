using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingPrimkaServisa : Mapping<PrimkaServisa, PrimkaServisaDTORead, PrimkaServisaDTOInsertUpdate>
    {
        public MappingPrimkaServisa()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<PrimkaServisa, PrimkaServisaDTORead>()
                    .ConstructUsing(entitet =>
                        new PrimkaServisaDTORead(
                            entitet.Id,
                            entitet.Vrsta,
                            entitet.Model,
                            entitet.ServisniNalog.Id,
                            entitet.ServisniNalog.Klijent.Ime,
                            entitet.ServisniNalog.OpisKvara
                        ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<PrimkaServisaDTOInsertUpdate, PrimkaServisa>()
                    .ForMember(dest => dest.ServisniNalogId, opt => opt.MapFrom(src => src.ServisniNalogId));
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<PrimkaServisa, PrimkaServisaDTOInsertUpdate>()
                    .ForMember(dest => dest.ServisniNalogId, opt => opt.MapFrom(src => src.ServisniNalog.Id));
            }));
        }
    }
}
