using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KlijentDTORead(int Id, string Ime, string Prezime, string Email, string KontaktBroj);
    public record KlijentDTOInsertUpdate([Required(ErrorMessage = "Ime obavezno")] string Ime, string Prezime, string Email, string KontaktBroj);

    public record ServisniNalogDTORead(int Id, DateTime DatumNaloga, string? KlijentImePrezime, string? OpisKvara);
   public record ServisniNalogDTOInsertUpdate(
    [Required(ErrorMessage = "Opis kvara obavezno")]
    string? OpisKvara,
    [Required(ErrorMessage = "Klijent obavezno")]
    int KlijentId, 
    string? ImeKlijenta, // Dodano ime klijenta
    string? PrezimeKlijenta, // Dodano prezime klijenta
    DateTime? DatumNaloga
);

    

    public record PrimkaServisaDTORead(
        int Id,
        string Vrsta,
        string Model,
        int ServisniNalogId,
        string? KlijentIme,
        string? OpisKvara
    );

    public record PrimkaServisaDTOInsertUpdate(
        [Required(ErrorMessage = "Vrsta obavezna")]
        string Vrsta,
        [Required(ErrorMessage = "Model obavezan")]
        string Model,
        [Required(ErrorMessage = "Servisni nalog obavezan")]
        int ServisniNalogId

    );

    public record AktivnostServisDTORead(
        int Id,
        DateTime DatumZavrsetka,
        string Opis,
        int PrimkaServisaId,
        string? PrimkaServisaVrsta,
        string? PrimkaServisaModel
    );

    public record AktivnostServisDTOInsertUpdate(
        [Required(ErrorMessage = "Datum završetka obavezan")]
        DateTime DatumZavrsetka,
        [Required(ErrorMessage = "Opis obavezan")]
        string Opis,
        [Required(ErrorMessage = "Primka servisa obavezna")]
        int PrimkaServisaId,
         string? PrimkaServisaVrsta,
        string? PrimkaServisaModel

    );
}
