using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;

public class AddComment
{
    public class Command:IRequest<Result<CommentsDTO>>
    {
        public required string Body { get; set; }
        public required string ActivityId { get; set; }

    }
    public class Handler(ApplicationDbContext context, IMapper mapper, IUserAccessor userAccessor) 
    : IRequestHandler<Command, Result<CommentsDTO>>
    {
        public async Task<Result<CommentsDTO>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity= await context.Activities.Include(x=>x.Comments).ThenInclude(x=>x.User).
            FirstOrDefaultAsync(x=>x.Id==request.ActivityId,cancellationToken);
            if(activity==null) return Result<CommentsDTO>.Failure("Activity not found",404);
             var user= await userAccessor.GetUserAsync();
             var Comment= new Comment
             {
                 UserId=user.Id,
                 ActivityId=activity.Id,
                 Body=request.Body,

             };
             activity.Comments.Add(Comment);
             var result= await context.SaveChangesAsync(cancellationToken)>0;
             return result? Result<CommentsDTO>.Success(
                mapper.Map<CommentsDTO>(Comment))
                : Result<CommentsDTO>.Failure("Failed to add comment",500);
        }
    }
}
