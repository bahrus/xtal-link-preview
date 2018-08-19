import {CorsAnywhere} from 'ava-pwar/cors-anywhere.js';
import {define} from 'xtal-latx/define.js';
import { XtallatX } from '../xtal-latx/xtal-latx';

// http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true

//const cs = document.currentScript as HTMLScriptElement;
//let customStyle = ''


const preview = 'preview';
const image_width = 'image-width';

/** 
* `xtal-link-preview`
* Provide preview of URL.
* 
*
* @customElement
* @polymer
* @demo demo/index.html
*/
export class XtalLinkPreview extends CorsAnywhere {
    static get is(){return 'xtal-link-preview';}
    constructor() {
        super();
        this.style.display = "block";
    }



    _serviceUrl: string = 'https://cors-anywhere.herokuapp.com/';
   


    _preview = false;
    /** 
    * @type {string} Must be true to preview the url specified by href
    * 
    */
    get preview() {
        return this._preview;
    }
    set preview(val: boolean) {
        this.attr(preview, val, '');
    }

    _imageWidth = 150;
    get imageWidth(){
        return this._imageWidth;
    }
    set imageWidth(val){
        this.attr(image_width, val.toString());
    }

    static get observedAttributes() {
        return super.observedAttributes.concat( [preview, image_width]);
    }

    connectedCallback(){
        this._upgradeProperties([preview, 'imageWidth']);
        super.connectedCallback();
    }

    calculateURL(){
        return this._serviceUrl + this._href;
    }
    onPropsChange() {
        if (!this._connected || !this._preview || this.disabled || !this._href || !this._serviceUrl ) return;
        this.doFetch();
    }
    getMetaContent(htmlDoc: Document,name: string, val: string){
        let link = htmlDoc.querySelector('meta[' + name + '="' + val + '"]') as HTMLMetaElement;
        if(link) return link.content;
        return null;
    }
    getAbsPath(imageSrc: string){
        let newSrc = imageSrc;
        if(!imageSrc.startsWith('http') && !imageSrc.startsWith('data')){
            if(imageSrc.startsWith('/')){
                newSrc = this._href.split('/').slice(0, 3).join('/') + imageSrc;
            }else{
                const mid = this._href.endsWith('/') ? '' : '/';
                if(newSrc.startsWith('/')) newSrc.replace('/', '');
                newSrc = this._href + mid + imageSrc;
            }
            
            
        }
        return newSrc;
    }
    processResponse(response: Response){
        response.text().then(respText => {
            this.fetchInProgress = false;
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(respText, "text/html");
            let imageSrc = this.getMetaContent(htmlDoc, 'name', "twitter:image:src");
            if(!imageSrc) imageSrc = this.getMetaContent(htmlDoc, 'name', "twitter:image"); 
            if(!imageSrc) imageSrc = this.getMetaContent(htmlDoc, 'property', 'og:image');
            if(!imageSrc) {
                const img = htmlDoc.querySelector('img');
                if(img){
                    imageSrc = img.getAttribute('src');
                    imageSrc = this.getAbsPath(imageSrc);
                    console.log(imageSrc);
                    
                } 

            }
                 
            if(!imageSrc) {
                const iconLink = htmlDoc.querySelector('link[rel="icon"]') as HTMLLinkElement;
                if(iconLink){
                    imageSrc = iconLink.getAttribute('href');
                    imageSrc = this.getAbsPath(imageSrc);
                }
                
            }
            //console.log(imageSrc);
            let titleEl = htmlDoc.querySelector('title');
            let title = 'unknown';
            if(titleEl) this.title = titleEl.innerText;
            this.innerHTML = /* html */ `
                <div>
                    <header>${this.title}</header>
                    <img width="${this._imageWidth}" src="${imageSrc}"/>
                </div>
            `;
            
            this.fetchComplete = true;
        })
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            
            case 'preview':
                this._preview = newValue !== null;
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }
}
define(XtalLinkPreview);



