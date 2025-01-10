import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export default {
    mode:'production',
    target: 'web',
    entry: {
        webResource: './src/extension/webResource.ts',
        contentScript: './src/extension/contentScript.ts',
        background: './src/extension/background.ts',
        react: './src/main.tsx',
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['react'],
        }),
        new CopyPlugin({
            patterns: [{ 
                from: path.resolve('manifest.json'), 
                to: path.resolve('dist') 
            },
            { from: path.resolve('src/assets'), to: path.resolve('dist/assets') },
        ],
        }),
    ],
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            ['@babel/preset-react', { runtime: 'automatic' }], 
                            '@babel/preset-typescript'
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                include: path.resolve('src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
              },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
}