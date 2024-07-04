import { createAuthPopupContext, createImageSelectorContext, createSessionContext } from 'context';

export const useAuthPopup = createAuthPopupContext();
export const useImageSelector = createImageSelectorContext();
export const useSession = createSessionContext();
