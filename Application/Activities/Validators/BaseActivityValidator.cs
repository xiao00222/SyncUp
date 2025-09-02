using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T,TDto>:AbstractValidator<T> where TDto:BaseActivityDto
{
    public BaseActivityValidator(Func<T,TDto> selector)
    {
          RuleFor(x => selector(x).Title).NotEmpty().WithMessage("Title Is required")
        .MaximumLength(100).WithMessage("Title must not exceed 100 character");
        RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description Is required");
        RuleFor(x => selector(x).Date)
        .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future");
        RuleFor(x => selector(x).Category).NotEmpty().WithMessage("Category Is required");
        RuleFor(x => selector(x).City).NotEmpty().WithMessage("City Is required");
        RuleFor(x => selector(x).Venue).NotEmpty().WithMessage("Venue Is required");
        RuleFor(x => selector(x).Lattitude).NotEmpty().WithMessage("Lattitude Is required").InclusiveBetween(-90, 90).WithMessage("Lattitude must be between -90 and 90");
        RuleFor(x => selector(x).Longitude).NotEmpty().WithMessage("Longitude Is required").InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180");
    }
}
