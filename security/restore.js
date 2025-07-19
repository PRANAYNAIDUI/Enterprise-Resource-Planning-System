// restore.js
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

// Configuration
const MONGODB_URI = 'mongodb://localhost:27017';
const DATABASE_NAME = 'erp_system';
const BACKUP_PATH = path.join(__dirname, 'backups');
const AWS_REGION = 'your-region';
const AWS_BUCKET = 'your-bucket-name';

// Function to restore MongoDB from backup
async function restoreFromBackup() {
    try {
        // Connect to MongoDB
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('Connected to MongoDB');

        // Download backup from AWS S3
        const backupPath = path.join(BACKUP_PATH, 'latest_backup');
        const s3 = new AWS.S3({
            region: AWS_REGION,
            accessKeyId: 'your-access-key',
            secretAccessKey: 'your-secret-key'
        });

        const params = {
            Bucket: AWS_BUCKET,
            Key: 'backup_file'
        };

        const data = await s3.getObject(params).promise();
        fs.writeFileSync(backupPath, data.Body);

        // Restore backup using mongorestore
        const mongorestore = require('child_process').spawn(
            'mongorestore',
            [
                '--uri', MONGODB_URI,
                '--db', DATABASE_NAME,
                '--drop'
            ]
        );

        mongorestore.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        mongorestore.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        mongorestore.on('close', (code) => {
            if (code === 0) {
                console.log('Database restored successfully');
            } else {
                console.error('Restore failed with code:', code);
            }
        });
    } catch (error) {
        console.error('Error restoring database:', error);
    }
}

// Call the restore function
restoreFromBackup();
