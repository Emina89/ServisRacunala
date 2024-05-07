using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class PrimkaServisa : Entitet
    {
        public string? Vrsta { get; set; }
        public string? Model { get; set; }

        [ForeignKey("ServisniNalog")]
        public int ServisniNalogId { get; set; }
        public ServisniNalozi? ServisniNalog { get; set; }
       


    }
}
