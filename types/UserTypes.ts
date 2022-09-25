export interface UserType {
  id: string;
  name?: string;
  email: string | null;
  emailVerified?: Date;
  password?: string;
  image?: string;
}
