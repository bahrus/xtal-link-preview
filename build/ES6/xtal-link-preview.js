import{CorsAnywhere}from"./node_modules/ava-pwar/cors-anywhere.js";const cs=document.currentScript;let customStyle="";const preview="preview";export class XtalLinkPreview extends CorsAnywhere{constructor(){super();this._serviceUrl="https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=";this._preview=!1;const template=document.createElement("template");template.innerHTML=`
          <style>
            :host {
              display: block;
            }
            ${customStyle}
          </style>
          <div id="slot">
          <slot>
           
          </slot>
          </slot>
        `;this.attachShadow({mode:"open"});this.shadowRoot.appendChild(template.content.cloneNode(!0));this.style.display="block"}get preview(){return this._preview}set preview(val){this.attr(preview,val,"")}static get observedAttributes(){return super.observedAttributes.concat([preview])}connectedCallback(){this._upgradeProperties([preview]);super.connectedCallback()}calculateURL(){return this._serviceUrl+this._href+"&image_no=1&css=true"}onPropsChange(){if(!this._connected||!this._preview||this.disabled||!this._href||!this._serviceUrl)return;this.doFetch()}processResponse(response){response.text().then(respText=>{this.fetchInProgress=!1;let massagedText=respText;[["html","div"],["head","header"],["body","main"]].forEach(s=>{massagedText=massagedText.replace("<"+s[0]+">","<"+s[1]+" id=\"root\">").replace("</"+s[0]+">","</"+s[1]+">")});massagedText=massagedText.replace("<a href=\"","<a target=\"_blank\" href=\"");massagedText=massagedText.replace("<div id=\"toolbar\" class=\"clearfix\"><button id=\"changeimg\">></button></div>","");const div=document.createElement("div");div.innerHTML=massagedText;this.shadowRoot.appendChild(div);this.shadowRoot.querySelector("div#slot").innerHTML="";const titleSpan=this.shadowRoot.querySelector("span.title");if(titleSpan)this.title=titleSpan.innerText;this.fetchComplete=!0})}attributeChangedCallback(name,oldValue,newValue){switch(name){case"preview":this._preview=null!==newValue;break;}super.attributeChangedCallback(name,oldValue,newValue)}}if(cs&&cs.dataset.cssPath){fetch(cs.dataset.cssPath).then(resp=>{resp.text().then(css=>{customStyle=css;initXtalLinkPreview()})})}else{initXtalLinkPreview()}function initXtalLinkPreview(){customElements.define("xtal-link-preview",XtalLinkPreview)}