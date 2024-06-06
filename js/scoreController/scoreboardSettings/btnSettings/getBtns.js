import { getPlayTo } from '../../playTo';
import { getWinBy2Element } from '../../winBy2';

export const getBtns = () => {
    let btns = [getPlayTo(), getWinBy2Element()];
    document.querySelectorAll('.btn').forEach((btn) => {
        if (btn.id !== 'resetScore') btns.push(btn);
    });

    return btns;
};
