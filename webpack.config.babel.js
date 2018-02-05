import {
    join
} from "path";

const include = join(__dirname, "src");

export default {
    entry: "./src/hash",
    output: {
        path: join(__dirname, "dist"),
        libraryTarget: "umd",
        library: "Hash",
    },
    devtool: "source-map",
    module: {
        loaders: [{
                test: /\.js$/,
                loader: "babel-loader",
                include
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                include
            },
        ]
    }
};
