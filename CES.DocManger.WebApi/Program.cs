using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.Server.Kestrel.Https;
using Microsoft.Extensions.Hosting;
using Org.BouncyCastle.Crypto.Tls;
using System.Security.Cryptography.X509Certificates;

namespace CES.DocManger.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
      
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    //webBuilder.ConfigureKestrel(serverOption =>
                    //{
                    //    serverOption.Listen(System.Net.IPAddress.Loopback, 500);

                    //})
                   webBuilder.UseStartup<Startup>();
                });
        }
    }
}
