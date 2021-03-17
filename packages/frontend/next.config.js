const path = require('path');
const withImages = require('next-images');

module.exports = withImages({
    esModules: true,
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    i18n: {
        locales: ['en-US', 'pt-BR'],
        defaultLocale: 'en-US',
        localeDetection: true,
    }
})
