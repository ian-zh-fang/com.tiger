using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace companyweb.Models
{
    [Serializable]
    public class ArticleFile:SerializableBasic
    {
        private int _id = 0;
        private string _code = CreateCode();
        private string _name = string.Empty;
        private string _title = string.Empty;
        private string _desc = string.Empty;
        private string _mime = string.Empty;
        private int _category = (int)FileCategory.None;
        private string _articlecode = CreateEmptyCode();
        private DateTime _createdatetime = DateTime.Now;

        public ArticleFile() { }

        public ArticleFile(SerializationInfo info, StreamingContext context) : base(info, context) { }

        //  文件ID
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        //  文件编号，这是一个19个字符组成的字符串
        [Key]
        public string Code
        {
            get { return _code; }
            set { _code = value; }
        }

        //  文件名称
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        //  文件标题
        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }

        //  文件描述信息
        public string Desc
        {
            get { return _desc; }
            set { _desc = value; }
        }

        //  文件MIME类型
        public string Mime
        {
            get { return _mime; }
            set { _mime = value; }
        }

        //  文件类型:( 1:一般文件) ( 2:图片文件) ( 3:图像文件) 
        public int Category
        {
            get { return _category; }
            set { _category = value; }
        }

        //  文件所属文章
        public string Articlecode
        {
            get { return _articlecode; }
            set { _articlecode = value; }
        }

        //  文件创建时间
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

        //文件类型
        public enum FileCategory:byte
        {
            None = 0x00,
            Normal = 0x01,
            Img = 0x02,
            Media = 0x03,
        }
    }
}
