const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, path.resolve(__dirname, '..', 'uploads'));

    },

    filename: (req, file, cb) => {

        const nomeArquivo = Date.now() + '-' + file.originalname;

        cb(null, nomeArquivo);

    }

});

module.exports = multer({
    storage
});