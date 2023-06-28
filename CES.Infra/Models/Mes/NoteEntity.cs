﻿namespace CES.Infra.Models.Mes
{
    public class NoteEntity
    {
        public int Id { get; set; }

        public string? Address { get; set; }

        public string? Tel { get; set; }

        public DateTime Date { get; set; }

        public string? Comment { get; set; }

        public bool IsChecked { get; set; }
    }
}