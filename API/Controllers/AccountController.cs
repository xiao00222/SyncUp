using System;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly SignInManager<User> _signinManager;
    public AccountController(SignInManager<User> signInManager)
    {
        _signinManager = signInManager;
    }
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDTO registerDTO)
    {
        var user = new User
        {
            DisplayName = registerDTO.DisplayName,
            Email = registerDTO.Email,
            UserName = registerDTO.Email
        };
        var result = await _signinManager.UserManager.CreateAsync(user, registerDTO.Password);
        if (result.Succeeded) return Ok();
        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }
        return ValidationProblem();
    }
    [HttpGet("user-info")]
    public async Task<ActionResult> Getuserinfo()
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent();
        var user = await _signinManager.UserManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        return Ok(
            new
            {
                user.DisplayName,
                user.Email,
                user.Id,
                user.ImageUrl
            }
        );
    }
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await _signinManager.SignOutAsync();
        return NoContent();
    }
}
