import { Icomponents } from '../../types/components'
let styles = require('./video.css').default;
//
interface Ivideo {
    url: string;
    elem:string | HTMLElement;//联合类行
    width?: string;
    height?: string;
    autopaly?:boolean;
}
function video(options: Ivideo) {
    return new Video(options);
}
class Video  implements Icomponents{
    temContainer;
    constructor(private settings: Ivideo) {
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            autopaly: false
        },settings)
        this.init()
    }
    init(){
        this.template();
        this.handle()
    }
    template(){
        this.temContainer = document.createElement('div');
        this.temContainer.className = styles.video;
        this.temContainer.width = this.settings.width;
        this.temContainer.height = this.settings.height;
        this.temContainer.innerHTML = `
        <video class="${styles['video-content']}" src="${this.settings.url}"></video>
        <div class="${styles['video-controls']}">
            <div class="${styles['video-progress']}">
                <div class="${styles['video-progress-now']}"></div>
                <div class="${styles['video-progress-suc']}"></div>
                <div class="${styles['video-progress-bar']}"></div>
            </div>
            <div class="${styles['video-play']}">
                <i class="iconfont icon-bofang"></i>
            </div>
            <div class="${styles['video-time']}">
                <span>00:00</span>/<span>00:00</span>
            </div>
            <div class="${styles['video-full']}">
                <i class="iconfont icon-quanping"></i>
            </div>
            <div class="${styles['video-volume']}">
                <i class="iconfont icon-yinliang"></i>
                <div class="${styles['video-volprogress']}">
                    <div class="${styles['video-volprogress-now']}"></div>
                    <div class="${styles['video-volprogress-bar']}"></div>
                </div>
            </div>
        </div>
        `
        if(typeof this.settings.elem === 'object'){
            this.settings.elem.appendChild(this.temContainer);
        }else{
            document.querySelector(this.settings.elem).appendChild(this.temContainer);
        }
    }
    handle(){
        let videoContent :HTMLVideoElement = this.temContainer.querySelector(`.${styles['video-content']}`);
        let videoControls = this.temContainer.querySelector(`.${styles['video-controls']}`);
        let videoPaly = this.temContainer.querySelector(`.${styles['video-controls']} i`);
        let videoTimes = this.temContainer.querySelectorAll(`.${styles['video-time']} span`);
        let videoFull = this.temContainer.querySelector(`.${styles['video-full']} i`);
        let videoProgress = this.temContainer.querySelectorAll(`.${styles['video-progress']} div`);
        let timer;
        videoContent.volume = 0.5;
        if(this.settings.autopaly){//自动播放处理
            timer = setInterval(playing, 1000);
            videoContent.play();
        }
        this.temContainer.addEventListener('mouseenter',function () {
            videoControls.style.bottom = 0;
        })
        this.temContainer.addEventListener('mouseleave',function () {
            videoControls.style.bottom = '-50px';
        })
        videoContent.addEventListener('canplay',()=>{
            console.log('canplay');
            videoTimes[1].innerHTML = formatTime(videoContent.duration)
        });
        videoContent.addEventListener('play',()=>{
            console.log('play');
            videoPaly.className = 'iconfont icon-zanting'
            timer = setInterval(playing, 1000);
        });
        videoContent.addEventListener('pause',()=>{
            console.log('pause');
            videoPaly.className = 'iconfont icon-bofang';
            clearInterval(timer)
        });
        videoPaly.addEventListener('click',()=>{
            if(videoContent.paused){
                videoContent.play();
            }else{
                videoContent.pause();
            }
        });
        //全屏
        videoFull.addEventListener('click',()=>{
            videoContent.requestFullscreen();
        })
        //
        videoProgress[2].addEventListener('mousedown',function name(ev:MouseEvent) {
            let downX = ev.pageX;//按下的坐标
            let downL = this.offsetLeft;
            document.onmousemove = (ev: MouseEvent)=>{
                let scale = (ev.pageX - downX + downL + 8)/ this.parentNode.offsetWidth;
                if (scale < 0) {
                    scale = 0;
                }else if (scale > 1) {
                    scale = 1;
                }
                videoProgress[0].style.width = scale * 100 + '%';
                videoProgress[1].style.width = scale * 100 + '%';
                this.style.left = scale * 100 + '%';
                videoContent.currentTime = scale * videoContent.duration;
            }
            document.onmouseup = ()=>{
                document.onmousemove = document.onmouseup = null;
            };
            ev.preventDefault();
        })
        function playing() {//正在播放
            let scale = videoContent.currentTime / videoContent.duration;
            let scaleSuc = videoContent.buffered.end(0) / videoContent.duration;
            videoTimes[0].innerHTML = formatTime(videoContent.currentTime);
            videoProgress[0].style.width = scale * 100 + '%';
            videoProgress[1].style.width = scaleSuc * 100 + '%';
            videoProgress[2].style.left = scale * 100 + '%';
        }
        function formatTime(number:number):string{
            number = Math.round(number);//取整
            let min = Math.floor(number/60);
            let sec = number % 60;
            return setZero(min) + ':' + setZero(sec);
        }
        function setZero(number:number):string {
            if(number<10){
                return '0' + number;
            }else {
                return '' + number;
            }
        }
    }


}
export default video;