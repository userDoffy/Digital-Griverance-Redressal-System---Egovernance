import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: Boolean(localStorage.getItem("authToken")),
    token: localStorage.getItem("authToken"),
    role: localStorage.getItem("userRole")
  },
  reducers: {
    login: (state, action) => {
      state.authenticated = true
      state.token = action.payload.token
      state.role = action.payload.role
      localStorage.setItem("authToken", action.payload.token)
      localStorage.setItem("userRole", action.payload.role)
    },
    logout: state => {
      state.authenticated = false
      state.token = null
      state.role = null
      localStorage.removeItem("authToken")
      localStorage.removeItem("userRole")
    },
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer