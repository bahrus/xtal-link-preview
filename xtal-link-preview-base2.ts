import {XE} from 'xtal-element/src/XE.js';
import {TemplMgmtActions, tm, TemplMgmtProps} from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import {LinkPreviewProps, LinkPreviewActions} from './types';
import { PropInfo } from 'trans-render/lib/types';

const mainTemplate = tm.html`
    <main part=main></main>
    <a -href part="outerLink" target=_blank></a>
`;

const setHref = ({href}: LinkPreviewProps) => ({
    href
});

export class XtalLinkPreviewBase extends HTMLElement{
    setHref = setHref;
}

const isRef: PropInfo = {
    isRef: true,
}

const xe = new XE<LinkPreviewProps & TemplMgmtProps, LinkPreviewActions & TemplMgmtActions>({
    config:{
        tagName: 'xtal-link-preview-base',
        propDefaults:{
            href: ''
        },
        propInfo: {
            hrefProps: isRef,
        },
        actions:{
            ...tm.doInitTransform,
            setHref:{
                ifAllOf:['href'],
                target: 'hrefProps'
            }
        }
    },
    complexPropDefaults:{
        mainTemplate: mainTemplate,
    },
    superclass: XtalLinkPreviewBase,
    mixins: [tm.TemplMgmtMixin]
})