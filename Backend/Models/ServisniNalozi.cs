using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ServisniNalozi : Entitet
    {
        public DateTime DatumNaloga { get; set; }
        public string? OpisKvara { get; set; }

        [ForeignKey("Klijent")]
        public int KlijentId { get; set; } // Ovo svojstvo referencira primarni ključ klase Klijent

        public Klijent Klijent { get; set; } // Navigacijsko svojstvo do objekta Klijent
    }
}
