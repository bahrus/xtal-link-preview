import {CorsAnywhere} from 'ava-pwar/cors-anywhere.js';

// http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true

const cs = document.currentScript as HTMLScriptElement;
let customStyle = ''


// const href = 'href';
// const service_url = 'service-url';
const preview = 'preview';
// const fetch_in_progress = 'fetch-in-progress';
// const fetch_complete = 'fetch-complete';
// const title = 'title';

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
    constructor() {
        super();
        // const template = document.createElement('template');
        // template.innerHTML = `
        //   <style>
        //     :host {
        //       display: block;
        //     }
        //     ${customStyle}
        //   </style>
        //   <div id="slot">
        //   <slot>
           
        //   </slot>
        //   </slot>
        // `;
        // this.attachShadow({ mode: 'open' });
        // this.shadowRoot.appendChild(template.content.cloneNode(true));
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



    static get observedAttributes() {
        return super.observedAttributes.concat( [preview]);
    }

    connectedCallback(){
        this._upgradeProperties([preview]);
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
                    <img height="110" width="110" src="${imageSrc}"/>
                </div>
            `;
            // let massagedText = respText;
            // //console.log(massagedText);
            // const replacements = [['html', 'div'], ['head', 'header'], ['body', 'main']];
            // replacements.forEach(s => {
            //     massagedText = massagedText.replace('<' + s[0] + '>', '<' + s[1] + ' id="root">').replace('</' + s[0] + '>', '</' + s[1] + '>');
            // })
            // massagedText = massagedText.replace('<a href="', '<a target="_blank" href="');
            // //console.log(massagedText);
            // massagedText = massagedText.replace('<div id="toolbar" class="clearfix"><button id="changeimg">></button></div>', '');
            // //const massagedText = respText.replace('<html>', '<div>')
            // const div = document.createElement('div');
            // div.innerHTML = massagedText;
            // this.shadowRoot.appendChild(div);
            // this.shadowRoot.querySelector('div#slot').innerHTML = '';
            // const titleSpan = this.shadowRoot.querySelector('span.title');
            // if(titleSpan) this.title = titleSpan.innerText;
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

// if (cs && cs.dataset.cssPath) {
//     fetch(cs.dataset.cssPath).then(resp => {
//         resp.text().then(css => {
//             customStyle = css;
//             initXtalLinkPreview();
//         });
//     })
// } else {
//     initXtalLinkPreview();
// }


//function initXtalLinkPreview() {
    customElements.define('xtal-link-preview', XtalLinkPreview);
//}

