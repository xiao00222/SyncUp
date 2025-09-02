using System;
using FluentValidation;
using MediatR;

namespace Application.Core;
//since we dont know the request and response of our handler we will use generics
//pass the request name it validator derive from mediator pipline behaviour and constraint where !null
public class ValidationBehaviour<TRequest, TResponse>(IValidator<TRequest>? validator = null)
: IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {   //if null move to the next in the mediatr pipeline
        if (validator == null) return await next();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        return await next();
        
    }
}
