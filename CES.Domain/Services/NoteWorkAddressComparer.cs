using CES.Infra.Models.Mes;

namespace CES.Domain.Services
{
    public readonly record struct NoteWorkAddressKey(
        int? StreetId,
        int? HouseNumberId,
        string StreetName,
        string HouseNumber);

    public static class NoteWorkAddressComparer
    {
        public static NoteWorkAddressKey FromNote(NoteEntity note) =>
            new(
                note.StreetId,
                note.HouseNumberId,
                note.Street?.Name?.Trim() ?? string.Empty,
                note.HouseNumber?.Number?.Trim() ?? string.Empty);

        public static NoteWorkAddressKey FromNames(string street, string houseNumber) =>
            new(null, null, street.Trim(), houseNumber.Trim());

        public static bool IsComplete(NoteWorkAddressKey key) =>
            !string.IsNullOrWhiteSpace(key.StreetName)
            && !string.IsNullOrWhiteSpace(key.HouseNumber);

        public static bool Equals(NoteWorkAddressKey left, NoteWorkAddressKey right)
        {
            if (left.StreetId.HasValue && right.StreetId.HasValue
                && left.HouseNumberId.HasValue && right.HouseNumberId.HasValue)
            {
                return left.StreetId == right.StreetId
                    && left.HouseNumberId == right.HouseNumberId;
            }

            return string.Equals(left.StreetName, right.StreetName, StringComparison.OrdinalIgnoreCase)
                && string.Equals(left.HouseNumber, right.HouseNumber, StringComparison.OrdinalIgnoreCase);
        }

        public static void EnsureActsShareSameWorkAddressForPrint(IReadOnlyList<ActEntity> acts)
        {
            var allNotes = acts
                .SelectMany(a => a.Notes ?? Enumerable.Empty<NoteEntity>())
                .ToList();

            if (allNotes.Count == 0)
            {
                throw new System.Exception("У актов договора нет заявок с адресом работ");
            }

            foreach (var note in allNotes)
            {
                if (!IsComplete(FromNote(note)))
                {
                    throw new System.Exception(
                        "Для печати договора у всех заявок должны быть указаны улица и дом");
                }
            }

            var reference = FromNote(allNotes[0]);
            for (var i = 1; i < allNotes.Count; i++)
            {
                if (!Equals(reference, FromNote(allNotes[i])))
                {
                    throw new System.Exception(
                        "Для печати договора все акты должны относиться к одному адресу (улица и дом, подъезд не учитывается)");
                }
            }
        }
    }
}
