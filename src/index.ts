import { staticLoader as FeatureFlag, staticList as FeatureFlagList } from "./loaders/staticLoader";
import { remoteLoader as AsyncFeatureFlag, remoteList as AsyncFeatureFlagList } from "./loaders/remoteLoader";
import { staticSave as SaveFeatureFlag } from "./store/staticSave";
import { remoteSave as AsyncSaveFeatureFlag, remoteUpdate as AsyncUpdateFeatureFlag } from "./store/remoteSave";

export {
    FeatureFlag, FeatureFlagList, SaveFeatureFlag,
    AsyncFeatureFlag, AsyncFeatureFlagList, AsyncSaveFeatureFlag, AsyncUpdateFeatureFlag
};
export * from "./types";