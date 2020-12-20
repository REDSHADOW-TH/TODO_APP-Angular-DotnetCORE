using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace todo_api.Models.DB
{
    public partial class todo_dbContext : DbContext
    {
        public todo_dbContext()
        {
        }

        public todo_dbContext(DbContextOptions<todo_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<TodoNote> TodoNotes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-PE93N5J\\SQLEXPRESS;Database=todo_db;Integrated Security=SSPI;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PK__account__F3DBC573207AD896");

                entity.ToTable("account");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .HasColumnName("username");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Password)
                    .HasMaxLength(500)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<TodoNote>(entity =>
            {
                entity.ToTable("todo_note");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Seq).HasColumnName("seq");

                entity.Property(e => e.TextMessage)
                    .HasColumnType("text")
                    .HasColumnName("text_message");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("title");
                
                entity.Property(e => e.CreateBy)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("create_by");
                entity.Property(e => e.Active).HasColumnName("active");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
