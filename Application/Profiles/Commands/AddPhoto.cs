using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public required IFormFile File { get; set; }
    }
    public class Handler(IUserAccessor userAccessor, ApplicationDbContext context, IPhotoService photoService)
    : IRequestHandler<Command, Result<Photo>>
    {
        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadresult = await photoService.UploadPhoto(request.File);
            if (uploadresult == null)
            {
                return Result<Photo>.Failure("Failed to upload Photo", 400);
            }
            var user = await userAccessor.GetUserAsync();
            var photo = new Photo
            {
                PublicId = uploadresult.PublicId,
                UserId = user.Id,
                Url = uploadresult.Url
            };
            user.ImageUrl ??= photo.Url;
            context.Photos.Add(photo);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result
            ? Result<Photo>.Success(photo)
            : Result<Photo>.Failure("problem saving photo to db", 400);
        }
    }
}
