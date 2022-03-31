export class newUser {

  private username: string;
  private email: string;
  private password: String;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  getUsername(){
    return this.username;
  }

  getEmail(){
    return this.email;
  }

  getPassword(){
    return this.password;
  }
}
