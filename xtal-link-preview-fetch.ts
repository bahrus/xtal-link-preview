import {XtalFetch} from 'xtal-fetch/xtal-fetch.js';
import {XE} from 'xtal-element/src/XE.js';
import { XtalLinkPreviewFetchProps } from './types';
import {XtalFetchProps} from 'xtal-fetch/types';

export class XtalLinkPreviewFetchCore extends XtalFetch{
    static is = 'xtal-link-preview-fetch';
    filterResult(result: string): any{
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, "text/html");
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
        this.viewModel = {
            description,
            imageSrc,
            title
        };
        return result;
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

export interface XtalLinkPreviewFetchCore extends XtalLinkPreviewFetchProps{}

const xe = new XE<XtalLinkPreviewFetchProps & XtalFetchProps>({
    config:{
        tagName: 'xtal-link-preview-fetch',
        propDefaults:{
            as: 'text'
        },
        propInfo:{
            viewModel:{
                notify:{dispatch:true}
            }
        }

    },
    superclass: XtalLinkPreviewFetchCore
});