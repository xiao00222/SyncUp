using System;

namespace Application.Activities.DTOs;

public class ActivityDto
{
     public required string  Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    //Location Properties
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Lattitude { get; set; }
    public double Longitude { get; set; }

}
