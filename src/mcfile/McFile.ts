import * as fs from "fs";
import * as path from "path";

import mt = require("./McTool");

export class McFile {
    static CS_ZIP_DELEMITER: string = "#zip/";

    private filepath: string;
    private zipPath: string;
    private segment: string;
    private zipFile: any;

    constructor(filepath: string) {
        let tempPath = path.resolve(mt.McTool.isBlank(filepath) ? "." : filepath);

        this.filepath = tempPath;

        // 检测是否为ZIP内部文件路径
        let segIdx = tempPath.search(McFile.CS_ZIP_DELEMITER);
        if (segIdx !== -1) {
            this.zipPath = tempPath.substring(0, segIdx);
            this.segment = tempPath.substring(segIdx + McFile.CS_ZIP_DELEMITER.length);
            this.zipFile = null;
        }
    }

    fullpath(): string {
        return this.filepath;
    }
    //  basename(): string;
    //  extension(): string;
    //  isHidden(): boolean;
    //  getParent(): string;
    //  getParentFile(): McFile;
    //  getStatsAsync(): Promise<fs.Stats>;
    //  listFilesAsync(): Promise<McFile[]>;
    //  readFileAsync(): Promise<string>;
}
