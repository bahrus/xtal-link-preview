export interface LinkPreviewViewModel{
    title: string;
    description: string;
    imageSrc: string;
}

export interface LinkPreviewProps{
    href: string;
    hrefProps: NodeListOf<HTMLElement>;
}

export interface LinkPreviewActions{
    setHref: (self: this) => Partial<LinkPreviewProps>;
}