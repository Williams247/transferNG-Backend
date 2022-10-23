export interface FootBallerSchemaProps {
  firstname: string;
  surname: string;
  dob: string;
  videoLink: string;
  nationality: string;
  languages: string;
  height: string;
  weight: string;
  bestPosition: string;
  foot: string;
  shortBiography: string;
  currentCity: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  linkedinProfileLink: string;
  instagramProfileLink: string;
  twitterProfileLink: string;
  previousClub: string;
  clubJoined: string;
  contractExpired: string;
}

export interface CoachSchemaProps {
  firstname: string;
  surname: string;
  dob: string;
  videoLink: string;
  nationality: string;
  languages: string;
  formerTeams: string;
  currentTeam: string;
  keyArchievements: string;
  currentCity: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  licensesCertificate: {
    public_id: string;
    secure_url: string;
  };
  dipolmaCertificate: {
    public_id: string;
    secure_url: string;
  };
  otherTrainingCertifications: {
    public_id: string;
    secure_url: string;
  };
}
