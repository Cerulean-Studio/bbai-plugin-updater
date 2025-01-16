import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';

const uploadDir = path.join(process.cwd(), 'public', 'uploader');
const fileName = 'new-blink-alt-text.zip';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Setting destination:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log('Setting filename:', fileName);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Custom middleware to handle multer in Next.js
const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    // Create a mock response object
    const res = new NextResponse();

    // Use the custom middleware function
    await runMiddleware(req, res, upload.single('file'));

    const filePath = path.join(uploadDir, fileName);
    console.log('File uploaded successfully:', filePath);

    // Check if the file exists after upload
    if (fs.existsSync(filePath)) {
      console.log('File exists at:', filePath);
    } else {
      console.error('File does not exist after upload');
    }

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error during file upload:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}