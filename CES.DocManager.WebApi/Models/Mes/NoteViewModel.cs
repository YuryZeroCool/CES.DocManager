﻿namespace CES.DocManager.WebApi.Models.Mes
{
    public class NoteViewModel
    {
        public string Comment { get; set; } = string.Empty;

        public string Date { get; set; }

        public bool IsChecked { get; set; }
    }
}
