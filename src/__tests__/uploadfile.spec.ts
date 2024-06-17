import { expect, describe, it, beforeAll, afterAll } from 'vitest'
const request = require('supertest');
const fs = require('fs');

import app from '..';
import path from 'path';
const uploadDir = '../assets/'


describe('PDF Upload Endpoint for comparism', () => {
    it('should return No file uploaded', async () => {
        const response = await request(app)
            .post('/api/v1/upload')
        expect(response.text).toBe('No file uploaded.');
    })

    it('should reject non-PDF files', async () => {
        const response = await request(app)
            .post('/api/v1/upload')
            .attach('file', path.join(__dirname, './../assets/text-test-file.txt'));
        expect(response.body.error).toBe('Only PDF files are allowed!');
    });

    it('should reject invalid-PDF files', async () => {
        const response = await request(app)
            .post('/api/v1/upload')
            .attach('file', path.join(__dirname, './../assets/techcorp-test-file.pdf'));
        expect(response.body.error).toBe("Cannot extract data. Invalid file provided.");
    });

    it('should return summary successfully when company name match', async () => {
        const response = await request(app)
            .post('/api/v1/upload')
            .attach('file', path.join(__dirname, './../../assets/financellc.pdf'))

        expect(response.status).toEqual(200);
        expect(response.body.extractedData["Company Name"]).toBe("FinanceLLC");
        expect(response.body.storedData["Company Name"]).toBe("FinanceLLC");
        expect(response.body.mismatches.length).toEqual(17);
    })
})