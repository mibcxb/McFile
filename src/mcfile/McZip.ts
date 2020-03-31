// 1.0 - Default value
// 1.1 - File is a volume label
// 2.0 - File is a folder(directory)
// 2.0 - File is compressed using Deflate compression
// 2.0 - File is encrypted using traditional PKWARE encryption
// 2.1 - File is compressed using Deflate64(tm)
// 2.5 - File is compressed using PKWARE DCL Implode
// 2.7 - File is a patch data set
// 4.5 - File uses ZIP64 format extensions
// 4.6 - File is compressed using BZIP2 compression *
// 5.0 - File is encrypted using DES
// 5.0 - File is encrypted using 3 DES
// 5.0 - File is encrypted using original RC2 encryption
// 5.0 - File is encrypted using RC4 encryption
// 5.1 - File is encrypted using AES encryption
// 5.1 - File is encrypted using corrected RC2 encryption **
// 5.2 - File is encrypted using corrected RC2 - 64 encryption **
// 6.1 - File is encrypted using non - OAEP key wrapping ** *
// 6.2 - Central directory encryption
// 6.3 - File is compressed using LZMA
// 6.3 - File is compressed using PPMd +
// 6.3 - File is encrypted using Blowfish
// 6.3 - File is encrypted using Twofish

const LOCAL_FILE_HEADER_SIGNATURE = "04034b50";
const ARCHIVE_EXTRA_DATA_SIGNATURE = "08064b50";
const CENTRAL_DIRECTORY_HEADER_SIGNATURE = "02014b50";
const CENTRAL_DIRECTORY_DIGITAL_SIGNATURE = "05054b50";
const ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = "06064b50";
const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = "07064b50";
const END_OF_CENTRAL_DIR_SIGNATURE = "06054b50";

const ZIP_BLOCK_SIGNATURE_ARRAY = [
    LOCAL_FILE_HEADER_SIGNATURE,
    ARCHIVE_EXTRA_DATA_SIGNATURE,
    CENTRAL_DIRECTORY_HEADER_SIGNATURE,
    CENTRAL_DIRECTORY_DIGITAL_SIGNATURE,
    ZIP64_END_OF_CENTRAL_DIR_SIGNATURE,
    ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE,
    END_OF_CENTRAL_DIR_SIGNATURE
];

const COMPRESSION_METHOD_MAP = {
    0: "The file is stored (no compression)",
    1: "The file is Shrunk",
    2: "The file is Reduced with compression factor 1",
    3: "The file is Reduced with compression factor 2",
    4: "The file is Reduced with compression factor 3",
    5: "The file is Reduced with compression factor 4",
    6: "The file is Imploded",
    7: "Reserved for Tokenizing compression algorithm",
    8: "The file is Deflated",
    9: "Enhanced Deflating using Deflate64(tm)",
    10: "PKWARE Data Compression Library Imploding (old IBM TERSE)",
    11: "Reserved by PKWARE",
    12: "File is compressed using BZIP2 algorithm",
    13: "Reserved by PKWARE",
    14: "LZMA",
    15: "Reserved by PKWARE",
    16: "IBM z/OS CMPSC Compression",
    17: "Reserved by PKWARE",
    18: "File is compressed using IBM TERSE (new)",
    19: "IBM LZ77 z Architecture (PFS)",
    96: "JPEG variant",
    97: "WavPack compressed data",
    98: "PPMd version I, Rev 1",
    99: "AE-x encryption marker (see APPENDIX E)"
};

import * as fs from "fs";
import * as buffer from "buffer";

export class McZip {
    filepath: string;
    fd: number;

    constructor(filepath: string) {
        this.filepath = filepath;
    }

    /**
     * 打开文件，返回true后可读取
     */
    openAsync(): Promise<boolean> {
        return null;
    }

    /**
     * 打开文件，返回true后不可读取
     */
    closeAsync(): Promise<boolean> {
        return null;
    }

    // async function detectCentralDirectoryAsync(mcZip) {
    //     // 1.先查到ZIP结尾
    //     let stats = await tryGetStatsAsync(mcZip);
    //     var position = stats.size - 1;
    //     var buffer;
    //     var endPos;
    //     while (position >= 0) {
    //         buffer = await readFileAsync(mcZip, position, -1024);

