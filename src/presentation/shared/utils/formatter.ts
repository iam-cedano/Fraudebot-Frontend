class Formatter {
  /**
   * @author Oscar Cedano <oscar.cedano@outlook.com>
   * @param value - The input value to format.
   * @param e - Callback function to update the input value.
   * @description This method formats the input value by following the pattern: 1234 2415 1512 1234
   * @returns The formatted input value.
   */
  public static formatInputAndUpdate(
    value: string,
    e: (v: string) => void,
  ): void {
    if (/^[\d\s]+$/.test(value) === false) {
      e(value);

      return;
    }

    const formattedValue: string = value.replace(/\D/g, "").trim();
    const length: number = formattedValue.length;

    if (length <= 0) {
      e("");
    } else if (length == Formatter.getCardNumberLength()) {
      e(Formatter.formatCardNumber(formattedValue));
    } else if (length == Formatter.getAccountOrPhoneNumberLength()) {
      e(Formatter.formatAccountOrPhoneNumber(formattedValue));
    } else if (length == Formatter.getClabeNumberLength()) {
      e(Formatter.formatClabeNumber(formattedValue));
    } else {
      e(formattedValue);
    }

    console.info("Formatted Applied!");
  }

  /**
   * @author Oscar Cedano <oscar.cedano@outlook.com>
   * @author Gemini App
   * @param value - The account or mobile number in string to format.
   * @description This method formats an account or mobile number by following the pattern: 1234 241 1512
   * @returns The formatted account or mobile number.
   */
  public static formatAccountOrPhoneNumber(value: string): string {
    if (!value) return "";

    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // Break the string into the 4-3-4 pattern
    const part1 = cleaned.substring(0, 4);
    const part2 = cleaned.substring(4, 7);
    const part3 = cleaned.substring(7, 11);

    // Reconstruct the string based on its current length
    if (cleaned.length > 7) {
      return `${part1} ${part2} ${part3}`;
    } else if (cleaned.length > 4) {
      return `${part1} ${part2}`;
    }

    return part1;
  }
  /**
   * @author Oscar Cedano <oscar.cedano@outlook.com>
   * @author Gemini App
   * @param value - The card number in string to format.
   * @description This method formats a card number by following the pattern: 1234 2415 1512 1234
   * @returns The formatted card number.
   */
  public static formatCardNumber(value: string): string {
    if (!value) return "";

    // Remove all non-digit characters and strictly limit to 16 digits
    const cleaned = value.replace(/\D/g, "").substring(0, 16);

    // Insert a space after every group of 4 digits using Regex
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  }

  /**
   * @author Oscar Cedano <oscar.cedano@outlook.com>
   * @author Gemini App
   * @param value - The CLABE number in string to format.
   * @description This method formats a CLABE number by following the pattern: 1234 1234 1234 1234 12
   * @returns The formatted CLABE number.
   */
  public static formatClabeNumber(value: string): string {
    if (!value) return "";

    // Remove all non-digit characters and strictly limit to 18 digits (Standard CLABE length)
    const cleaned = value.replace(/\D/g, "").substring(0, 18);

    // Insert a space after every group of 4 digits using Regex
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  }

  /**
   * @author Oscar Cedano <oscar.cedano@outlook.com>
   * @returns The length of a card number.
   */
  private static getCardNumberLength(): number {
    return 16;
  }

  /**
   * @author Oscar Cedano <oscar.cedano@outlook.com>
   * @returns The length of an bank account or mobile number
   */
  private static getAccountOrPhoneNumberLength(): number {
    return 10;
  }

  private static getClabeNumberLength(): number {
    return 18;
  }
}

export default Formatter;
