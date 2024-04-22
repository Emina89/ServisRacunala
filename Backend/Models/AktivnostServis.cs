using Backend.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class AktivnostServis
{
    public int Id { get; set; }

    [ForeignKey("PrimkaServisa")]
    public int PrimkaServisaId { get; set; }
    public PrimkaServisa PrimkaServisa { get; set; }

    public DateTime DatumZavrsetka { get; set; }
    public string Opis { get; set; }
}
