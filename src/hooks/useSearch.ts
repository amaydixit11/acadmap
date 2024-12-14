"use client"

import { useState, FormEvent } from "react";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement search functionality
    setIsSearchOpen(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    handleSearch,
  };
};