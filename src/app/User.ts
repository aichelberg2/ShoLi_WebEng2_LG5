export class User {
  // private readonly userProfilePicture: any;
  private readonly userUsername: string = '';
  private readonly userFirstname: string = '';
  private readonly userBirthday: string = '';
  private readonly userEMail: string = '';
  private readonly userPassword: string = '';

  constructor(username: string, firstname: string, eMail: string, password: string) {
    this.userUsername=username;
    this.userFirstname=firstname;
    this.userEMail=eMail;
    this.userPassword=password;
  }

  // getUserProfilePicture(): any {
  //   return this.userProfilePicture
  // }
  //
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
