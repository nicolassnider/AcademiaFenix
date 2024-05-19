using AcademiaFenix.Application.Dtos;
using AcademiaFenix.Domain.Entities;

namespace AcademiaFenix.Application.Core
{
	public class MappingProfiles:AutoMapper.Profile
    {
        public MappingProfiles() {
            CreateMap<Student, StudentDto>().ReverseMap();
        }

    }
}
