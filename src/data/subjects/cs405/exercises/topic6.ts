import { CodingExercise } from '../../../../core/types';

const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs405-ex-6-1',
    subjectId: 'cs405',
    topicId: 'cs405-topic-6',
    title: 'Implement S3 Lifecycle Policies',
    difficulty: 2,
    description: `Create AWS CLI scripts to:

1. Create S3 bucket with versioning
2. Configure lifecycle policies (transition to IA after 30 days, Glacier after 90 days)
3. Enable encryption
4. Set up bucket policy for public read
5. Upload files and verify transitions`,
    starterCode: `#!/bin/bash
# TODO: Create bucket
# TODO: Enable versioning
# TODO: Configure lifecycle
# TODO: Enable encryption
# TODO: Set bucket policy`,
    solution: `#!/bin/bash
# S3 Lifecycle Management Script

BUCKET_NAME="my-lifecycle-bucket-\$(date +%s)"
REGION="us-east-1"

# Create bucket
echo "Creating bucket: $BUCKET_NAME"
aws s3api create-bucket \\
  --bucket $BUCKET_NAME \\
  --region $REGION

# Enable versioning
echo "Enabling versioning..."
aws s3api put-bucket-versioning \\
  --bucket $BUCKET_NAME \\
  --versioning-configuration Status=Enabled

# Enable encryption
echo "Enabling encryption..."
aws s3api put-bucket-encryption \\
  --bucket $BUCKET_NAME \\
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'

# Configure lifecycle policy
echo "Configuring lifecycle policy..."
cat > lifecycle-policy.json << 'POLICY'
{
  "Rules": [
    {
      "Id": "TransitionToIA",
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        }
      ]
    },
    {
      "Id": "DeleteOldVersions",
      "Status": "Enabled",
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 180
      }
    },
    {
      "Id": "AbortIncompleteMultipartUpload",
      "Status": "Enabled",
      "AbortIncompleteMultipartUpload": {
        "DaysAfterInitiation": 7
      }
    }
  ]
}
POLICY

aws s3api put-bucket-lifecycle-configuration \\
  --bucket $BUCKET_NAME \\
  --lifecycle-configuration file://lifecycle-policy.json

# Set bucket policy for public read (optional)
echo "Setting bucket policy..."
cat > bucket-policy.json << POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
POLICY

aws s3api put-bucket-policy \\
  --bucket $BUCKET_NAME \\
  --policy file://bucket-policy.json

# Upload test files
echo "Uploading test files..."
echo "Test content" > test-file.txt
aws s3 cp test-file.txt s3://$BUCKET_NAME/

# Verify configuration
echo "\\nBucket configuration:"
aws s3api get-bucket-versioning --bucket $BUCKET_NAME
aws s3api get-bucket-lifecycle-configuration --bucket $BUCKET_NAME
aws s3api get-bucket-encryption --bucket $BUCKET_NAME

echo "\\nBucket created: $BUCKET_NAME"
echo "Files will transition to IA after 30 days, Glacier after 90 days"
echo "Old versions deleted after 180 days"`,
    hints: [
      'Enable versioning before lifecycle policies',
      'Use lifecycle transitions for cost optimization',
      'Always enable encryption',
      'Clean up incomplete multipart uploads'
    ],
    testCases: [
      {
        input: 'aws s3api get-bucket-lifecycle',
        expectedOutput: 'Lifecycle rules configured',
        isHidden: false,
        description: 'Verify lifecycle policies are configured'
      },
      {
        input: 'aws s3api get-bucket-versioning',
        expectedOutput: 'Versioning enabled',
        isHidden: false,
        description: 'Verify bucket versioning is enabled'
      }
    ],
    language: 'bash'
  }
];

export { topic6Exercises };
