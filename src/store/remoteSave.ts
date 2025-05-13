import { FeatureFlag, SaveCallback } from "../types";

export const remoteSave = async (
    feature: FeatureFlag,
    callBack: SaveCallback,
) => {
    // Call the callback function to save the feature flag
    const flag: FeatureFlag | null = await callBack(feature);
    // If the flag is null, return false
    if (!flag) return false;
    // Return the result of the evaluation
    return flag;
}

export const remoteUpdate = async (
    feature: Partial<FeatureFlag>,
    callBack: (feature: Partial<FeatureFlag>) => Promise<FeatureFlag | null>,
) => {
    // Call the callback function to update the feature flag
    const flag: FeatureFlag | null = await callBack(feature);
    // If the flag is null, return false
    if (!flag) return false;
    // Return the result of the evaluation
    return flag;
}