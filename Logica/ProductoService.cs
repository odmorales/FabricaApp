using Datos;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class ProductoService
    {
        private readonly FabricaContext _context;

        public ProductoService(FabricaContext context)
        {
            _context = context;
        }
        public string Eliminar(int id)
        {
            try
            {
                var producto = _context?.Productos?.Find(id);
                if (producto != null)
                {
                    _context?.Productos?.Remove(producto);
                    _context?.SaveChanges();
                    return ($"El producto { producto.Id } ha sido eliminado");

                }
                else
                {
                    return ($"El prodcuto no se encuentra registrado");
                }
            }
            catch (System.Exception)
            {
                return "Error al eliminar el producto";
            }
        }
        public string Modificar(Producto productoNuevo)
        {
            try
            {
                var productoViejo = _context?.Productos?.Find(productoNuevo.Id);

                if (productoViejo != null)
                {
                    productoViejo.Id = productoNuevo.Id;
                    productoViejo.ProDesc = productoNuevo.ProDesc;
                    productoViejo.ProValor = productoNuevo.ProValor;

                    _context?.Productos?.Update(productoViejo);
                    _context?.SaveChanges();

                    return ($"El registro { productoViejo.Id } ha sido modificado");
                }
                else
                {
                    return ($"El producto { productoViejo?.Id } no se encuentra registrado");
                }
            }
            catch (System.Exception)
            {
                return "Error al modificar el producto";
            }
        }
        public IEnumerable<Producto>? ConsultarTodos() => _context?.Productos?.ToList();

        public Producto? BuscarProducto(int id) => _context?.Productos?.Find(id);

        public GuardarResponse<Producto> GuardarProducto(Producto producto)
        {
            try
            {
                var productoBuscado = _context?.Productos?.Find(producto.Id);

                if (productoBuscado != null)
                {
                    return new GuardarResponse<Producto>("El producto ya se encuentra registrado");
                }
                _context?.Productos?.Add(producto);
                _context?.SaveChanges();

                return new GuardarResponse<Producto>(producto);
            }
            catch (SystemException)
            {
                return new GuardarResponse<Producto>("Error al guardar el producto");
            }
        }
    }
}
