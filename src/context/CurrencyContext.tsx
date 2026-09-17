import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'NGN' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  nativeName: string;
  flag: string;
  rate: number; // Conversion rate: 1 USD = rate in target currency
  decimals: number;
  symbolPosition: 'prefix' | 'suffix';
}

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nativeName: 'USD',
    flag: '🇺🇸',
    rate: 1.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    nativeName: 'EUR',
    flag: '🇪🇺',
    rate: 0.92,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    nativeName: 'GBP',
    flag: '🇬🇧',
    rate: 0.78,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    nativeName: '円',
    flag: '🇯🇵',
    rate: 155.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    nativeName: '元',
    flag: '🇨🇳',
    rate: 7.25,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    nativeName: 'Naira',
    flag: '🇳🇬',
    rate: 1450.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    nativeName: 'AUD',
    flag: '🇦🇺',
    rate: 1.54,
    decimals: 0,
    symbolPosition: 'prefix',
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencyConfig: CurrencyConfig;
  convert: (usdAmount: number) => number;
  formatPrice: (usdAmount: number, options?: { roundToNearest?: number }) => string;
  formatRange: (minUsd: number, maxUsd: number) => string;
  formatMonthly: (usdAmount: number) => string;
  formatHourly: (minUsd: number, maxUsd: number) => string;
  supportedCurrencies: CurrencyConfig[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dev_engineering_currency') as CurrencyCode;
      if (saved && SUPPORTED_CURRENCIES[saved]) {
        return saved;
      }
    }
    return 'USD';
  });

  useEffect(() => {
    localStorage.setItem('dev_engineering_currency', currency);
  }, [currency]);

  const currencyConfig = SUPPORTED_CURRENCIES[currency];

  const convert = (usdAmount: number): number => {
    const converted = usdAmount * currencyConfig.rate;
    // Round appropriately according to currency magnitude
    if (currency === 'JPY') {
      // JPY prices rounded to nearest 500 or 1,000 for realistic pricing
      return Math.round(converted / 100) * 100;
    } else if (currency === 'NGN') {
      // NGN rounded to nearest 1,000 or 500 for clean enterprise quotes
      return Math.round(converted / 500) * 500;
    } else if (currency === 'CNY') {
      return Math.round(converted / 50) * 50;
    } else if (currency === 'USD' || currency === 'EUR' || currency === 'GBP' || currency === 'AUD') {
      return Math.round(converted / 10) * 10;
    }
    return Math.round(converted);
  };

  const formatPrice = (usdAmount: number): string => {
    const value = convert(usdAmount);
    const formattedNum = value.toLocaleString();
    if (currencyConfig.symbolPosition === 'prefix') {
      return `${currencyConfig.symbol}${formattedNum}`;
    }
    return `${formattedNum} ${currencyConfig.symbol}`;
  };

  const formatRange = (minUsd: number, maxUsd: number): string => {
    const minVal = convert(minUsd);
    const maxVal = convert(maxUsd);
    return `${currencyConfig.symbol}${minVal.toLocaleString()} – ${currencyConfig.symbol}${maxVal.toLocaleString()}`;
  };

  const formatMonthly = (usdAmount: number): string => {
    const val = convert(usdAmount);
    return `${currencyConfig.symbol}${val.toLocaleString()} / month`;
  };

  const formatHourly = (minUsd: number, maxUsd: number): string => {
    const minVal = Math.round(minUsd * currencyConfig.rate);
    const maxVal = Math.round(maxUsd * currencyConfig.rate);
    return `${currencyConfig.symbol}${minVal.toLocaleString()} – ${currencyConfig.symbol}${maxVal.toLocaleString()} / hour`;
  };

  const setCurrency = (c: CurrencyCode) => {
    if (SUPPORTED_CURRENCIES[c]) {
      setCurrencyState(c);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencyConfig,
        convert,
        formatPrice,
        formatRange,
        formatMonthly,
        formatHourly,
        supportedCurrencies: Object.values(SUPPORTED_CURRENCIES),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
