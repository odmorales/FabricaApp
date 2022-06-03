using Datos;
using Entidad;
using FabricaApp.Model;
using Logica;
using Microsoft.AspNetCore.Mvc;
using BC = BCrypt.Net.BCrypt;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FabricaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private UsuarioService _usuarioService;

        public UsuarioController(FabricaContext context)
        {
            _usuarioService = new UsuarioService(context);
        }
        // GET: api/<UsuarioController>
        [HttpGet]
        public IEnumerable<UsuarioViewModel> Get() => _usuarioService.ConsultarTodos()!
            .Select(u => new UsuarioViewModel(u));
        

        // GET api/<UsuarioController>/5
        [HttpGet("{id}")]
        public ActionResult<UsuarioViewModel> Get(int id)
        {
            var usuario = _usuarioService.BuscarUsuario(id);

            if (usuario == null)
            {
                return NotFound("No se encontro el pedido");
            }
            return Ok(new UsuarioViewModel(usuario!));
        }

        // POST api/<UsuarioController>
        [HttpPost]
        public ActionResult<UsuarioViewModel> Post(UsuarioInputModel usuarioInput)
        {
            var usuario = MapearUsuario(usuarioInput);

            var respuesta = _usuarioService.GuardarUsuario(usuario);

            if (respuesta.Error)
            {
                ModelState.AddModelError("Guardar usuario", respuesta.Mensaje!);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status500InternalServerError,
                };

                return StatusCode(500, problemDetails);
            }

            return Ok(new UsuarioViewModel(respuesta.Objeto!));
        }

        // PUT api/<UsuarioController>/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(int id, UsuarioUpdateModel usuarioUpdate)
        {
            var userName = _usuarioService.BuscarUsuario(id);

            if (userName == null)
            {
                return BadRequest("Usuario no encontrado");
            }

            Usuario usuario = MapearUsuarioUpdate(usuarioUpdate, userName.Id!);

            var mensaje = _usuarioService.Modificar(usuario);

            return Ok(mensaje);
        }

        // DELETE api/<UsuarioController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            string mensaje = _usuarioService.Eliminar(id);

            return Ok(mensaje);
        }
        [NonAction]
        public Usuario MapearUsuario(UsuarioInputModel usuarioInput)
        {
            var usuario = new Usuario()
            {
                UsuNombre = usuarioInput.UsuNombre,
                UsuPass = BC.HashPassword(usuarioInput.UsuPass)
            };

            return usuario;
        }
        [NonAction]
        public Usuario MapearUsuarioUpdate(UsuarioUpdateModel usuarioInput, int id)
        {
            var usuario = new Usuario
            {
                Id = id,
                UsuNombre = usuarioInput.UsuNombre,
                UsuPass = BC.HashPassword(usuarioInput.UsuPass)
            };

            return usuario;
        }
    }
}
