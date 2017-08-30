module.exports = {
    options: {
        basePath: 'app/sass/'
	},

	dist: {
		files: {
            '_pwd-unity-bar.scss': [
                '01_settings/*',
                '02_tools/*',
                '03_vendors/*',
                '04_generics/*',
                '05_basics/*',
                '06_components/*',
                '07_layouts/*',
                '08_overrides/*'
            ]
		}
	}
};
