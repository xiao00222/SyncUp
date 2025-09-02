using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }  
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; 
    //Location Properties
    public string City { get; set; } = string.Empty; 
    public string Venue { get; set; } = string.Empty; 
    public double Lattitude { get; set; } 
    public double Longitude { get; set; } 

}
