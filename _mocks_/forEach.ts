

export function forEach(items:Array<object>, callback:(str: object) => void) {
    for (const item of items) {
      callback(item);
    }
}