const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#FF8F00',
                            '@layout-header-background': '#2B3A42',

                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}; 