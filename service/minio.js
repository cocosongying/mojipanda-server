const Minio = require('minio')
const config = require('../config');

const minioClient = new Minio.Client({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    useSSL: false,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey,
});

async function putObject(bucketName, objectName, stream) {
    return new Promise((resolve, reject) => {
        minioClient.putObject(bucketName, objectName, stream, (err, etag) => {
            if (err) {
                reject(err);
            }
            resolve(etag);
        });
    });
}

module.exports = {
    putObject,
}
