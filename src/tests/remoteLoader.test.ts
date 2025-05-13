import { remoteList, remoteLoader } from '../loaders/remoteLoader';
import { FeatureFlag } from '../types';

const mockFeature: FeatureFlag = {
    name: 'new-dashboard',
    description: 'Enables the new dashboard UI',
    createdAt: new Date(),
    flag: {
        development: {
            enabled: false,
            context: { 123: true },
        },
        production: {
            enabled: true,
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

describe('remoteLoader', () => {
    it('returns true if context is enabled in environment', async () => {
        const mockCallback = async () => mockFeature;

        const result = await remoteLoader(
            'new-dashboard',
            123,
            mockCallback,
            'development'
        );

        expect(result).toBe(true);
    });

    it('returns false if feature is not enabled and context not present', async () => {
        const mockCallback = async () => mockFeature;

        const result = await remoteLoader(
            'new-dashboard',
            'no-context',
            mockCallback,
            'development'
        );

        expect(result).toBe(false);
    });

    it('returns false if feature not found', async () => {
        const mockCallback = async () => null;

        const result = await remoteLoader(
            'non-existent-feature',
            123,
            mockCallback,
            'development'
        );

        expect(result).toBe(false);
    });

    it('returns true if feature is enabled in environment globally', async () => {
        const mockCallback = async () => mockFeature;

        const result = await remoteLoader(
            'new-dashboard',
            'anything',
            mockCallback,
            'production'
        );

        expect(result).toBe(true);
    });

    it('returns false if feature name does not match', async () => {
        const mismatchedFeature: FeatureFlag = {
            ...mockFeature,
            name: 'other-feature',
        };
        const mockCallback = async () => mismatchedFeature;

        const result = await remoteLoader(
            'new-dashboard',
            123,
            mockCallback,
            'development'
        );

        expect(result).toBe(false);
    });

    it('returns list of features if context is enabled in environment', async () => {
        const mockCallback = async () => [ mockFeature ];
        const result = await remoteList(
            mockCallback,
            123
        );
        expect(result).toEqual([ mockFeature ]);
    });

    it('return [] if no features are found', async () => {
        const mockCallback = async () => null;
        const result = await remoteList(
            mockCallback,
            123
        );

        expect(result).toEqual([]);
    });
});
