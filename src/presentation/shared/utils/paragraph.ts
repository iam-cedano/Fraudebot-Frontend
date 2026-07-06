class Paragraph {
  public static RemoveWhitespaces(input: string): string {
    return input.replace(/[\s\u00A0]/g, "");
  }
}

export default Paragraph;
