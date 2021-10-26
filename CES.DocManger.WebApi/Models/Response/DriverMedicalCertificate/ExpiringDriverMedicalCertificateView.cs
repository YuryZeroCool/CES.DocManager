using System;

namespace CES.DocManger.WebApi.Models.Response.DriverMedicalCertificate
{
    public class ExpiringDriverMedicalCertificateView
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
       
        public string PersonnelNumber {get;set;}
     
        public string DivisionNumber {get;set;}
    
        public DateTime BirthDate{get;set;}
    
        public  DateTime  ExpiryDate {get;set;}
    }
}
