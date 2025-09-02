using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger,IHostEnvironment environment) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex);
        }
    }
    //Handles Exceptions aside from the FluenValidation ones
    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        // if in dev mode reutn stack trace else nah
        var response = environment.IsDevelopment()
        ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace) :
        new AppException(context.Response.StatusCode, ex.Message, null);
        //return json format
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(response, options);
        await context.Response.WriteAsync(json);
        
    }

    //Extract the errors we get from ValidationBehaviour in validationException validation.errors
    private async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();
        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                }
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "Validation Failure",
            Title = "Validation error",
            Detail = "One or more validation errors has occured"

        };
        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
