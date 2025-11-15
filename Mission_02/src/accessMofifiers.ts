class BankAccount {
  private userId: number;
  private userName: string;
  private userBalance: number;

  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBalance;
  }
  updateBalance(newBalance:number) {
    this.userBalance = this.userBalance + newBalance;
  }
}

const AsadAccount = new BankAccount(101, 'Asad', 30000);
AsadAccount.updateBalance(10000);
console.log(AsadAccount)
