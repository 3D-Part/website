import { ISettings } from "./settingsSlice";

export const isLoadingSettingsSelector = (state: { settingsSlice: { isLoadingSettings: any; }; }) => state.settingsSlice.isLoadingSettings;
export const settingsDataSelector = (state: { settingsSlice: { data: ISettings['data']; }; }) => state.settingsSlice.data;