    //         console.log(buffer.lastIndexOf('504b0506', undefined, 'hex'));
    //         break;
    //     }
    //     return [];
    // }

    // async function readLocalFileHeaderAsync(mcZip, start) {
    //     let size = 26;
    //     let buffer = await readFileAsync(mcZip, start, size);
    //     let zipEntry = null;
    //     if (buffer != null) {
    //         // version needed to extract 2 bytes
    //         let versionExtract = readVersionExtract(buffer.slice(0, 2));
    //         // general purpose bit flag 2 bytes
    //         let generalPurpose = readGeneralPurpose(buffer.slice(2, 4));
    //         // compression method 2 bytes
    //         let compressionMethod = readCompressionMethod(buffer.slice(4, 6));
    //         // last mod file time 2 bytes
    //         let lastModifiedTime = readDateOrTime(buffer.slice(6, 8));
    //         // last mod file date 2 bytes
    //         let lastModifiedDate = readDateOrTime(buffer.slice(8, 10));
    //         // crc - 32 4 bytes
    //         let crc32 = readCrc32(buffer.slice(10, 14));
    //         // compressed size 4 bytes
    //         let compressedSize = readIntValue(buffer.slice(14, 18));
    //         // uncompressed size 4 bytes
    //         let uncompressedSize = readIntValue(buffer.slice(18, 122));
    //         // file name length 2 bytes
    //         let filenameLength = readShortValue(buffer.slice(22, 24));
    //         console.log(filenameLength);
    //         // extra field length 2 bytes
    //         let extraFieldLength = readShortValue(buffer.slice(24, 26));
    //         console.log(extraFieldLength);
    //     }
    //     return {
    //         zipEntry: zipEntry,
    //         skip: size
    //     };
    // }

    // function readVersionExtract(buffer) {
    //     return buffer.readUInt16LE(0);
    // }

    // function readGeneralPurpose(buffer) {
    //     let uint16 = buffer.readUInt16LE(0);
    //     let flagArray = [];
    //     for (var i = 0; i < 16; i++) {
    //         flagArray.push((uint16 & (0x1 << i)) >> i);
    //     }
    //     return {
    //         encrypted: flagArray[0] === 1,
    //         sizeMoved: flagArray[3] === 1,
    //         strongEncryption: flagArray[6] === 1,
    //         usingUTF8: flagArray[11] === 1,
    //         flagArray: flagArray
    //     }
    // }

    // function readCompressionMethod(buffer) {
    //     return buffer.readUInt16LE(0);
    // }

    // function readDateOrTime(buffer) {
    //     return buffer.readUInt16LE(0);
    // }

    // function readCrc32(buffer) {
    //     return zeroLeftPad(readIntValue(buffer).toString(16), 8);
    // }

    // function readShortValue(buffer) {
    //     return buffer.readUInt16LE(0);
    // }

    // function readIntValue(buffer) {
    //     return buffer.readUInt32LE(0);
    // }

    // async function detectDataBlockAsync(mcZip, start) {
    //     let size = 4;
    //     let signBytes = await readFileAsync(mcZip, start, size);
    //     if (signBytes == null) {
    //         return {
    //             type: -1,
    //             skip: size
    //         };
    //     }
    //     let signature = signBytes.swap32().toString('hex');
    //     let type = ZIP_BLOCK_SIGNATURE_ARRAY.indexOf(signature);
    //     return {
    //         type: type,
    //         skip: size
    //     };
    // }

    // async function readFileAsync(mcZip, start, length) {
    //     let stats = await tryGetStatsAsync(mcZip);
    //     if (start < 0 || start >= stats.size || length === 0) {
    //         return null;
    //     }

    //     var position;
    //     if (length > 0) {
    //         if (start + length > stats.size) {
    //             length = stats.size - start;
    //         }
    //         position = start;
    //     } else {
    //         if (start + length < 0) {
    //             length = start;
    //         } else {
    //             length = -length;
    //         }
    //         position = start - length;
    //     }

    //     let fd = await tryOpenAsync(mcZip);
    //     let buffer = Buffer.alloc(length);
    //     let size = await McFile.readDataAsync(fd, buffer, 0, length, position);
    //     return size > 0 ? buffer : null;
    // }
}
