import './main.css'
import popup from './components/popup/popup';
import video from './components/video/video'
let listItem = document.querySelectorAll('#list li');
let a = 123;
for(let i = 0; i< listItem.length; i++){
    listItem[i].addEventListener('click',function(){
        let url = this.dataset.url;
        let title = this.dataset.title;
        console.log(url, title);
        popup({
            width: '880px',
            height: '556px',
            title,
            pos:"center",
            content:(elem)=>{
                console.log('elem: ', elem);
                video({
                    url,
                    elem,
                    autopaly: true
                })
            }
        })
    })
}