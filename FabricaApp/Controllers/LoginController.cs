using Datos;
using FabricaApp.Config;
using FabricaApp.Model;
using FabricaApp.Service;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FabricaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private UsuarioService _usuarioService;
        JwtService _jwtService;

        public LoginController(FabricaContext context, IOptions<AppSetting> appSettings)
        {
            _usuarioService = new UsuarioService(context);
            _jwtService = new JwtService(appSettings);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<LoginViewModel> Post([FromBody] LoginInputModel model)
        {
            var usuario = _usuarioService.ValidarCredenciales(model.UsuNombre!, model.UsuPass!);

            if (usuario == null)
                return NotFound("Usuario o contraseña inválidos.");

            var respuesta = _jwtService.GenerarToken(usuario);

            return Ok(respuesta);
        }

        [HttpGet("RenovarToken")]
        public ActionResult<LoginViewModel> RenovarToken()
        {
            string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last()!;

            var nombreUsuario = _jwtService.VerificarToken(token);

            if (nombreUsuario == null)
                return Unauthorized("Token no válido 1");

            var usuario = _usuarioService.ConsulterUsuario(nombreUsuario);

            if (usuario == null)
                return Unauthorized("Token no válido 2");

            var respuesta = _jwtService.GenerarToken(usuario);

            return Ok(respuesta);
        }
    }
}
