using System.Data.Entity;

namespace companyweb.Models
{
    public class EFDbContext : DbContext
    {
        public DbSet<Userinfo> Userinfos { get; set; }

        public DbSet<Article> Articles { get; set; }

        public DbSet<ArticleFile> ArticleFiles { get; set; }
    }
}
