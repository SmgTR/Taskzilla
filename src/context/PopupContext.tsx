import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Component,
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { AnyAction } from 'redux';

interface PopupContextData {
  activePopup: string;
  parentId?: string;
  popupId?: string;
}

const DefaultPopupContextData: PopupContextData = {
  activePopup: '',
  parentId: '',
  popupId: ''
};

type Props = {
  children: ReactNode;
};

type PopupContextType = [PopupContextData, Dispatch<AnyAction>];

/* ------------------------REDUX------------------------ */
const popupSlice = createSlice({
  name: 'Popup',
  reducers: {
    setActivePopup: (state, action: PayloadAction<{ activePopup: string; popupId?: string }>) => {
      disablePopup();
      state.activePopup = action.payload.activePopup;
      state.popupId = action.payload.popupId ?? '';
    },
    disablePopup: (state) => {
      state.parentId = '';
      state.activePopup = '';
    },
    setPopupParentId: (state, action: PayloadAction<string>) => {
      state.parentId = action.payload;
    }
  },
  initialState: DefaultPopupContextData
});
export const { setActivePopup, disablePopup, setPopupParentId } = popupSlice.actions;

/* ------------------------CONTEXT------------------------ */
export const PopupContext = createContext<PopupContextType>([DefaultPopupContextData, () => null]);

export const PopupContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<Reducer<PopupContextData, AnyAction>>(
    popupSlice.reducer,
    DefaultPopupContextData
  );

  return <PopupContext.Provider value={[state, dispatch]}>{children}</PopupContext.Provider>;
};

export function usePopupContext(): PopupContextType {
  return useContext(PopupContext);
}
