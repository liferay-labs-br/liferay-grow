export interface IProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  avatar: string;
  location: string;
  name: string;
  role: string;
}

interface Github {
  id: string;
  login: string;
  avatar_url: string;
  email: string;
  name: string;
  company: string;
  location: string;
  bio: string;
}

interface User {
  id: string;
  github: Github;
}

interface IProfileWrapperProps extends React.HTMLAttributes<HTMLElement> {
  me: User;
}
