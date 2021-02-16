using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using argebackend.Models;
using argebackend.ViewModels;

namespace argebackend.Services.Interfaces
{
    public interface IStatsService
    {
        Task<ProcessResult<List<Basvuru>>> BasvuruSearchTimeAsync(string time);


        Task<CountStats> BasvuruCountStats();
    }
}