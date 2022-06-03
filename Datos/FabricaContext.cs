using Entidad;
using Microsoft.EntityFrameworkCore;
namespace Datos;

public class FabricaContext : DbContext
{
    public FabricaContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Usuario>? Usuarios { get; set; }
    public DbSet<Pedido>? Pedidos { get; set; }
    public DbSet<Producto>? Productos { get; set; }
}
