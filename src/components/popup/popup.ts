import { Icomponents } from '../../types/components'
// import './popup.css' //全局
let styles = require('./popup.css').default; //webpack可识别
// import styles from './popup.css'
// 约束组件使用
interface Ipopup {
    width?: string;
    height?: string;
    title?: string;
    pos?: string;
    musk?: boolean;
    content?: (content : HTMLElement) => void
}
function popup(options: Ipopup) {
    return new Popup(options);
}
class Popup implements Icomponents {
    // settings = {};
    temContainer;
    musk;
    constructor(private settings: Ipopup) {
        // this.settings = settings;
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            title: '',
            pos: 'center',
            musk: true,
            content: () => { }
        }, this.settings);
        this.init();
    }
    /**
     * 初始化
     */
    init(){
        this.template();
        this.settings.musk && this.createMusk();
        this.handle();
        this.contentCallback();
    }
    /**
     * 创建模板
     */
    template(){
        this.temContainer = document.createElement('div');
        this.temContainer.style.width = this.settings.width;
        this.temContainer.style.height = this.settings.height;
        this.temContainer.className = styles.popup;
        this.temContainer.innerHTML = `
            <div class="${styles['popup-title']}">
                <h3>${this.settings.title}</h3>
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="${styles['popup-content']}"></div>
        `;
        document.body.appendChild(this.temContainer);
        if(this.settings.pos === 'left'){
            this.temContainer.style.left = 0;
            this.temContainer.style.top = (window.innerHeight - this.temContainer.offsetHeight) + 'px';
        }else if( this.settings.pos === 'right'){
            this.temContainer.style.right = 0;
            this.temContainer.style.top = (window.innerHeight - this.temContainer.offsetHeight) + 'px';
        }else{
            this.temContainer.style.left = (window.innerWidth - this.temContainer.offsetWidth)/2 + 'px';
            this.temContainer.style.top = (window.innerHeight - this.temContainer.offsetHeight)/2 + 'px';
        }
    }
    /**
     * 创建遮罩
     */
    createMusk(){
        this.musk = document.createElement('div');
        this.musk.className = styles.musk;
        this.musk.style.width = '100%';
        this.musk.style.height = document.body.offsetHeight + 'px';
        document.body.appendChild(this.musk);
    }
    /**
     * 事件操作
     */
    handle(){
        let popupClose = this.temContainer.querySelector(`.${styles['popup-title']} i`);
        popupClose.addEventListener('click',()=>{
            document.body.removeChild(this.temContainer);
            this.settings.musk && document.body.removeChild(this.musk);
        })
    }
    contentCallback(){
        let popupContent = this.temContainer.querySelector(`.${styles['popup-content']}`);
        this.settings.content(popupContent);

    }

}
export default popup;