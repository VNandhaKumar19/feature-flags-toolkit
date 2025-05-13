import fs from "node:fs";
import path from "node:path";
import { staticSave } from "../store/staticSave";
import { FeatureFlag } from "../types";

const saveDir = path.join(__dirname, "tmp-save");
const saveFile = "flags.json";

const feature: FeatureFlag = {
    name: "beta-mode",
    description: "Beta flag",
    createdAt: new Date(),
    flag: {
        development: {
            enabled: true,
            context: {},
        },
        production: {
            enabled: false,
            context: {},
        },
        staging: {
            enabled: false,
            context: {},
        },
        testing: {
            enabled: false,
            context: {},
        },
    }
};

afterAll(() => {
    fs.rmSync(saveDir, { recursive: true, force: true });
});

describe("staticSave", () => {
    it("saves a new flag file correctly", async () => {
        await staticSave(feature, saveDir, saveFile);
        const filePath = path.join(saveDir, saveFile);
        const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        expect(content[ "beta-mode" ].name).toBe("beta-mode");
    });

    it("updates existing flag entry", async () => {
        const updated = { ...feature, description: "Updated desc" };
        await staticSave(updated, saveDir, saveFile);
        const filePath = path.join(saveDir, saveFile);
        const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        expect(content[ "beta-mode" ].description).toBe("Updated desc");
    });
});
