using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Entidad
{
    public class Pedido
    {
        public int Id { get; set; }

        [ForeignKey("Usuario")]
        public int IdUsuario { get; set; }
        public Usuario? Usuario { get; set; }

        [ForeignKey("Producto")]
        public int IdProducto { get; set; }
        public Producto? Producto { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal PdVrUnit { get; set; }
        public float PedCant { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal SubTot { get; set; }
        public float PedIVA { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal PedTotal { get; set; }

        public void CalcularSubTotal()
        {
            this.SubTot = Convert.ToDecimal(this.PedCant) * this.PdVrUnit;
        }

        public void CalcularTotal()
        {
            this.PedTotal = this.SubTot * Convert.ToDecimal(this.PedIVA) + this.SubTot;
        }

    }
}
