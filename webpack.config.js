var webpack = require('webpack');
var path = require('path');

var IS_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') >= 0;

module.exports = {
    devtool: IS_DEV_SERVER ? 'eval' : 'cheap-source-map',
    entry: {
        'react-list': path.resolve(__dirname, 'react-list.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bin')
    },
    resolve: {
        modules: ['modules', 'node_modules'],
    },
    externals : {
      'react': 'react',
      'react-dom': 'react-dom',
      'react-addons-shallow-compare': 'react-addons-shallow-compare',
      'prop-types': 'prop-types'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                use: 'babel-loader?cacheDirectory'
            }            
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'BUILD': JSON.stringify('build')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
