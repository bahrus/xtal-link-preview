import { XtalFetchViewElement, define, symbolize, p } from 'xtal-element/XtalFetchViewElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import { templStampSym } from 'trans-render/standardPlugins.js';
const mainTemplate = createTemplate(/* html */ `
    <main part=main></main>
    <a part="outerLink" target=_blank></a>
`);
const innerTemplate = createTemplate(/* html */ `
    <img part="image"/>
    <details open part=details>
        <summary part=summary></summary>
        <p part=p></p>
    </details>
    <div part=linkContainer>
        <svg viewBox="0 0 24 24" style="width:16.25px;height:16.25px">
            <g>
                <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
            </g>
        </svg>
        <a part=innerLink target=_blank></a>
        <span part=domain></span>
    </div>
    
`);
const splitPath = import.meta.url.split('/');
splitPath.pop();
navigator.serviceWorker.register(splitPath.join('/') + '/sw.js');
const uiRefs = { main: p, outerLink: p, summary: p, p: p, image: p, innerLink: p, domain: p };
symbolize(uiRefs);
const initTransform = ({ linkEverything }) => ({
    a: linkEverything ? innerTemplate : false,
    outerLinkPart: linkEverything ? [templStampSym, uiRefs] : false,
    main: linkEverything ? false : innerTemplate,
    mainPart: linkEverything ? false : [templStampSym, uiRefs],
});
const linkDomainName = ({ self, href }) => {
    const splitHref = href.split('/');
    const domain = splitHref[2];
    const splitDomain = domain.split('.');
    self.domainName = splitDomain[splitDomain.length - 2] + '.' + splitDomain[splitDomain.length - 1];
};
const updateTransforms = [
    ({ viewModel, linkEverything }) => ({
        [uiRefs.summary]: viewModel.title,
        [uiRefs.p]: viewModel.description,
    }),
    ({ imageWidth, viewModel, linkEverything }) => ({
        [uiRefs.image]: [{ alt: viewModel.title, style: { width: imageWidth }, src: viewModel.imageSrc }]
    }),
    ({ href, linkEverything, domainName }) => ({
        [uiRefs.outerLink]: [, , { href: href }],
        [uiRefs.innerLink]: linkEverything ? false : [{ textContent: domainName, href: href }],
        [uiRefs.domain]: linkEverything ? [{ textContent: domainName }] : false,
    }),
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
export class XtalLinkPreviewBase extends XtalFetchViewElement {
    constructor() {
        super();
        this.noShadow = true;
        // get readyToRender(){
        //     return this.viewModel !== undefined;
        // }
        this.readyToRender = true;
        this.mainTemplate = mainTemplate;
        this.initTransform = initTransform;
        this.propActions = [linkDomainName];
        this.updateTransforms = updateTransforms;
        this.as = 'text';
        this.reqInit = {
            headers: {
                'xtal-link-preview': 'v0'
            }
        };
    }
    get readyToInit() {
        return this.preview && !this.disabled && this.href !== undefined && this.baseLinkId !== undefined && this.imageWidth !== undefined;
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
XtalLinkPreviewBase.attributeProps = ({ href, baseLinkId, disabled, preview, imageWidth, eventScopes, linkEverything, domainName }) => ({
    bool: [disabled, preview, linkEverything],
    str: [href, baseLinkId, imageWidth],
    obj: [eventScopes, domainName],
    jsonProp: [eventScopes],
    async: [href, baseLinkId]
});
XtalLinkPreviewBase.defaultValues = {
    imageWidth: '100%',
    linkEverything: false,
};
define(XtalLinkPreviewBase);
