export type ContextType = string | number;

export type Environment = "development" | "production" | "staging" | "testing";

export type FeatureFlag = {
    name: string;
    description: string;
    flag: Record<Environment, {
        enabled: boolean;
        context: Record<ContextType, boolean>;
    }>;
    createdAt: string | Date;
}

export type CallBack = (feature: string, context: ContextType) => Promise<FeatureFlag | null>;
export type ListCallBack = (context: ContextType) => Promise<FeatureFlag[] | null>;

export type SaveCallback = (feature: FeatureFlag) => Promise<FeatureFlag | null>;

export type StaticFile = {
    [ key: string ]: FeatureFlag;
}