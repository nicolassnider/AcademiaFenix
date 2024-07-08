﻿using AcademiaFenix.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademiaFenix.Application.Core
{
    public class MappingProfiles:AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Student,Student>();
            CreateMap<Student,StudentDto>().ReverseMap();
        }
    }
}
