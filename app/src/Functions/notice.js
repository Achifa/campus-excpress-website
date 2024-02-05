export function openNotice(mssg) {
    
    let n_cnt = document.querySelector('.notice-cnt');
    let n_cnt_btn = document.querySelector('.notice-cnt-btn');
    n_cnt_btn.addEventListener('click', () => n_cnt.removeAttribute('id'))
    n_cnt.setAttribute('id', 'notice-cnt')

    setTimeout(() => {
        n_cnt.removeAttribute('id')
    }, 6000);
}