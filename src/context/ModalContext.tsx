'use client';

import React, { createContext, useContext, useState } from 'react';

export interface ProductData {
  id: string;
  name: string;
  brand: string;
  category: string;
  basePrice: number;
  images: string;
  specs: string;
  inventories: {
    id: string;
    condition: string;
    color?: string | null;
    storage?: string | null;
    price: number;
    stockQuantity: number;
    reviews?: {
      id: string;
      userName: string;
      rating: number;
      comment: string;
    }[];
  }[];
}

interface ModalContextType {
  isTradeInOpen: boolean;
  setIsTradeInOpen: (open: boolean) => void;
  isLocationOpen: boolean;
  setIsLocationOpen: (open: boolean) => void;
  isCurrencyOpen: boolean;
  setIsCurrencyOpen: (open: boolean) => void;
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  pillarInfo: { title: string; content: string; iconName?: string } | null;
  setPillarInfo: (info: { title: string; content: string; iconName?: string } | null) => void;
  quickViewProduct: ProductData | null;
  setQuickViewProduct: (prod: ProductData | null) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentZip: string;
  setCurrentZip: (zip: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pillarInfo, setPillarInfo] = useState<{ title: string; content: string; iconName?: string } | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductData | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentZip, setCurrentZip] = useState('94103 (San Francisco)');

  return (
    <ModalContext.Provider
      value={{
        isTradeInOpen,
        setIsTradeInOpen,
        isLocationOpen,
        setIsLocationOpen,
        isCurrencyOpen,
        setIsCurrencyOpen,
        isHelpOpen,
        setIsHelpOpen,
        isAuthOpen,
        setIsAuthOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        pillarInfo,
        setPillarInfo,
        quickViewProduct,
        setQuickViewProduct,
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        currentZip,
        setCurrentZip,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}
