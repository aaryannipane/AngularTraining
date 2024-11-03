using System;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Ajax.Utilities;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Logging;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using Owin;
using WebGrease;

[assembly: OwinStartup(typeof(user_auth_backend.Startup))]

namespace user_auth_backend
{
    public class Startup
    {
        private static readonly string SecretKey = ConfigurationManager.AppSettings["JwtKey"];

        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            var key = Encoding.ASCII.GetBytes(SecretKey);
            
            

            app.Use(async (context, next) =>
            {
                var authHeader = context.Request.Headers["Authorization"];
                if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
                {
                    var encryptedToken = authHeader.Substring("Bearer ".Length).Trim();
                    var decryptedToken = DecryptToken(encryptedToken);
                    context.Request.Headers["Authorization"] = $"Bearer {decryptedToken}";
                }

                await next.Invoke();
            });

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateLifetime = true
                }
            });
        }

        private static string DecryptToken(string encryptedToken)
        {
            var fullCipher = Convert.FromBase64String(encryptedToken);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.ASCII.GetBytes(SecretKey);
                var iv = new byte[aes.BlockSize / 8];
                var cipherText = new byte[fullCipher.Length - iv.Length];

                Buffer.BlockCopy(fullCipher, 0, iv, 0, iv.Length);
                Buffer.BlockCopy(fullCipher, iv.Length, cipherText, 0, cipherText.Length);
                aes.IV = iv;

                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    var decryptedBytes = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);
                    return Encoding.UTF8.GetString(decryptedBytes);
                }
            }
        }
    }
}