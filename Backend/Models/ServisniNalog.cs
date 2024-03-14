using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class ServisniNalog : Entitet
    {
      
        public int KlijentId { get; set; }
        public Klijent Klijent { get; set; }
        public DateTime DatumNaloga { get; set; }
        public string OpisKvara { get; set; }

        

    }
}
