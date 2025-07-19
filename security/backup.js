// backup.js
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

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_PATH)) {
    fs.mkdirSync(BACKUP_PATH, { recursive: true });
}

// Function to create MongoDB backup
async function createBackup() {
    try {
        // Connect to MongoDB
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('Connected to MongoDB');

        // Create backup using mongodump
        const backupPath = path.join(BACKUP_PATH, `backup_${new Date().toISOString().split(':').join('-')}`);
        const mongodump = require('child_process').spawn(
            'mongodump',
            [
                '--uri', MONGODB_URI,
                '--db', DATABASE_NAME,
                '--out', backupPath
            ]
        );

        // Handle mongodump output
        mongodump.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        mongodump.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        mongodump.on('close', (code) => {
            if (code === 0) {
                console.log('Backup created successfully');
                // Upload backup to AWS S3
                uploadBackupToS3(backupPath);
            } else {
                console.error('Backup failed with code:', code);
            }
        });
    } catch (error) {
        console.error('Error creating backup:', error);
    }
}

// Function to upload backup to AWS S3
async function uploadBackupToS3(localPath) {
    try {
        const s3 = new AWS.S3({
            region: AWS_REGION,
            accessKeyId: 'your-access-key',
            secretAccessKey: 'your-secret-key'
        });

        const fileContent = fs.readFileSync(localPath);
        const params = {
            Bucket: AWS_BUCKET,
            Key: path.basename(localPath),
            Body: fileContent
        };

        const data = await s3.upload(params).promise();
        console.log('Backup uploaded to S3:', data.Location);
    } catch (error) {
        console.error('Error uploading backup to S3:', error);
    }
}

// Call the backup function
createBackup();
