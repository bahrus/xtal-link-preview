import { XtalFetchViewElement, define, } from 'xtal-element/XtalFetchViewElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
const mainTemplate = createTemplate(/* html */ `
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
            this.noShadow = true;
            this.readyToRender = true;
            this.mainTemplate = mainTemplate;
            this.initTransform = {
                main: {
                    div: {
                        details: {
                            summary: summarySym,
                            p: pSym,
                        },
                        img: imgSym
                    }
                }
            };
            this.updateTransforms = [
                ({ viewModel }) => ({
                    [summarySym]: viewModel.title,
                }),
                ({ viewModel }) => ({
                    [pSym]: viewModel.description
                }),
                ({ imageWidth, viewModel }) => ({
                    [imgSym]: [{ alt: viewModel.title, width: imageWidth, src: viewModel.imageSrc }]
                })
            ];
            this.as = 'text';
            this.style.display = "block";
        }
        get readyToInit() {
            return this.preview && !this.disabled && this.href !== undefined && this.baseLinkId !== undefined;
        }
        //imageSrc: string;
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
                }
            }
            if (!imageSrc) {
                const iconLink = htmlDoc.querySelector('link[rel="icon"]');
                if (iconLink) {
                    imageSrc = iconLink.getAttribute('href');
                }
            }
            if (imageSrc)
                imageSrc = this.getAbsPath(imageSrc);
            let title;
            let titleEl = htmlDoc.querySelector('title');
            if (titleEl)
                title = titleEl.innerHTML;
            let description = this.getMetaContent(htmlDoc, 'name', 'description');
            if (!description) {
                description = '';
            }
            else {
                title = title.replace(description, '');
            }
            const viewModel = {
                description,
                imageSrc,
                title
            };
            return viewModel;
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
    XtalLinkPreviewBase.attributeProps = ({ href, baseLinkId, disabled, preview, imageWidth }) => ({
        bool: [disabled, preview,],
        str: [href, baseLinkId],
        num: [imageWidth],
        async: [href, baseLinkId]
    });
    XtalLinkPreviewBase.defaultValues = {
        imageWidth: 150,
    };
    return XtalLinkPreviewBase;
})();
export { XtalLinkPreviewBase };
define(XtalLinkPreviewBase);
