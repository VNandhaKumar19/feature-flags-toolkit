import fs from 'node:fs';
import path from 'node:path';
import { FeatureFlag, StaticFile } from "../types";

export const staticSave = async (
    feature: FeatureFlag,
    filePath: string,
    fileName: string
) => {
    const fullPath = path.resolve(filePath, fileName);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        // Create the directory if it doesn't exist
        fs.mkdirSync(filePath, { recursive: true });
    }

    // Check if the file exists
    if (fs.existsSync(fullPath)) {
        // Read the existing file content
        let parsedContent: StaticFile = {};
        try {
            const existingContent = fs.readFileSync(fullPath, 'utf-8');
            // Parse the existing content
            parsedContent = JSON.parse(existingContent);
        } catch (error) {
            throw new Error(`Failed to read/parse existing file at ${fullPath}: ${error}`);
        }

        parsedContent[ feature.name ] = {
            ...(parsedContent[ feature.name ] || {}),
            ...feature
        };

        fs.writeFileSync(fullPath, JSON.stringify(parsedContent, null, 2));
    } else {
        // Create a new file and write the feature flag to it
        fs.writeFileSync(fullPath, JSON.stringify({ [ feature.name ]: feature }, null, 2));
    }

}