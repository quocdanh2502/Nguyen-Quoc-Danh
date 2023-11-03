/* The interface definition does not take advantage of existing interfaces: 
currency, amount are two properties that are already defined in another class and can 
be reused without declaring it because this is very time consuming. */
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /* Use of any type results in loss of control over the data type. Instead, we should define explicit interfaces for objects*/
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          /* balancePriority do not use*/
          const balancePriority = getPriority(balance.blockchain); //balance do not property "blockchain"
          /* Should only call if once and use the && operator to condition*/
          if (lhsPriority > -99) {
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })
        /* The name of the input parameter is unclear. What are lhs and rhs */
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain); //lhs do not property "blockchain"
          const rightPriority = getPriority(rhs.blockchain); //rhs do not property "blockchain"
          if (leftPriority > rightPriority) {
            return -1; // If first right should return 1
          } else if (rightPriority > leftPriority) {
            return 1; // If second right should return -1
          }
        })
    );
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  /* The variable name is unclear. What are rows */
  /* Declare formattedBalances but do not reuse sortedBalances over and over again */
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      /* price, if it is an object, you must use prices[`${balance.currency}`] it if you want to access it */
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
