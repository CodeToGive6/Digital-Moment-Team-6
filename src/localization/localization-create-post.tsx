import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export interface IStrings extends LocalizedStringsMethods {
  title: string;
  postTitle: string;
  postBody: string;
  tags: string;
  discard: string,
  post: string,
  submitted: string;
}

let strings: IStrings;
strings = new LocalizedStrings({
  en:{
    title: "New Post",
    postTitle: "Title",
    postBody: "Body Text",
    tags: "Tags",
    discard: "Discard",
    post: "Post",
    submitted: "Congratulations submitted"
  },
  fr:{
    title: "Nouveau Post",
    postTitle: "Titre",
    postBody: "Écriver ici",
    tags: "Étiquettes",
    discard: "Effacer",
    post: "Envoyer",  
    submitted: "Envoyer avec success"
  }
})

export { strings };