using System;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{   //Unit represents void type
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }
    public class Handler(ApplicationDbContext context) : IRequestHandler<Command,Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            context.Remove(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("Failed to delete Activity", 404);
            return Result<Unit>.Success(Unit.Value);
           
        }
    }
}
