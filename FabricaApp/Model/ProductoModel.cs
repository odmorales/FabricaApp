using Entidad;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FabricaApp.Model
{
    public class ProductoInputModel
    { 
        public string? ProDesc { get; set; }

        [Required(ErrorMessage = "El usuario es requerido")]
        public decimal ProValor { get; set; }
    }

    public class ProductoViewModel: ProductoInputModel
    {
        public ProductoViewModel(Producto producto)
        {
            this.Id = producto.Id;
            this.ProDesc = producto.ProDesc;
            this.ProValor = producto.ProValor;
        }
        public int Id { get; set; }
    }

    public class ProductoUpdateModel
    {
        public string? ProDesc { get; set; }
        public decimal ProValor { get; set; }
    }
}
