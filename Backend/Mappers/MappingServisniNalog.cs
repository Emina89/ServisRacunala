using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingServisniNalog : Mapping<ServisniNalozi, ServisniNalogDTORead, ServisniNalogDTOInsertUpdate>
    {

        public MappingServisniNalog()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>{
                c.CreateMap<ServisniNalozi, ServisniNalogDTORead>()
                .ConstructUsing(entitet =>
                 new ServisniNalogDTORead(
                    entitet.Id,
                    entitet.DatumNaloga,
                    entitet.Klijent.Ime + " " + entitet.Klijent.Prezime,
                    entitet.OpisKvara));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>{
                    c.CreateMap<ServisniNalogDTOInsertUpdate, ServisniNalozi>();
                }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>{
                 c.CreateMap<ServisniNalozi, ServisniNalogDTOInsertUpdate>()
                 .ConstructUsing(entitet =>
                  new ServisniNalogDTOInsertUpdate(
                    entitet.OpisKvara,
                    entitet.Klijent.Id,
                     entitet.DatumNaloga
                     
                    ));
             }));
        }



    }
}
