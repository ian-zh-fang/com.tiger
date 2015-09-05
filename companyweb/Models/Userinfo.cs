using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace companyweb.Models
{
    [Serializable]
    public class Userinfo:SerializableBasic
    {
        private int _id = 0;
        private string _code = CreateCode();
        private string _username = CreateEmptyCode(6);
        private string _password = CreateEmptyCode(6);
        private string _authenticcategory = CreateEmptyCode(10);
        private string _name = CreateEmptyCode(12);
        private int _category = 0;
        private int _enable = 0;
        private DateTime _createdatetime = DateTime.Now;

        public Userinfo() { }

        protected Userinfo(SerializationInfo info, StreamingContext context) :base(info, context) { }

        //  用户ID
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        //  编码，这是一个19个字符组成的标识
        [Key]
        public string Code
        {
            get { return _code; }
            set { _code = value; }
        }

        //  登录账户名称
        public string Username
        {
            get { return _username; }
            set { _username = value; }
        }

        //  登录账户密码
        public string Password
        {
            get { return _password; }
            set { _password = value; }
        }

        //  登录账户所拥有的权限组。
        public string Authenticcategory
        {
            get { return _authenticcategory; }
            set { _authenticcategory = value; }
        }

        //  姓名
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        //  用户类别。( 1:超级管理员) ( 2:审核员) ( 3:正常用户) 
        public int Category
        {
            get { return _category; }
            set { _category = value; }
        }

        //  用户状态码:( 0:禁用) ( 1:启用) ( 2:待定) 
        public int Enable
        {
            get { return _enable; }
            set { _enable = value; }
        }

        //  创建时间
        public DateTime Createdatetime
        {
            get { return _createdatetime; }
            set { _createdatetime = value; }
        }

        protected override Type myType
        {
            get
            {
                return GetType();
            }
        }
    }
}
