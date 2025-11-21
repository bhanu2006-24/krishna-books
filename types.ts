
export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: {
    isAvailable: boolean;
    acsTokenLink?: string;
    downloadLink?: string;
  };
  pdf: {
    isAvailable: boolean;
    acsTokenLink?: string;
    downloadLink?: string;
  };
  webReaderLink?: string;
  accessViewStatus: string;
}

export interface Book {
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  accessInfo: AccessInfo;
}