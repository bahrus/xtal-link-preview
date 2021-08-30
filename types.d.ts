import {OpenBordersProps} from 'open-borders/types';

export interface LinkPreviewViewModel{
    title: string;
    description: string;
    imageSrc: string;
    domainName: string;
}

export interface LinkPreviewProps{
    href: string;
    __href: string;
    // hrefProps: NodeListOf<HTMLElement>;
    baseLinkId: string;
    __baseLinkId: string;
    // baseLinkIdProps: NodeListOf<HTMLElement>;
    linkEverything: boolean;
    openBordersElements: NodeListOf<OpenBordersProps & HTMLElement>;
}

export interface LinkPreviewActions{
    //setHref: (self: this) => {href: string};
    //setBaseLinkId: (self: this) => {baseLinkId: string};
    setOpenBordersTarget: (self: this) => Partial<OpenBordersProps>;
}

export interface XtalLinkPreviewFetchProps{
    viewModel: LinkPreviewViewModel;
}