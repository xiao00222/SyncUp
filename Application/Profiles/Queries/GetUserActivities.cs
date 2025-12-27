using System;
using System.Security.Cryptography.X509Certificates;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query:IRequest<Result<List<UserActivityDTO>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
    }
    public class Handler(ApplicationDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDTO>>>
    {
        public async Task<Result<List<UserActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query=context.ActivityAttendees.Where(u=>u.UserId==request.UserId).OrderBy(a=>a.Activity.Date)
            .Select(x=>x.Activity).AsQueryable();
            var today=DateTime.UtcNow;
            query=request.Filter switch
            {
                "past"=>query.Where(a=>a.Date<=today&&a.Attendees.Any(x=>x.UserId==request.UserId)),
                "hosting"=>query.Where(a=>a.Attendees.Any(x=>x.IsHost&&x.UserId==request.UserId)),
                _=>query.Where(a=>a.Date>=today&&a.Attendees.Any(x=>x.UserId==request.UserId))
            };
            var projectedActivities= query.ProjectTo<UserActivityDTO>(mapper.ConfigurationProvider);
            var activities=await projectedActivities.ToListAsync(cancellationToken);
            return Result<List<UserActivityDTO>>.Success(activities);
        }
    }
}
