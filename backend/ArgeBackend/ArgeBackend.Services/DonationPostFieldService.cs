using ArgeBackend.DTO;
using ArgeBackend.Entities;
using ArgeBackend.Services.Infrastructure;
using ArgeBackend.Services.Infrastructure.Repositories;
using ArgeBackend.Services.Infrastructure.Services;
using ArgeBackend.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArgeBackend.Services
{
    public class DonationPostFieldService<TDonationPostField> : BaseService, IDonationPostFieldService where TDonationPostField : DonationPostField, new()
    {
        protected readonly IDonationPostFieldRepository<TDonationPostField> donationPostFieldRepository;

        public DonationPostFieldService(ICurrentContextProvider contextProvider, IDonationPostFieldRepository<TDonationPostField> donationPostFieldRepository) : base(contextProvider)
        {
            this.donationPostFieldRepository = donationPostFieldRepository;
        }

        public async Task<IEnumerable<DonationPostFieldDTO>> GetList(int? donationPostId, bool includeDeleted = false)
        {
            var entitiy = await donationPostFieldRepository.GetList(donationPostId, Session, includeDeleted);
            return entitiy.MapTo<IEnumerable<DonationPostFieldDTO>>();
        }

        public async Task<bool> Delete(int id)
        {
            await donationPostFieldRepository.Delete(id, Session);
            return true;
        }

        public async Task<DonationPostFieldDTO> Edit(DonationPostFieldDTO dto)
        {
            var donationPostField = dto.MapTo<TDonationPostField>();
            await donationPostFieldRepository.Edit(donationPostField, Session);
            return donationPostField.MapTo<DonationPostFieldDTO>();
        }

        public async Task<DonationPostFieldDTO> GetById(int id, bool includeDeleted = false)
        {
            var donationPostField = await donationPostFieldRepository.Get(id, Session, includeDeleted);
            return donationPostField.MapTo<DonationPostFieldDTO>();
        }

        public async Task<IEnumerable<DonationPostFieldDTO>> GetByDonationPostId(int donationPostId, bool includeDeleted = false)
        {
            var donationPostField = await donationPostFieldRepository.GetByDonationPostId(donationPostId, Session, includeDeleted);
            return donationPostField.MapTo<IEnumerable<DonationPostFieldDTO>>();
        }
    }
}
