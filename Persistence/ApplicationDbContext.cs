using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class ApplicationDbContext(DbContextOptions options) :DbContext(options)
{
    
    public DbSet<Activity> Activities { get; set; }
}
