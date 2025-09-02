using System;

namespace Application.Core;

public class AppException(int StatusCode, string Message, string? Details)
{
    public int StatusCode { get; set; } = StatusCode;
    public string Message { get; set; } = Message;
    public string? Details { get; set; } = Details; 
}
