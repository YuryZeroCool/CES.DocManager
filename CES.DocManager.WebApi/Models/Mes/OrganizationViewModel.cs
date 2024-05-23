﻿namespace CES.DocManager.WebApi.Models.Mes
{
    public class OrganizationViewModel
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? PayerAccountNumber { get; set; }

        public string? Address { get; set; }

        public string? Email { get; set; } 

        public string? Phone { get; set; }

        public string OrganizationType {  get; set; } = string.Empty;

    }
}
