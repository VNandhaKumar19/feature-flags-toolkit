import { contextEvaluator } from "../evaluators/context-evaluvator";
import { ContextType, FeatureFlag, CallBack, Environment, ListCallBack } from "../types";

export const remoteLoader = async (feature: string, context: ContextType, callBack: CallBack, environment: Environment = "development") => {
    try {
        // Call the callback function to fetch the feature flag
        const flag: FeatureFlag | null = await callBack(feature, context);
        // If the flag is null, return false
        if (!flag) return false;
        // Evaluate the feature flag using the context evaluator
        const isEnabled = contextEvaluator(feature, flag, context, environment);
        // Return the result of the evaluation
        return isEnabled;
    } catch (error) {
        // Handle any errors that occur during the callback execution
        console.error(`Error loading feature flag: ${error}`);
        return false;
    }
}

export const remoteList = async (callBack: ListCallBack, context: ContextType) => {
    try {
        // Call the callback function to fetch the feature flags
        const flags: FeatureFlag[] | null = await callBack(context);
        // If the flags are null, return false
        if (!flags) return [];
        // Return the list of feature flags
        return flags;
    } catch (error) {
        // Handle any errors that occur during the callback execution
        console.error(`Error loading feature flags: ${error}`);
        return [];
    }
}