"use client"
import React, { createContext, useContext } from "react"

// Stub for future Auth context
const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
