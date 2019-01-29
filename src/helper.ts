export class Helper {
  public static byteString(n: number): string {
    return ("000000000" + n.toString(2)).substr(-8);
  }

  public static hexString(n: number): string {
    return n.toString(16).toUpperCase();
  }

  public static octalString(n: number): string {
    return n.toString(8).toUpperCase();
  }

  public static pad(n: string, width: number): string {
    const z = "0";
    return n.toString().length >= width
      ? n.toString()
      : new Array(width - n.toString().length + 1).join(z) + n;
  }
}
