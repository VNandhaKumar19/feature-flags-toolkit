import { contextEvaluator } from "../evaluators/context-evaluvator";
import { FeatureFlag } from "../types";

const mockFeatureFlag: FeatureFlag = {
    name: "new-dashboard",
    description: "Enable new dashboard",
    createdAt: new Date(),
    flag: {
        development: {
            enabled: false,
            context: {
                "123": true,
            },
        },
        production: {
            enabled: false,
            context: {},
        },
        staging: {
            enabled: true,
            context: {},
        },
        testing: {
            enabled: false,
            context: {},
        }
    }
};

describe("contextEvaluator", () => {
    it("returns true when context is explicitly enabled", () => {
        const result = contextEvaluator("new-dashboard", mockFeatureFlag, "123", "development");
        expect(result).toBe(true);
    });

    it("returns true when feature is enabled globally", () => {
        const result = contextEvaluator("new-dashboard", mockFeatureFlag, "any", "staging");
        expect(result).toBe(true);
    });

    it("returns false if feature is not enabled and context does not match", () => {
        const result = contextEvaluator("new-dashboard", mockFeatureFlag, "456", "production");
        expect(result).toBe(false);
    });

    it("returns false for unmatched feature name", () => {
        const result = contextEvaluator("non-existent", mockFeatureFlag, "123", "development");
        expect(result).toBe(false);
    });
});
