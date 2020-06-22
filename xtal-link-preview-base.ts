import {XtalFetchViewElement, define, AttributeProps, } from 'xtal-element/XtalFetchViewElement.js';
import {createTemplate} from 'trans-render/createTemplate.js';
import {TransformRules} from 'trans-render/types.d.js';

const preview = 'preview';
const image_width = 'image-width';

const mainTemplate = createTemplate(/* html */`
<style>
</style>
<div>
<details open>
        <summary></summary>
        <p></p>
    </details>
    <img/>
</div>
`);

const summarySym = Symbol('summarySym');
const pSym = Symbol('pSym');
const imgSym = Symbol('imgSym');

/** 
* `xtal-link-preview`
* Provide preview of URL.
* 
*
* @customElement
* @polymer
* @demo demo/index.html
*/
export class XtalLinkPreviewBase extends XtalFetchViewElement {
    static is = 'xtal-link-preview-base';

    static attributeProps = ({href, baseLinkId, disabled, preview, title, description, imageWidth, imageSrc}: XtalLinkPreviewBase) =>({
        bool: [disabled, preview, ],
        str: [href, baseLinkId, title, description, imageSrc],
        num: [imageWidth]
    } as AttributeProps);

    static defaultValues: any = {
        imageWidth: 150,
    } as XtalLinkPreviewBase;

    constructor() {
        super();
        this.as = 'text';
        this.style.display = "block";
    }

    get readyToInit(){
        return this.preview && !this.disabled;
    }

    readyToRender = true;

    mainTemplate = mainTemplate;

    initTransform = {
        div:{
            details:{
                summary: summarySym,
                p: pSym,
            },
            img: imgSym
        }

    } as TransformRules;

    updateTransforms = [
        ({title}: XtalLinkPreviewBase) => ({
            [summarySym]: title, 
        }),
        ({description}: XtalLinkPreviewBase) =>({
            [pSym]: description
        }),
        ({title, imageWidth, imageSrc}: XtalLinkPreviewBase) => ({
            [imgSym]:[{alt: title, width: imageWidth, src: imageSrc}]
        })

    ];

    title: string;

    description: string;



    //_serviceUrl: string = 'https://cors-anywhere.herokuapp.com/';
   

    /** 
    * @type {string} Must be true to preview the url specified by href
    * 
    */
    preview: boolean;

    imageWidth: number;

    imageSrc: string;

    filterInitData(data: string){
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, "text/html");
        let imageSrc = this.getMetaContent(htmlDoc, 'name', "twitter:image:src");
        if(!imageSrc) imageSrc = this.getMetaContent(htmlDoc, 'name', "twitter:image"); 
        if(!imageSrc) imageSrc = this.getMetaContent(htmlDoc, 'property', 'og:image');
        if(!imageSrc) {
            const img = htmlDoc.querySelector('img');
            if(img){
                imageSrc = img.getAttribute('src');
                //imageSrc = this.getAbsPath(imageSrc);
                //console.log(imageSrc);
                
            } 

        }
             
        if(!imageSrc) {
            const iconLink = htmlDoc.querySelector('link[rel="icon"]') as HTMLLinkElement;
            if(iconLink){
                imageSrc = iconLink.getAttribute('href');
                //imageSrc = this.getAbsPath(imageSrc);
            }
            
        }
        if(imageSrc) imageSrc =  this.getAbsPath(imageSrc);
        //console.log(imageSrc);
        let titleEl = htmlDoc.querySelector('title');
        if(titleEl) this.title = titleEl.innerHTML;
        let description = this.getMetaContent(htmlDoc, 'name', 'description');
        if(!description) {
            description = '';
        }else{
            this.title = this.title.replace(description, '');
        }
        this.description = description;
        this.imageSrc = imageSrc;
        return htmlDoc;
    }
    

    getMetaContent(htmlDoc: Document,name: string, val: string){
        let metas = Array.from(htmlDoc.querySelectorAll(`meta[${name} = "${val}"]`)) as HTMLMetaElement[];
        let meta = metas.filter(item => item.content);
        if(meta && meta.length > 0) return meta[0].content;
        return null;
    }
    getAbsPath(imageSrc: string){
        let newSrc = imageSrc;
        let href = this.href;
        const iPosOfHash = href.indexOf('#');
        if(iPosOfHash > -1) href = href.substr(0, iPosOfHash);
        if(!imageSrc.startsWith('http') && !imageSrc.startsWith('data')){
            if(imageSrc.startsWith('/')){
                newSrc = href.split('/').slice(0, 3).join('/') + imageSrc;
            }else{
                const mid = href.endsWith('/') ? '' : '/';
                if(newSrc.startsWith('/')) newSrc.replace('/', '');
                newSrc = href + mid + imageSrc;
            }
            
            
        }
        return newSrc;
    }

}
define(XtalLinkPreviewBase);



