using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidatar : BaseActivityValidator<CreateActivity.Command,CreateActivityDto>
{
    public CreateActivityValidatar() : base(x=>x.ActivityDto)
    {
      

    }
}
