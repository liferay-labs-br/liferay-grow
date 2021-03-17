const path = require('path');
const withImages = require('next-images');

module.exports = withImages({
    esModules: true,
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src')
        }
    }
})
