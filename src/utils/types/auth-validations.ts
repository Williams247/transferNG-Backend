export interface ValidateFootballerRegProps {
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
  linkendinProfile: string;
  password: string;
  confirmPassword: string;
  linkedinProfileLink: string;
  instagramLink: string;
  twitterProfileLink: string;
  previousClub: string;
  clubJoined: string;
  contractExpired: string;
}

export interface ValidateFootballerLoginProps {
  email: string;
  password: string;
}

export interface validateCoachRegProps {
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
}

export interface AgeRange {
  min: number;
  max: number;
  dob: string;
  user: string;
}

export interface ResponseProps {
  message: string;
  status: number;
}
