import { AdminProps } from "./common";

interface DataUrl {
  publicId: string;
  url: string;
}

// Footballer profile props
export interface FootBallerSchemaProps {
  dob: string;
  videoLink: string;
  nationality: string;
  language: string;
  height: string;
  weight: string;
  bestPosition: string;
  foot: string;
  shortBiography: string;
  currentCity: string;
  linkedinProfileLink: string;
  instagramProfileLink: string;
  twitterProfileLink: string;
  previousClub: string;
  clubJoined: string;
  contractExpired: string;
}

// Coach profile props
export interface CoachSchemaProps {
  dob: string;
  shortBiography: string;
  nationality: string;
  formerTeam: string;
  currentTeam: string;
  videoLink: string;
  language: string;
  keyArchievements: string;
  currentCity: string;
  licenses: DataUrl;
  diploma: DataUrl;
  otherTraining: DataUrl;
}

export interface UserSchemaProps {
  _id?: string;
  firstname: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  footballerPersonalData?: FootBallerSchemaProps;
  coachPersonalData?: CoachSchemaProps;
}

export interface ProductSchemaProps {
  name: string;
  price: number;
  description?: string;
  seller?: AdminProps;
}
