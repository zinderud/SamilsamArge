 
/// <summary>
/// Helper methods for objects
/// </summary>
export class TypeHelper {

    public static int = {
        minValue: -0x80000000,
        maxValue: 0x7fffffff
    };

    public static isNullOrEmpty<T>(value: T | undefined | null): boolean {
        return value === undefined || value === null;
    }

    public static notNullOrEmpty<T>(value: T | undefined | null, valueIfNull: T): T {
        return TypeHelper.isNullOrEmpty(value) ? valueIfNull : value;
    }

    public static toString(value: any | undefined | null, valueIfNull?: string | undefined | null): string {
        if (TypeHelper.isNullOrEmpty(value)) {
            return TypeHelper.isNullOrEmpty(valueIfNull) ? '' : valueIfNull;
        } else {
            return value.toString();
        }
    }

  static  isNumber(value: string | number): boolean {
        return ((value != null) && !isNaN(Number(value.toString())));
      }
    
   static   NumberOrDefaoult(value) {
        if (this.isNumber(value)) {
          return Number(value);
        } else {
          return 0;
        }
      }

    /// <summary>
    /// Compare the two values. Use only for comparing scalar values, strings or arrays. For objects, use shallowEquals.
    /// </summary>
    public static compare<T>(objA: T, objB: T, resultIfNonComparable: number, caseInsensitiveStringComparison?: boolean | undefined | null): number {
        // null/undefined ?
        if (TypeHelper.isNullOrEmpty(objA)) {
            if (TypeHelper.isNullOrEmpty(objB)) {
                return 0;
            } else {
                return -1;
            }
        } else if (TypeHelper.isNullOrEmpty(objB)) {
            return 1;
 } else if (typeof objA === 'string' && typeof objB === 'string' && caseInsensitiveStringComparison === true) {
            const strA = (objA as String).toLowerCase();
            const strB = (objB as String).toLowerCase();

            if (strA < strB) {
                return -1;
            } else if (strA > strB) {
                return 1;
 } else {
                return 0;
 }
        } else if (objA instanceof Array && objB instanceof Array) {
            return this.compareArray(objA as any[], objB as any[], resultIfNonComparable, caseInsensitiveStringComparison);
        } else {
            if (objA < objB) {
                return -1;
            } else if (objA > objB) {
                return 1;
 } else if (objA === objB) {
                return 0;
 } else {
                return resultIfNonComparable;
 }
        }
    }

    /// <summary>
    /// Compare the two objects by their members. Use only for comparing objects!
    /// </summary>
    public static shallowEquals<T>(objA: T, objB: T, caseInsensitiveStringComparison?: boolean | undefined | null): boolean {
        // null/undefined?
        if (TypeHelper.isNullOrEmpty(objA)) {
            return TypeHelper.isNullOrEmpty(objB);
        } else if (TypeHelper.isNullOrEmpty(objB)) {
            return false;
 } else if (typeof objA === 'string' && typeof objB === 'string' && caseInsensitiveStringComparison === true) {
            return (objA as String).toLowerCase() === (objB as String).toLowerCase();
 } else if (objA instanceof Array && objB instanceof Array) {
            return this.compareArray(objA as any as any[], objB as any as any[], -1, caseInsensitiveStringComparison) === 0;
 } else {
            const keys = [];

            for (const key in objA) {
                keys.push(key);
            }

            if (keys.length === 0) {
                return TypeHelper.compare(objA, objB, -1, caseInsensitiveStringComparison) === 0;
            } else {
                let i = 0;

                for (const key in objB) {
                    if (key !== keys[i++] || TypeHelper.compare(objA[key], objB[key], -1, caseInsensitiveStringComparison) !== 0) {
                        return false;
                    }
                }

                return true;
            }
        }
    }


    public static isArrayNullOrEmpty(array: any[] | undefined | null): boolean {
        return array === undefined || array === null || array.length === 0;
    }
    public static isArrayNullOrAllItemsAreEmpty(array: any[] | undefined | null): boolean {
        return this.isArrayNullOrEmpty(array) || this.all(array, t => TypeHelper.isNullOrEmpty(t));
    }
    public static isNullOrAllItemsAreEmpty(obj: any | undefined | null): boolean {
        if (obj instanceof Array) {
            return this.isNullOrAllItemsAreEmpty(obj as any[]);
        } else {
            return TypeHelper.isNullOrEmpty(obj);
        }
    }

    public static all<T>(array: T[], predicate: (item: T) => boolean, from?: number | undefined | null, to?: number | undefined | null) {
        return !this.any(array, t => !predicate(t), from, to);
    }

    public static any<T>(array: T[], predicate: (item: T) => boolean, from?: number | undefined | null, to?: number | undefined | null) {
        if (TypeHelper.isNullOrEmpty(from)) {
            from = 0;
        }

        if (TypeHelper.isNullOrEmpty(to)) {
            to = array.length - 1;
        }

        let result = false;

        for (let i = from; i <= to; i++) {
            if (predicate(array[i])) {
                result = true;
                break;
            }
        }

        return result;
    }

    public static compareArray<T>(array1: T[], array2: T[], resultIfNonComparable: number, caseInsensitiveStringComparison?: boolean | undefined | null): number {
        if (array1 === undefined || array2 === undefined) {
            if (array2 === undefined || array2 === null) {
                return 0;
            } else {
                return -1;
            }
        } else if (array2 === undefined || array2 === null) {
            return 1;
 } else {
            const len1 = array1.length;
            const len2 = array2.length;

            if (len1 < len2) {
                return -1;
            } else if (len2 < len1) {
                return 1;
 } else {
                for (let i = 0; i < len1; i++) {
                    const res = TypeHelper.compare(array1[i], array2[i], resultIfNonComparable, caseInsensitiveStringComparison);

                    if (res != 0) {
                        return res;
                    }
                }

                return 0;
            }
        }
    }
}
