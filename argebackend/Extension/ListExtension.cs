using System.Collections.Generic;

public static class ListExtension
{
    public static void Add<T>(this List<T> list, T value, out List<T> newInstance)
    {
        if (list == null) list = new List<T>();
        list?.Add(value);
        newInstance = list;
    }
}
