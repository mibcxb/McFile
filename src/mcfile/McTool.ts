export class McTool {
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
        if (!cs) {
            return true;
        }
        if (cs.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
            return true;
        }
        return false;
    }
}
