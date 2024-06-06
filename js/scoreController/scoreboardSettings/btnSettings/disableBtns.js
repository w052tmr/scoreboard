import { getBtns } from './getBtns';

export const disableBtns = (whitelist) => {
    getBtns().forEach((btn) => {
        btn.disabled = true;
        if (whitelist) {
            btn.className.split(' ').forEach((className) => {
                if (whitelist.includes(className)) btn.disabled = false;
            });
        }
    });
};
