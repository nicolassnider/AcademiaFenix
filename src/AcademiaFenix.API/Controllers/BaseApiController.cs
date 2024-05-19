﻿using AcademiaFenix.API.Extensions;
using AcademiaFenix.Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AcademiaFenix.API.Controllers
{
	[ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected readonly IMediator _mediator;
        public BaseApiController(IMediator mediator)
        {
            _mediator = mediator;
        }

        protected ActionResult HandleResult<T>(Result<T> result){
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);
            if (result.IsSuccess && result.Value ==null) return NotFound();
            return BadRequest(result.Error);
        }

        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            if(result == null ) return NotFound();
            if(result.IsSuccess && result.Value!=null)
            {
                Response.AddPaginationHeader(
                    result.Value.CurrentPage, 
                    result.Value.PageSize,
                    result.Value.TotalCount, 
                    result.Value.TotalPages);
                return Ok(result.Value);
            }
            if(result.IsSuccess && result.Value==null) return NotFound();
            return BadRequest(result.Error);
        }

        protected ActionResult HandleException(Exception ex,string message)
        {
            return StatusCode(500,message);
        }
    }
}
