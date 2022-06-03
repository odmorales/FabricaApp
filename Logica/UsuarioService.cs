using Datos;
using Entidad;
using BC = BCrypt.Net.BCrypt;

namespace Logica;
public class UsuarioService
{
    private readonly FabricaContext _context;

    public UsuarioService(FabricaContext context)
    {
        _context = context;
    }

    public string Eliminar(int id)
    {
        try
        {
            var usuario = _context?.Usuarios?.Find(id);
            if(usuario != null)
            {
                _context?.Usuarios?.Remove(usuario);
                _context?.SaveChanges();
                return ($"El ususario { usuario.UsuNombre } ha sido eliminado");

            }
            else
            {
                return ($"El ususario no se encuentra registrado");
            }
        }
        catch (System.Exception)
        {
            return "Error al eliminar el usuario";
        }
    }
    public string Modificar(Usuario usuarioNuevo)
    {
        try
        {
            var usuarioViejo = _context?.Usuarios?.Find(usuarioNuevo.Id);

            if(usuarioViejo != null)
            {
                usuarioViejo.Id = usuarioNuevo.Id;
                usuarioViejo.UsuNombre = usuarioNuevo.UsuNombre;
                usuarioViejo.UsuPass = usuarioNuevo.UsuPass;
                _context?.Usuarios?.Update(usuarioViejo);
                _context?.SaveChanges();

                return ($"El registro { usuarioViejo.UsuNombre } ha sido modificado");
            }else
            {
                return ($"El usuario { usuarioViejo?.UsuNombre } no se encuentra registrado");
            }
        }catch (System.Exception)
        {
            return "Error al modificar al usuario";
        }
    }
    public IEnumerable<Usuario>? ConsultarTodos() => _context?.Usuarios?.ToList();

    public Usuario? BuscarUsuario(int id) => _context?.Usuarios?.Find(id); 

    public GuardarResponse<Usuario> GuardarUsuario(Usuario usuario)
    {
        try
        {
            var usuarioBuscado = _context?.Usuarios?.Find(usuario.Id);

            if(usuarioBuscado != null)
            {
                return new GuardarResponse<Usuario>("El usuario ya se encuentra registrado");
            }
            _context?.Usuarios?.Add(usuario);
            _context?.SaveChanges();

            return new GuardarResponse<Usuario>(usuario);
        }
        catch (SystemException)
        {
            return new GuardarResponse<Usuario>("Error al guardar al usuario");
        }
    }

    public Usuario? ValidarCredenciales(string nombreUsuario, string contrasena)
    {
        var usuario = _context.Usuarios?.SingleOrDefault(u => (u.UsuNombre == nombreUsuario));

        if (usuario == null || !BC.Verify(contrasena, usuario.UsuPass))
        {
            return null;
        }

        return usuario;
    }

    public Usuario? ConsulterUsuario(string nombreUsuario) => _context.Usuarios?
        .FirstOrDefault(t => t.UsuNombre == nombreUsuario);
}
