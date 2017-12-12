(function(){if(!customElements.get('xtal-link-preview')){class a extends HTMLElement{constructor(){super(),this._preview=!1;const a=document.createElement('template');a.innerHTML=`
              <style>
                :host {
                  display: block;
                }
              </style>
              <slot></slot>
            `,this.attachShadow({mode:'open'}),this.shadowRoot.appendChild(a.content.cloneNode(!0)),this.style.display='block'}set href(a){this.setAttribute('href',a)}get href(){return this._href}set preview(a){a?this.setAttribute('preview',''):this.removeAttribute('preview')}get preview(){return this._preview}static get observedAttributes(){return['href','preview']}loadHref(){this._preview&&this._href&&fetch('https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url='+this._href+'&image_no=1&css=true').then((a)=>{a.text().then((a)=>{let b=a;['html','head','body'].forEach((a)=>{b=b.replace('<'+a+'>','<div>').replace('</'+a+'>','</div>')}),b=b.replace('<a href="','<a target="_blank" href="'),b=b.replace('<div id="toolbar" class="clearfix"><button id="changeimg">></button></div>',''),this.shadowRoot.innerHTML=b})})}attributeChangedCallback(a,b,c){'href'===a?(this._href=c,this.loadHref()):'preview'===a?(this._preview=null!==c,this.loadHref()):void 0}}customElements.define('xtal-link-preview',a)}})();