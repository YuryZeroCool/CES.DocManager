using System;
using CES.Domain.Models.Request.Mes.Organization;

namespace CES.Domain.Models
{
	public class ContractBaseModel
	{
		public int Id { get; set; }

    public string ContractType { get; set; } = string.Empty;

    public string OrganizationName { get; set; } = string.Empty;

    public string ContractNumber { get; set; } = string.Empty;

    public DateTime CreationDate { get; set; }

    public DateTime? StartDateOfWork { get; set; }

    public DateTime? EndDateOfWork { get; set; }

    public DateTime? ExpirationDate { get; set; }

    public bool IsPrinted { get; set; }

    public bool HasLinkedAct { get; set; }

    public int ActsCount { get; set; }

    public Organization? Organization { get; set; }
	}
}
