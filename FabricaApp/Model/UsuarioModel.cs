using Entidad;
using System.ComponentModel.DataAnnotations;
using BC = BCrypt.Net.BCrypt;


namespace FabricaApp.Model
{
    public class UsuarioInputModel
    {
        [Required(ErrorMessage = "El usuario es requerido")]
        public string? UsuNombre { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string? UsuPass { get; set; }
    }

    public class UsuarioViewModel: UsuarioInputModel
    {
        public UsuarioViewModel(Usuario usuario)
        {
            this.Id = usuario.Id;
            this.UsuNombre = usuario.UsuNombre;
            this.UsuPass = usuario.UsuPass;
        }
        public int Id { get; set; }
    }

    public class UsuarioUpdateModel
    {
        public string? UsuNombre { get; set; }
        public string? UsuPass { get; set; }
    }
}