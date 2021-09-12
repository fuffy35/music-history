// see: fullstack-vue-book-v3-r13-basic-code\routing\shopping_cart\vue.config.js

module.exports = {
	devServer: {
		proxy: {
			'/music-json': {
				// https://forum.vuejs.org/t/how-to-hide-api-keys-from-source-code/102974
				// to:
				// https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
				target: process.env.SOURCE,

				changeOrigin: true,

				// https://stackoverflow.com/questions/54216516/devserver-proxy-in-config-throws-404
				// having pathRewrite like this makes https://localhost:8080/music-json go to process.env.SOURCE (without /music-json at the end).
				// pathRewrite: {
				// 	'^/music-json': ''
				// }
			}
		}
	}
};
