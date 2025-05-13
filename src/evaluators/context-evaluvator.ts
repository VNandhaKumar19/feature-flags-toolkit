import { ContextType, Environment, FeatureFlag } from "../types";

export const contextEvaluator = (
    feature: string,
    flag: FeatureFlag,
    context: ContextType,
    env: Environment
) => {

    if (!flag || !context) {
        // If the flag or context is not provided, return false
        return false;
    }
    // Check if the feature is enabled in the context
    if (flag.name === feature) {
        // If the feature is enabled, return true
        if (env && flag.flag[ env ].enabled) return true;
        // Check if the context matches the feature flag's context
        if (flag.flag[ env ].context[ context ]) return true;
        // If the feature is not enabled, return false
        return false;
    }
    // If the feature name does not match, return false
    return false;
}