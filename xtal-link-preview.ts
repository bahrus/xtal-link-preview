import {XtalLinkPreviewBase} from './xtal-link-preview-base.js';
import {tm} from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import {def} from 'trans-render/lib/def.js';

const template = tm.html`
<style>
:host{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;    
}
slot {
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
}
main, [part="outerLink"] {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    max-width: 500px;
}

/* On mouse-over, add a deeper shadow */
main:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

[part="linkContainer"] {
    display: flex;
    flex-direction:row;
    align-self:self-start;
}

img {
    object-fit: scale-down;
}


summary{
    list-style:none;
    margin-top: 5px;
    font-weight: 800;
}

summary::-webkit-details-marker {
    display: none;
}

a:link{
    text-decoration:none;
}



p, summary, a, svg {
    text-align: left;
    margin-left: 5px;
}
</style>
`;
export class XtalLinkPreview extends XtalLinkPreviewBase {
    static is = 'xtal-link-preview'; 

    doTemplMount(self: this, clonedTemplate: DocumentFragment){
        console.log(clonedTemplate);
    }
}
def(XtalLinkPreview);