import {XtalFetchViewElement, define, AttributeProps, } from 'xtal-element/XtalFetchViewElement.js';
import {createTemplate} from 'trans-render/createTemplate.js';
import {TransformRules} from 'trans-render/types.d.js';
import {LinkPreviewViewModel} from './types.d.js';


const mainTemplate = createTemplate(/* html */`
<main>
    <div>
        <details open>
            <summary></summary>
            <p></p>
        </details>
        <img/>
    </div>
</main>
`);

const summarySym = Symbol('summarySym');
const pSym = Symbol('pSym');
const imgSym = Symbol('imgSym');

const initTransform = {
    main:{
        div:{
            details:{
                summary: summarySym,
                p: pSym,
            },
            img: imgSym
        }
    }
} as TransformRules;

const updateTransforms = [
    ({viewModel}: XtalLinkPreviewBase) => ({
        [summarySym]: viewModel.title, 
    }),
    ({viewModel}: XtalLinkPreviewBase) =>({
        [pSym]: viewModel.description
    }),
    ({imageWidth, viewModel}: XtalLinkPreviewBase) => ({
        [imgSym]:[{alt: viewModel.title, width: imageWidth, src: viewModel.imageSrc}]
    })

];



/** 
* `xtal-link-preview`
* Provide preview of URL.
* 
*
* @customElement
* @polymer
* @demo demo/index.html
*/
export class XtalLinkPreviewBase extends XtalFetchViewElement<LinkPreviewViewModel> {
    static is = 'xtal-link-preview-base';

    noShadow = true;

    static attributeProps = ({href, baseLinkId, disabled, preview, imageWidth}: XtalLinkPreviewBase) =>({
        bool: [disabled, preview, ],
        str: [href, baseLinkId],
        num: [imageWidth],
        async: [href, baseLinkId]
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
        return this.preview && !this.disabled && this.href !== undefined && this.baseLinkId !== undefined;
    }

    readyToRender = true;

    mainTemplate = mainTemplate;

    initTransform = initTransform;

    updateTransforms = updateTransforms;

   

    /** 
    * @type {string} Must be true to preview the url specified by href
    * 
    */
    preview: boolean;

    imageWidth: number;

    //imageSrc: string;

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
                
            } 

        }
             
        if(!imageSrc) {
            const iconLink = htmlDoc.querySelector('link[rel="icon"]') as HTMLLinkElement;
            if(iconLink){
                imageSrc = iconLink.getAttribute('href');
            }
            
        }
        if(imageSrc) imageSrc =  this.getAbsPath(imageSrc);
        let title: string;
        let titleEl = htmlDoc.querySelector('title');
        if(titleEl) title = titleEl.innerHTML;
        let description = this.getMetaContent(htmlDoc, 'name', 'description');
        if(!description) {
            description = '';
        }else{
            title = title.replace(description, '');
        }
        const viewModel = {
            description,
            imageSrc,
            title
        };
        return viewModel;
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



