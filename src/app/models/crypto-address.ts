export interface CryptoAddress {
  coin: string;
  symbol: string;
  address: string;
  network?: string;
  color: string;
}

export const CRYPTO_ADDRESSES: CryptoAddress[] = [
  { coin: 'Bitcoin', symbol: 'BTC', address: 'bc1qd0t6uhrgq8ck74n3g2fweq4kfw35as66gne72y', color: '#f7931a' },
  { coin: 'Ethereum', symbol: 'ETH', address: '0x3729c742E6eF4552ad32c08f61804308CB1Cffd8', network: 'TRC20', color: '#627eea' },
  { coin: 'Toncoin', symbol: 'TON', address: 'UQCKG4T2Csv5dGK24w1e8ndd96VuBanYey5tvzGeJkFW_09x', color: '#0098ea' },
  { coin: 'Litecoin', symbol: 'LTC', address: 'ltc1q2ku8rax5wgcuhh8m03k8gyng8ggj9svkjn6fq4', color: '#bfbbbb' },
  { coin: 'Ravencoin', symbol: 'RVN', address: 'RX7zXpdzH8GoBpHzzuVes3DN7znbwaWi4z', color: '#f5a623' },
  { coin: 'Ethereum Classic', symbol: 'ETC', address: '0xB3a6Fa84556d562F1E7ceD5C8452985d1aDAf572', color: '#3ab83a' },
  { coin: 'Bitcoin Cash', symbol: 'BCH', address: 'qqkgr48fjxf0rf9cpd9zdjdpkuu29nhfj5y4hcdhfm', color: '#0ac18e' },
];
