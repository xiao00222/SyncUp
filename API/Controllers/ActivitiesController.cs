    using System;
    using Domain;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Persistence;

    namespace API.Controllers;

    public class ActivitiesController : BaseApiController
    {
        private readonly ApplicationDbContext _context;
        public ActivitiesController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(string id)
        {
            var Activity = await _context.Activities.FindAsync(id);
            if (Activity == null) return NotFound("Activity not found");
            return Activity;
        }
    }
