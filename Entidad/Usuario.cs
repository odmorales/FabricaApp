using System.ComponentModel.DataAnnotations;

namespace Entidad;
public class Usuario
{
    [Key]
    public int Id { get; set; }
    public string? UsuNombre { get; set; }
    public string? UsuPass { get; set; }
    public string? Rol { get; set; }
}
