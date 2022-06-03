using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entidad
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }
        public string? ProDesc { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal ProValor { get; set; }

    }
}
