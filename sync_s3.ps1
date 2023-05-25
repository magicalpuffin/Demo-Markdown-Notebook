. ./env.ps1
aws s3 sync markdown_notebook/build/. $($S3_BUCKET)