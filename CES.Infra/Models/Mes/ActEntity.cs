﻿using CES.Infra.Models.Drivers;

namespace CES.Infra.Models.Mes
{
    public class ActEntity
    {
        public int Id { get; set; }

        public DateTime ActDateOfCreation { get; set; }

        public DateTime DateOfWorkCompletion { get; set; }

        public decimal Total { get; set; }

        public decimal? Vat { get; set; }

        public int OrganizationId { get; set; }

        public OrganizationEntity? Organization { get; set; }

        public int EmployeeId { get; set; }

        public int NumberPlateOfCarId { get; set; }

        public NumberPlateOfCarEntity? NumberPlateOfCar { get; set; }

        public EmployeeEntity? Employee { get; set; }

        public int ActTypeEntityId { get; set; }

        public ActTypeEntity? ActType { get; set; }

        public string? WorkPerformAct {get;set;}

        public ICollection<NoteEntity>? Notes { get; set; } = new List <NoteEntity> ();
    }
}
