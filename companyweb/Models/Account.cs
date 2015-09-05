using System;
using System.Runtime.Serialization;
using System.Security.Permissions;

namespace companyweb.Models
{
    [Serializable]
    public class Account: ISerializable
    {
        private static readonly string username_n = "account_name";
        private static readonly string password_n = "account_pwd";

        private string _username;
        private string _password;

        public Account() { }

        protected Account(SerializationInfo info, StreamingContext context)
        {
            if (info == null)
                throw new ArgumentNullException("info");

            _username = (string)info.GetValue(username_n, typeof(string));
            _password = (string)info.GetValue(password_n, typeof(string));
        }

        [SecurityPermission(SecurityAction.LinkDemand, Flags = SecurityPermissionFlag.SerializationFormatter)]
        public virtual void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            if (info == null)
                throw new ArgumentNullException("info");

            info.AddValue(username_n, _username);
            info.AddValue(password_n, _password);
        }

        public string Username
        {
            get { return _username; }
            set { _username = value; }
        }

        public string Password
        {
            get { return _password; }
            set { _password = value; }
        }
    }
}