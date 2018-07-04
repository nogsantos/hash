import {
    join
} from "path";

const include = join(__dirname, "src");

export default {
    entry: "./src/hash",
    mode: process.env.NODE_ENV,
    output: {
        path: join(__dirname, "dist"),
        libraryTarget: "umd",
        library: "Hash",
    },
    devtool: "source-map"
};
