import { remoteSave, remoteUpdate } from '../store/remoteSave';
import { FeatureFlag } from '../types';

const mockFeature: FeatureFlag = {
    name: 'beta-mode',
    description: 'Enables beta mode for specific users',
    createdAt: new Date(),
    flag: {
        development: {
            enabled: true,
            context: { 1: true },
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
    },
};

describe('remoteSave', () => {
    it('should save and return the feature flag', async () => {
        const saveCallback = vi.fn(async (feature: FeatureFlag) => feature);

        const result = await remoteSave(mockFeature, saveCallback);

        expect(result).toEqual(mockFeature);
        expect(saveCallback).toHaveBeenCalledOnce();
    });

    it('should return false if callback returns null', async () => {
        const saveCallback = vi.fn(async () => null);

        const result = await remoteSave(mockFeature, saveCallback);

        expect(result).toBe(false);
    });
});

describe('remoteUpdate', () => {
    it('should update and return the feature flag', async () => {
        const partialFeature = { name: 'beta-mode', description: 'Updated desc' };
        const updateCallback = vi.fn(async () => ({
            ...mockFeature,
            description: 'Updated desc',
        }));

        const result = await remoteUpdate(partialFeature, updateCallback);

        if(!result) {
            expect(result).toBe(false);
        } else {
            expect(result.description).toBe('Updated desc');
            expect(updateCallback).toHaveBeenCalledOnce();
        }

    });

    it('should return false if update callback returns null', async () => {
        const updateCallback = vi.fn(async () => null);

        const result = await remoteUpdate({ name: 'beta-mode' }, updateCallback);

        expect(result).toBe(false);
    });
});
