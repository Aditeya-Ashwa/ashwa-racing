"""
Ashwa Racing — Bulk Upload Tool for Cloudflare R2

This script uploads local assets (e.g. car prototypes, team photos)
directly to your Cloudflare R2 bucket (`ashwa-assets`) in bulk.

Prerequisites:
  pip install boto3

Environment Variables (or set directly in script):
  R2_ACCOUNT_ID        = "your_cloudflare_account_id"
  R2_ACCESS_KEY_ID     = "your_r2_access_key_id"
  R2_SECRET_ACCESS_KEY = "your_r2_secret_access_key"
  R2_BUCKET_NAME       = "ashwa-assets" (default)

Usage:
  python scripts/upload_to_r2.py assets/images/prototypes images/prototypes
  python scripts/upload_to_r2.py assets/images/team/members images/team/members
"""

import os
import sys
import mimetypes
try:
    import boto3
    from botocore.config import Config
except ImportError:
    print("boto3 is required for R2 uploads. Install it using: pip install boto3")
    boto3 = None

# Load from .env if present
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

ACCOUNT_ID        = os.environ.get("R2_ACCOUNT_ID", "<YOUR_ACCOUNT_ID>")
ACCESS_KEY_ID     = os.environ.get("R2_ACCESS_KEY_ID", "<YOUR_ACCESS_KEY_ID>")
SECRET_ACCESS_KEY = os.environ.get("R2_SECRET_ACCESS_KEY", "<YOUR_SECRET_ACCESS_KEY>")
BUCKET_NAME       = os.environ.get("R2_BUCKET_NAME", "ashwa-assets")

def get_r2_client():
    if not boto3:
        sys.exit(1)
    return boto3.client(
        "s3",
        endpoint_url=f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com",
        aws_access_key_id=ACCESS_KEY_ID,
        aws_secret_access_key=SECRET_ACCESS_KEY,
        config=Config(signature_version="s3v4"),
        region_name="auto"
    )

def upload_directory(local_dir, r2_prefix=""):
    if ACCOUNT_ID.startswith("<") or ACCESS_KEY_ID.startswith("<"):
        print("❌ Please configure your R2 credentials (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY).")
        print("\nTo generate R2 API Tokens:")
        print("1. Go to Cloudflare Dashboard -> R2 Overview -> Manage R2 API Tokens")
        print("2. Click 'Create API Token' with 'Object Read & Write' permissions for bucket 'ashwa-assets'")
        print("3. Set the environment variables or update the script.")
        return

    s3 = get_r2_client()
    r2_prefix = r2_prefix.strip("/")

    files_to_upload = []
    for root, _, files in os.walk(local_dir):
        for f in files:
            full_path = os.path.join(root, f)
            rel_path  = os.path.relpath(full_path, local_dir).replace("\\", "/")
            key = f"{r2_prefix}/{rel_path}" if r2_prefix else rel_path
            files_to_upload.append((full_path, key))

    print(f"🚀 Uploading {len(files_to_upload)} file(s) from '{local_dir}' to 's3://{BUCKET_NAME}/{r2_prefix}'...")

    success = 0
    for idx, (full_path, key) in enumerate(files_to_upload, 1):
        content_type, _ = mimetypes.guess_type(full_path)
        content_type = content_type or "application/octet-stream"
        
        try:
            with open(full_path, "rb") as fp:
                s3.put_object(
                    Bucket=BUCKET_NAME,
                    Key=key,
                    Body=fp,
                    ContentType=content_type
                )
            print(f"  [{idx}/{len(files_to_upload)}] ✅ Uploaded: {key}")
            success += 1
        except Exception as e:
            print(f"  [{idx}/{len(files_to_upload)}] ❌ Failed {key}: {e}")

    print(f"\n🎉 Done! Successfully uploaded {success}/{len(files_to_upload)} files to Cloudflare R2.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/upload_to_r2.py <local_directory> [r2_prefix]")
        print("Example: python scripts/upload_to_r2.py assets/images/prototypes images/prototypes")
    else:
        local_path = sys.argv[1]
        prefix     = sys.argv[2] if len(sys.argv) > 2 else ""
        upload_directory(local_path, prefix)
