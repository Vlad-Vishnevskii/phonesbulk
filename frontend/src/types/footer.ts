interface ImageData {
  data: {
    attributes: {
      url: string;
    };
  };
}

interface ContentProps {
  id: string;
  link: string;
  name: string;
  img?: ImageData;
}

interface FooterContent {
  information: ContentProps[];
  custumerservice: ContentProps[];
  contactus: ContentProps[];
}

export interface FooterProps {
  style: string;
  content: FooterContent;
}