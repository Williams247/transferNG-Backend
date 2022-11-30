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
  dipolma: DataUrl;
  otherTraining: DataUrl;
}

export interface UserSchemaProps {
  firstname: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  profile: FootBallerSchemaProps | CoachSchemaProps;
}
