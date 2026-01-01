import { useAppDispatch, useAppSelector } from '../hooks'
import { isFilteringSidebarVisibleSelector } from '../slices/ui/uiSelectors';
import { changeIsFilteringSidebarVisible } from '../slices/ui/uiSlice';

const useUiApi = () => {
    const dispatch = useAppDispatch();

    const isFilteringSidebarVisible = useAppSelector(isFilteringSidebarVisibleSelector);


    const toggleFilteringSidebar = (value: boolean) => {
        dispatch(changeIsFilteringSidebarVisible(value));
    }

    return { isFilteringSidebarVisible, toggleFilteringSidebar }
}

export default useUiApi