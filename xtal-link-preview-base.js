import { XtalFetchViewElement, define, } from 'xtal-element/XtalFetchViewElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
const preview = 'preview';
const image_width = 'image-width';
const mainTemplate = createTemplate(/* html */ `
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
let XtalLinkPreviewBase = /** @class */ (() => {
    class XtalLinkPreviewBase extends XtalFetchViewElement {
        constructor() {
            super();
            this.readyToRender = true;
            this.mainTemplate = mainTemplate;
            this.initTransform = {
                div: {
                    details: {
                        summary: summarySym,
                        p: pSym,
                    },
                    img: imgSym
                }
            };
            this.updateTransforms = [
                ({ title }) => ({
                    [summarySym]: title,
                }),
                ({ description }) => ({
                    [pSym]: description
                }),
                ({ title, imageWidth, imageSrc }) => ({
                    [imgSym]: [{ alt: title, width: imageWidth, src: imageSrc }]
                })
            ];
            this.as = 'text';
            this.style.display = "block";
        }
        get readyToInit() {
            return this.preview && !this.disabled;
        }
        filterInitData(data) {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, "text/html");
            let imageSrc = this.getMetaContent(htmlDoc, 'name', "twitter:image:src");
            if (!imageSrc)
                imageSrc = this.getMetaContent(htmlDoc, 'name', "twitter:image");
            if (!imageSrc)
                imageSrc = this.getMetaContent(htmlDoc, 'property', 'og:image');
            if (!imageSrc) {
                const img = htmlDoc.querySelector('img');
                if (img) {
                    imageSrc = img.getAttribute('src');
                    //imageSrc = this.getAbsPath(imageSrc);
                    //console.log(imageSrc);
                }
            }
            if (!imageSrc) {
                const iconLink = htmlDoc.querySelector('link[rel="icon"]');
                if (iconLink) {
                    imageSrc = iconLink.getAttribute('href');
                    //imageSrc = this.getAbsPath(imageSrc);
                }
            }
            if (imageSrc)
                imageSrc = this.getAbsPath(imageSrc);
            //console.log(imageSrc);
            let titleEl = htmlDoc.querySelector('title');
            if (titleEl)
                this.title = titleEl.innerHTML;
            let description = this.getMetaContent(htmlDoc, 'name', 'description');
            if (!description) {
                description = '';
            }
            else {
                this.title = this.title.replace(description, '');
            }
            this.description = description;
            this.imageSrc = imageSrc;
            return htmlDoc;
        }
        getMetaContent(htmlDoc, name, val) {
            let metas = Array.from(htmlDoc.querySelectorAll(`meta[${name} = "${val}"]`));
            let meta = metas.filter(item => item.content);
            if (meta && meta.length > 0)
                return meta[0].content;
            return null;
        }
        getAbsPath(imageSrc) {
            let newSrc = imageSrc;
            let href = this.href;
            const iPosOfHash = href.indexOf('#');
            if (iPosOfHash > -1)
                href = href.substr(0, iPosOfHash);
            if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data')) {
                if (imageSrc.startsWith('/')) {
                    newSrc = href.split('/').slice(0, 3).join('/') + imageSrc;
                }
                else {
                    const mid = href.endsWith('/') ? '' : '/';
                    if (newSrc.startsWith('/'))
                        newSrc.replace('/', '');
                    newSrc = href + mid + imageSrc;
                }
            }
            return newSrc;
        }
    }
    XtalLinkPreviewBase.is = 'xtal-link-preview-base';
    XtalLinkPreviewBase.attributeProps = ({ href, baseLinkId, disabled, preview, title, description, imageWidth, imageSrc }) => ({
        bool: [disabled, preview,],
        str: [href, baseLinkId, title, description, imageSrc],
        num: [imageWidth]
    });
    XtalLinkPreviewBase.defaultValues = {
        imageWidth: 150,
    };
    return XtalLinkPreviewBase;
})();
export { XtalLinkPreviewBase };
define(XtalLinkPreviewBase);
