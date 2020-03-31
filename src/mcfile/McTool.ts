export function isEmpty(cs: string): boolean {
    if (!cs) {
        return true;
    }
    if (cs.length === 0) {
        return true;
    }
    return false;
}

export function isBlank(cs: string): boolean {
    if (isEmpty(cs)) {
        return true;
    }
    if (cs.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
        return true;
    }
    return false;
}

export function zeroLeftPad(str, len) {
    const padding: string = "00000000";
    const count: number = len - str.length;

    if (count <= 0) return str;

    if (count <= padding.length) {
        return padding.substring(0, count) + str;
    }

    str = padding + str;
    return leftpad(str, len);
}
