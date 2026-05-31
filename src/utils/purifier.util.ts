class PurifierUtil {

    public static sanitize(input: string): string {
        const prohibited: Record<string, string> = {
            '&': '',
            '<': '',
            '>': '',
            '"': '',
            "'": '',
            '/': '',
        };

        const hasOnlyDigitsAndSpaces = /^[0-9\s]*$/.test(input);
        
        if (hasOnlyDigitsAndSpaces) {
            return input.replace(/\s/g, '');
        } 
        
        return input.replace(/[&<>"'/]/g, (match) => prohibited[match]);;
    }
}

export default PurifierUtil;