using Datos;
using Entidad;
using FabricaApp.Model;
using Logica;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FabricaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private PedidoService _pedidoService;
        public PedidoController(FabricaContext context)
        {
            _pedidoService = new PedidoService(context);
        }
        // GET: api/<PedidoController>
        [HttpGet]
        public IEnumerable<PedidoViewModel> Get() => _pedidoService.ConsultarTodos()!
            .Select(p => new PedidoViewModel(p));
        

        // GET api/<PedidoController>/5
        [HttpGet("{id}")]
        public ActionResult<PedidoViewModel> Get(int id)
        {
            var pedido = _pedidoService.BuscarPedido(id);

            if(pedido == null)
            {
                return NotFound("No se encontro el pedido");
            }
            return Ok(new PedidoViewModel(pedido!));
        }

        // POST api/<PedidoController>
        [HttpPost]
        public ActionResult<PedidoViewModel> Post(PedidoInputModel pedidoInput)
        {
            var pedido = MapearPedido(pedidoInput);

            var respuesta = _pedidoService.GuardarPedido(pedido);

            if (respuesta.Error)
            {
                ModelState.AddModelError("Guardar pedido", respuesta.Mensaje!);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status500InternalServerError,
                };

                return StatusCode(500, problemDetails);
            }

            return Ok(new PedidoViewModel(respuesta.Objeto!));
        }

        // PUT api/<PedidoController>/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(int id, PedidoUpdateModel pedidoUpdate)
        {
            var pedi = _pedidoService.BuscarPedido(id);

            if (pedi == null)
            {
                return BadRequest("Pedido no encontrado");
            }

            Pedido pedido = MapearPedidoUpdate(pedidoUpdate, pedi.Id!);

            var mensaje = _pedidoService.Modificar(pedido);

            return Ok(mensaje);
        }

        // DELETE api/<PedidoController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            string mensaje = _pedidoService.Eliminar(id);

            return Ok(mensaje);
        }

        [NonAction]
        public Pedido MapearPedido(PedidoInputModel pedidoInput)
        {
            Pedido pedido = new Pedido
            {
                IdUsuario = pedidoInput.IdUsuario,
                IdProducto = pedidoInput.IdProducto,
                PedCant = pedidoInput.PedCant,
                PdVrUnit = pedidoInput.PdVrUnit,
                PedIVA = pedidoInput.PedIVA,
            };

            return pedido;
        }

        [NonAction]
        public Pedido MapearPedidoUpdate(PedidoUpdateModel pedidoUpdate, int id)
        {
            Pedido pedido = new Pedido
            {
                Id = id,
                IdUsuario = pedidoUpdate.IdUsuario,
                IdProducto = pedidoUpdate.IdProducto,
                PdVrUnit = pedidoUpdate.PdVrUnit,
                PedCant = pedidoUpdate.PedCant,
                PedIVA = pedidoUpdate.PedIVA
            };

            return pedido;
        }
    }
}
