class BankAccount {
  public readonly userId: number;
  userName: string;
  private userBalance: number;

  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBalance;
  }

  set addBalance(newBalance: number) {
    this.userBalance = this.userBalance + newBalance;
  }
  get getBalance() {
   return this.userBalance
  }
}

const AsadAccount = new BankAccount(101, 'Asad', 30000);
AsadAccount.addBalance = 20000;
console.log(AsadAccount)
