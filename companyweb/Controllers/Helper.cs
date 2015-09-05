using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace companyweb.Controllers
{
    public static class Helper
    {
        public static bool Contains(this string source, string[] items)
        {
            bool flag = false;

            if (items == null)
                return flag;

            for (int i = 0; i < items.Length; i++)
            {
                flag |= source.Contains(items[i]);
            }

            return flag;
        }
    }
}
