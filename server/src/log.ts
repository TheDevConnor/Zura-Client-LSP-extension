import * as fs from "fs";

const log = fs.createWriteStream("/tmp/lsp.log");

export default {
    write: (msg: object | unknown) => {
        if (typeof msg === "object") {
            log.write(JSON.stringify(msg) + "\n");
        } else {
            log.write(msg + "\n");
        }
    }
}