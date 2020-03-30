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
