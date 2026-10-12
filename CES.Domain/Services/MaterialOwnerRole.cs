namespace CES.Domain.Services
{
    public static class MaterialOwnerRole
    {
        public const string SuperAdmin = "superadmin";

        public static string[] VisibleFor(string currentRole)
        {
            return new[] { currentRole };
        }

        public static void EnsureOwn(string currentRole, string? ownerRole)
        {
            if (ownerRole != currentRole)
            {
                throw new System.Exception("Недостаточно прав для этой операции");
            }
        }
    }
}
