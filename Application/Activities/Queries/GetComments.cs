using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetComments
{
    public class Query:IRequest<Result<List<CommentsDTO>>>
    {
        public required string ActivityId { get; set; }
    }
    public class Handler(ApplicationDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<CommentsDTO>>>
    {
        public async Task<Result<List<CommentsDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comments= await context.Comments.Where(x=>x.ActivityId==request.ActivityId).OrderByDescending(x=>x.CreatedAt)
            .ProjectTo<CommentsDTO>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
            return Result<List<CommentsDTO>>.Success(comments);
        }
    }
}
