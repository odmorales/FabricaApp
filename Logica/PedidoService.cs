using Datos;
using Entidad;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class PedidoService
    {
        private readonly FabricaContext _context;

        public PedidoService(FabricaContext context)
        {
            _context = context;
        }

        public string Eliminar(int id)
        {
            try
            {
                var pedido = _context?.Pedidos?.Find(id);
                if (pedido != null)
                {
                    _context?.Pedidos?.Remove(pedido);
                    _context?.SaveChanges();
                    return ($"El pedido { pedido.Id } ha sido eliminado");

                }
                else
                {
                    return ($"El pedido no se encuentra registrado");
                }
            }
            catch (System.Exception)
            {
                return "Error al eliminar el producto";
            }
        }
        public string Modificar(Pedido pedidoNuevo)
        {
            try
            {
                var pedidoViejo = _context?.Pedidos?.Find(pedidoNuevo.Id);

                if (pedidoViejo != null)
                {
                    pedidoViejo.Id = pedidoNuevo.Id;
                    pedidoViejo.IdUsuario = pedidoNuevo.IdUsuario;
                    pedidoViejo.IdProducto = pedidoNuevo.IdProducto;
                    pedidoViejo.PdVrUnit = pedidoNuevo.PdVrUnit;
                    pedidoViejo.PedCant = pedidoNuevo.PedCant;
                    pedidoViejo.PedIVA = pedidoNuevo.PedIVA;
                    pedidoViejo.CalcularSubTotal();
                    pedidoViejo.CalcularTotal();

                    _context?.Pedidos?.Update(pedidoViejo);
                    _context?.SaveChanges();

                    return ($"El registro { pedidoViejo.Id } ha sido modificado");
                }
                else
                {
                    return ($"El producto { pedidoViejo?.Id } no se encuentra registrado");
                }
            }
            catch (System.Exception)
            {
                return "Error al modificar el pedido";
            }
        }
        public IEnumerable<Pedido>? ConsultarTodos() => _context?.Pedidos?
            .Include("Usuario")
            .Include("Producto")
            .ToList();

        public Pedido? BuscarPedido(int id) => _context?.Pedidos?.Find(id);
        public GuardarResponse<Pedido> GuardarPedido(Pedido pedido)
        {
            try
            {
                pedido.CalcularSubTotal();
                pedido.CalcularTotal();
                _context?.Pedidos?.Add(pedido);
                _context?.SaveChanges();

                return new GuardarResponse<Pedido>(pedido);
            }
            catch (SystemException)
            {
                return new GuardarResponse<Pedido>("Error al guardar el pedido");
            }
        }
    }
}
