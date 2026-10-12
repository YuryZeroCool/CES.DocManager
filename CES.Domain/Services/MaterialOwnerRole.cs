namespace CES.Domain.Services
{
    public static class MaterialOwnerRole
    {
        public static string[] VisibleFor(string currentRole)
        {
            return new[] { currentRole };
        }
    }
}
