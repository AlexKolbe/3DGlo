const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js', // указываем путь к существующему файлу
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		minimize: true, // принудительно включает минификацию даже в development
	},
	devServer: {
		hot: true,
		static: {
			directory: './dist',
			watch: true
		}
	}
};
