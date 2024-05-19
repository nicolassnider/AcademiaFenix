using AcademiaFenix.Application.Dtos;

namespace AcademiaFenix.Application.Core
{
	public class MappingProfiles:AutoMapper.Profile
    {
        public MappingProfiles() {
            CreateMap<Student, StudentDto>().ReverseMap();
        }

    }
}
