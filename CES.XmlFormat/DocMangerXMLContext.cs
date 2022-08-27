using NPOI.SS.UserModel;

namespace CES.XmlFormat
{
    public class DocMangerXMLContext
    {
        public IWorkbook workbook { get; }

        public DocMangerXMLContext(string nameFile)
        {
            workbook = WorkbookFactory.Create(nameFile);
        }
    }
}
