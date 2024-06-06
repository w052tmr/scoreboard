import { getBtns } from './getBtns';

export const enableBtns = () => {
    getBtns().forEach((btn) => (btn.disabled = false));
};
