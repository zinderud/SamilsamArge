using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

public static class MyExtensions  
{  
    public static void MatchAndMap<TSource, TDestination>(this TSource source, TDestination destination)  
        where TSource : class, new()  
        where TDestination : class, new()  
    {  
        if (source != null && destination != null)  
        {  
            List<PropertyInfo> sourceProperties = source.GetType().GetProperties().ToList<PropertyInfo>();  
            List<PropertyInfo> destinationProperties = destination.GetType().GetProperties().ToList<PropertyInfo>();  
  
            foreach (PropertyInfo sourceProperty in sourceProperties)  
            {  
                PropertyInfo destinationProperty = destinationProperties.Find(item => item.Name == sourceProperty.Name);  
  
                if (destinationProperty != null)  
                {  
                    try  
                    {  
                        destinationProperty.SetValue(destination, sourceProperty.GetValue(source, null), null);  
                    }  
                    catch (Exception ex)  
                    {  
  var k=ex;
                    }  
                }  
            }  
        }  
  
    }  
  
    public static TDestination MapProperties<TDestination>(this object source)  
        where TDestination : class, new()  
    {  
        var destination = Activator.CreateInstance<TDestination>();  
        MatchAndMap(source, destination);  
  
        return destination;  
    }  
          

  public static async Task ForEachAsync<T>(this IList<T> list, Func<T, Task> func)
{
    foreach (var value in list)
    {
        await func(value);
    }
}
}