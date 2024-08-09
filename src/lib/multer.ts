import { randomBytes } from "node:crypto";
import multer from "fastify-multer";
import path from "node:path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "..", "temp", "uploads"))
    },
    
    filename: (req, file, cb) => {
        randomBytes(16, (err, hash) => {
            if (err) cb(err, '');
            
            const fileName = `${hash.toString('hex')}-${file.originalname}`

            cb(null, fileName)
        });
    },
});

export const upload = multer({ storage: storage,
     fileFilter: (req, file, cb) => {
        const allowedMimes = ["image/jpeg", "image/jpg","image/png", "image/gif"];
        if (allowedMimes.includes(file.mimetype)) { 
            cb(null, true);
        } else {
            cb(null, false);
        }
    } 
});