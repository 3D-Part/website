import { useAppDispatch, useAppSelector } from '../hooks'
import { settingsDataSelector } from '../slices/settings/settingsSelector';
import { settingsThunk } from '../thunks/settingsThunk';

const useSettingsApi = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(settingsDataSelector);

    const fetchSettings = () => {
        dispatch(settingsThunk());
    }

    return {
        settings,
        fetchSettings
    }
}

export default useSettingsApi