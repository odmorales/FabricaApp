using Entidad;
using System.ComponentModel.DataAnnotations;

namespace FabricaApp.Model
{
    public class PedidoInputModel
    {
        public int IdUsuario { get; set; }
        public int IdProducto { get; set; }

        [Required(ErrorMessage = "El Valor unitario es requerido")]
        public decimal PdVrUnit { get; set; }

        [Required(ErrorMessage = "La cantidad es requerido")]
        public float PedCant { get; set; }
        public float PedIVA { get; set; }
       
    }
    public class PedidoViewModel: PedidoInputModel
    {
        public PedidoViewModel(Pedido pedido)
        {
            this.Id = pedido.Id;
            this.IdProducto = pedido.IdProducto;
            this.Producto = pedido.Producto;
            this.IdUsuario = pedido.IdUsuario;
            this.Usuario = pedido.Usuario;
            this.PdVrUnit = pedido.PdVrUnit;
            this.PedCant = pedido.PedCant;
            this.SubTot = pedido.SubTot;
            this.PedIVA = pedido.PedIVA;
            this.PedTotal = pedido.PedTotal;
        }
        public int Id { get; set; }
        public decimal SubTot { get; set; }
        public decimal PedTotal { get; set; }
        public Usuario? Usuario { get; set; }
        public Producto? Producto { get; set; }
    }
    public class PedidoUpdateModel
    {
        public int IdUsuario { get; set; }
        public int IdProducto { get; set; }
        public decimal PdVrUnit { get; set; }
        public float PedCant { get; set; }
        public float PedIVA { get; set; }
    }
}
