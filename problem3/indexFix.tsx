interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  walletBlance: WalletBalance;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
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
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.currency);
        if (balancePriority > -99 && balance.amount >= 0) {
          return true;
        }
        return false;
      })
      .sort((leftBalance: WalletBalance, rightBalance: WalletBalance) => {
        const leftPriority = getPriority(leftBalance.currency);
        const rightPriority = getPriority(rightBalance.currency);
        return leftPriority - rightPriority;
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances?.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const renderedBalances = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[`${balance.currency}`]
        ? prices[`${balance.currency}`] * balance.amount
        : 0 * balance.amount;
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

  return <div {...rest}>{renderedBalances}</div>;
};
