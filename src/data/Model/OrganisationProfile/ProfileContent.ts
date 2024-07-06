export interface ISection {
  subHeader: string;
  text: string;
}

export interface IProfileContent {
  header: string;
  section: ISection[];
  imageUrl: string;
}

export function convertContentToFireStore(content: IProfileContent) {
  return {
    ...content,
    section: content.section.map((data) => {
      return { ...data };
    }),
  };
}

export function convertFirestoreToContent(data: any): IProfileContent {
  const profileContent: IProfileContent = {
    header: data.header,
    section: data.section.map((obj: { subHeader: any; text: any }) => {
      const section: ISection = {
        subHeader: obj.subHeader,
        text: obj.text,
      };
      return section;
    }),
    imageUrl: data.imageUrl,
  };

  return profileContent;
}
