import fs from 'node:fs';
import path from 'node:path';
import { ContextType, Environment, StaticFile } from '../types';
import { contextEvaluator } from '../evaluators/context-evaluvator';

export const staticLoader = (feature: string, context: ContextType, filePath: string, environment: Environment = "development") => {
    const fullPath = path.resolve(filePath);
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${fullPath}`);
    }
    try {
        // Read the file content
        const fileContent = fs.readFileSync(fullPath, 'utf-8');

        // Check if the file content is valid JSON
        if (!fileContent) {
            throw new Error(`File is empty: ${fullPath}`);
        }

        // Parse the JSON content
        const parsedContent: StaticFile = JSON.parse(fileContent);

        // Check if the feature exists in the parsed content
        if (!parsedContent[ feature ]) return false;

        // Check if the feature is enabled in the specified environment
        const isEnabled = contextEvaluator(feature, parsedContent[ feature ], context, environment);

        // Return the result of the evaluation
        return isEnabled;
    } catch (error) {
        // Handle any errors that occur during file reading or parsing
        console.error(`Error loading feature flag: ${error}`);
        return false;
    }
}

export const staticList = (filePath: string, context: ContextType) => {
    const fullPath = path.resolve(filePath);
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${fullPath}`);
    }

    try {
        // Read the file content
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        // Check if the file content is valid JSON
        if (!fileContent) {
            throw new Error(`File is empty: ${fullPath}`);
        }

        // Parse the JSON content
        const parsedContent: StaticFile = JSON.parse(fileContent);

        // Check if the feature exists in the parsed content
        if (!parsedContent) return [];

        // Return the list of feature flags
        return Object.values(parsedContent).filter((flag) => {
            const isEnabled = contextEvaluator(flag.name, flag, context, "development") ||
                contextEvaluator(flag.name, flag, context, "production") ||
                contextEvaluator(flag.name, flag, context, "staging") ||
                contextEvaluator(flag.name, flag, context, "testing");
            if (!isEnabled) return null;
            return flag;
        });
    } catch (error) {
        // Handle any errors that occur during file reading or parsing
        console.error(`Error loading feature flags: ${error}`);
        return [];
    }
}