using System;
using System.Runtime.Serialization;
using System.Reflection;
using System.Security.Permissions;

namespace companyweb.Models
{
    [Serializable]
    public class SerializableBasic: ISerializable
    {
        protected  virtual Type myType
        {
            get { return GetType(); }
        }

        public SerializableBasic() { }

        protected SerializableBasic(SerializationInfo info, StreamingContext context)
        {
            if (info == null)
                throw new ArgumentNullException("info");

            PropertyInfo[] properties = myType.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.SetProperty | BindingFlags.GetProperty);
            foreach (PropertyInfo property in properties)
            {
                object value = info.GetValue(property.Name, property.PropertyType);
                property.SetValue(this, value, null);
            }
        }

        [SecurityPermission(SecurityAction.LinkDemand, Flags = SecurityPermissionFlag.SerializationFormatter)]
        public virtual void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            if (info == null)
                throw new ArgumentNullException("info");

            PropertyInfo[] properties = myType.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.SetProperty | BindingFlags.GetProperty);
            foreach (PropertyInfo property in properties)
            {
                object value = property.GetValue(this, null);
                info.AddValue(property.Name, value, property.PropertyType);
            }
        }

        /// <summary>
        /// 用于生成指定字符个数组成的唯一编码串
        /// </summary>
        /// <returns></returns>
        public static string CreateCode(int len = 19)
        {
            byte[] buffer = Guid.NewGuid().ToByteArray();
            ulong val = BitConverter.ToUInt64(buffer, 0);
            string valStr = val.ToString();

            if (valStr.Length < len)
            {
                valStr = CreateEmptyCode(valStr.Length - len) + valStr;
                return valStr;
            }

            if (valStr.Length > len)
            {
                valStr = valStr.Substring(valStr.Length - len);
                return valStr;
            }

            return valStr;
        }

        /// <summary>
        /// 用于生成指定个数字符‘\0’组成的编码
        /// </summary>
        /// <returns></returns>
        public static string CreateEmptyCode(int len = 19)
        {
            byte[] buffer = new byte[len];
            Array.Clear(buffer, 0, len);

            string valStr = string.Join("", buffer);
            return valStr;
        }

        /// <summary>
        /// 用于生成指定个数指定字符组成的编码
        /// </summary>
        /// <param name="val"></param>
        /// <param name="len"></param>
        /// <returns></returns>
        public static string CreateValueCode(byte val, int len = 19)
        {
            byte[] buffer = new byte[len];
            for (int i = 0; i < len; i++)
                buffer[i] = val;

            string valStr = string.Join("", buffer);
            return valStr;
        }
    }
}
