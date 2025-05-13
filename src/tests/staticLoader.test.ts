import { staticList, staticLoader } from "../loaders/staticLoader";
import fs from "node:fs";
import path from "node:path";

const tmpPath = path.join(__dirname, "mock-flag.json");

const flag = {
    "feature-a": {
        name: "feature-a",
        description: "test feature",
        createdAt: new Date().toISOString(),
        flag: {
            development: {
                enabled: false,
                context: { "abc": true },
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
    }
};

beforeAll(() => {
    fs.writeFileSync(tmpPath, JSON.stringify(flag, null, 2));
});

afterAll(() => {
    fs.unlinkSync(tmpPath);
});

describe("staticLoader", () => {
    it("returns true if context matches", () => {
        const result = staticLoader("feature-a", "abc", tmpPath, "development");
        expect(result).toBe(true);
    });

    it("returns true if globally enabled", () => {
        const result = staticLoader("feature-a", "any", tmpPath, "staging");
        expect(result).toBe(true);
    });

    it("returns false if context and global disabled", () => {
        const result = staticLoader("feature-a", "xyz", tmpPath, "production");
        expect(result).toBe(false);
    });

    it("throws if file not found", () => {
        expect(() => staticLoader("feature-a", "abc", "./nonexistent.json")).toThrow();
    });

    it("return list if feature not found", () => {
        const result = staticList(tmpPath, "abc");
        expect(result).toStrictEqual([ flag[ "feature-a" ] ]);
    })

    it("throws if file not found", () => {
        expect(() => staticList('./nonexistent.json', "abc")).throws();
    });
});
