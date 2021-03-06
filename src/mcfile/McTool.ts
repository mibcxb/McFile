export default class McTool {
    static isEmpty(cs: string): boolean {
        if (!cs) {
            return true;
        }
        if (cs.length === 0) {
            return true;
        }
        return false;
    }

    static isBlank(cs: string): boolean {
        if (McTool.isEmpty(cs)) {
            return true;
        }
        if (cs.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
            return true;
        }
        return false;
    }

    static zeroLeftPad(str: string, len: number) {
        const padding: string = "00000000";
        const count: number = len - str.length;

        if (count <= 0) return str;

        if (count <= padding.length) {
            return padding.substring(0, count) + str;
        }

        str = padding + str;
        return McTool.zeroLeftPad(str, len);
    }
}
