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
    public class ProductoController : ControllerBase
    {
        private ProductoService _productoService;

        public ProductoController(FabricaContext context)
        {
            _productoService = new ProductoService(context);
        }
        // GET: api/<ProductoController>
        [HttpGet]
        public IEnumerable<ProductoViewModel> Get() => _productoService.ConsultarTodos()!
               .Select(p => new ProductoViewModel(p));
        

        // GET api/<ProductoController>/5
        [HttpGet("{id}")]
        public ActionResult<ProductoViewModel> Get(int id)
        {
            var producto = _productoService.BuscarProducto(id);

            if (producto == null)
            {
                return NotFound("No se encontro el pedido");
            }
            return Ok(new ProductoViewModel(producto!));
        }

        // POST api/<ProductoController>
        [HttpPost]
        public ActionResult<ProductoViewModel> Post(ProductoInputModel productoInput)
        {
            var producto = MapearProducto(productoInput);

            var respuesta = _productoService.GuardarProducto(producto);

            if (respuesta.Error)
            {
                ModelState.AddModelError("Guardar producto", respuesta.Mensaje!);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status500InternalServerError,
                };

                return StatusCode(500, problemDetails);
            }

            return Ok(new ProductoViewModel(respuesta.Objeto!));
        }

        // PUT api/<ProductoController>/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(int id, ProductoUpdateModel productoUpdate)
        {
            var product = _productoService.BuscarProducto(id);

            if (product == null)
            {
                return BadRequest("Producto no encontrado");
            }

            Producto producto = MapearProductoUpdate(productoUpdate, product.Id!);

            var mensaje = _productoService.Modificar(producto);

            return Ok(mensaje);
        }

        // DELETE api/<ProductoController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            string mensaje = _productoService.Eliminar(id);

            return Ok(mensaje);
        }

        [NonAction]
        public Producto MapearProducto(ProductoInputModel productoInput)
        {
            Producto producto = new Producto
            {
                ProDesc = productoInput.ProDesc,
                ProValor = productoInput.ProValor
            };

            return producto;
        }

        [NonAction]
        public Producto MapearProductoUpdate(ProductoUpdateModel productoInput, int id)
        {
            var producto = new Producto
            {
                Id = id,
                ProDesc = productoInput.ProDesc,
                ProValor= productoInput.ProValor
            };

            return producto;
        }
    }
}
