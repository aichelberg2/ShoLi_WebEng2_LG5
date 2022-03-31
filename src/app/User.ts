export class User {
  private readonly userProfilePicture: any;
  private readonly userUsername: string = '';
  private readonly userFirstname: string = '';
  private readonly userBirthday: string = '';
  private readonly userEMail: string = '';
  private readonly userPassword: string = '';

  constructor(profilePicture: any, username: string, firstname: string, birthday: string, eMail: string, password: string) {
    this.userProfilePicture=profilePicture;
    this.userUsername=username;
    this.userFirstname=firstname;
    this.userBirthday=birthday;
    this.userEMail=eMail;
    this.userPassword=password;
  }

  getUserProfilePicture(): any {
    return this.userProfilePicture
  }

  getUserUsername(): string {
    return this.userUsername
  }

  getUserFirstname(): string {
    return this.userFirstname
  }

  getUserBirthday(): string {
    return this.userBirthday
  }

  getUserEMail(): string {
    return this.userEMail
  }

  getUserPassword(): string {
    return this.userPassword
  }
}
