import * as fs from "fs";
import * as path from "path";

import McTool from "./McTool";
import McFileStat from "./McFileStat";

export class McFile {
    static CS_ZIP_DELEMITER: string = "#zip/";

    private filepath: string;
    private fileStat: McFileStat = null;

    private zipPath: string = null;
    private segment: string = null;

    constructor(filepath: string) {
        const resolved = path.resolve(McTool.isBlank(filepath) ? "." : filepath);

        this.filepath = resolved;

        // 检测是否为ZIP内部文件路径
        const segIdx = resolved.search(McFile.CS_ZIP_DELEMITER);
        if (segIdx !== -1) {
            this.zipPath = resolved.substring(0, segIdx);
            this.segment = resolved.substring(segIdx + McFile.CS_ZIP_DELEMITER.length);
        }
    }

    fullpath(): string {
        return this.filepath;
    }

    basename(): string {
        return path.basename(this.isRealFile() ? this.filepath : this.segment);
    }

    extension(): string {
        return path.extname(this.basename());
    }

    //  isHidden(): boolean;
    getParent(): string {
        if (this.isRealFile()) {
            return path.dirname(this.filepath);
        }
        const dirname = path.dirname(this.segment);
        if (dirname === ".") {
            return this.zipPath;
        }
        return this.zipPath + McFile.CS_ZIP_DELEMITER + dirname + "/";
    }

    getParentFile(): McFile {
        return new McFile(this.getParent());
    }

    readStatAsync(): Promise<McFileStat> {
        return this.tryReadFileStatAsync();
    }
    //  readFileAsync(): Promise<string>;
    //  listFilesAsync(): Promise<McFile[]>;
    private isRealFile(): boolean {
        return this.segment == null;
    }
    private isZipFile(): boolean {
        return this.extension() === ".zip";
    }
    private async tryReadFileStatAsync(): Promise<McFileStat> {
        if (this.fileStat == null) {
            if (this.isRealFile()) {
                this.fileStat = await this.tryNormalFileStatAsync();
            } else {
                this.fileStat = await this.tryZippedFileStatAsync();
            }
        }
        return this.fileStat;
    }

    private async tryNormalFileStatAsync(): Promise<McFileStat> {
        return this.checkReadableAsync()
            .then(() => fs.promises.stat(this.filepath))
            .then((fstats) => {
                return new Promise((resolve) => {
                    const stat: McFileStat = new McFileStat();
                    stat.readable = true;
                    stat.isZipped = false;
                    stat.isSymbolicLink = fstats.isSymbolicLink();
                    stat.isDirectory = fstats.isDirectory();
                    stat.isFile = fstats.isFile();
                    resolve(stat);
                });
            });
    }

    private async tryZippedFileStatAsync(): Promise<McFileStat> {
        return null;
    }

    private async checkReadableAsync(): Promise<void> {
        // tslint:disable-next-line: no-bitwise
        return fs.promises.access(this.filepath, fs.constants.F_OK | fs.constants.R_OK);
    }

    // async function openFileAsync(filepath, flags) {
    //     return new Promise(function (res, ret) {
    //         let callback = function (err, fd) {
    //             if (err)
    //                 ret(err);
    //             else
    //                 res(fd);
    //         };
    //         if (flags)
    //             fs.open(filepath, flags, callback);
    //         else
    //             fs.open(filepath, callback);
    //     });
    // }

    // async function closeFileAsync(fd) {
    //     return new Promise(function (res, ret) {
    //         fs.close(fd, function (err) {
    //             if (err)
    //                 ret(err);
    //             else
    //                 res(fd);
    //         });
    //     });
    // }

    // async function readDataAsync(fd, buffer, offset, length, position) {
    //     return new Promise(function (res, ret) {
    //         fs.read(fd, buffer, offset, length, position, function (err, readLength, readBuffer) {
    //             if (err)
    //                 ret(err);
    //             else
    //                 res(readLength);
    //         });
    //     });
    // }
}
