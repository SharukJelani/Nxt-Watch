import React from 'react'

const ThemeContext = React.createContext({
  themeActive: false,
  changeTheme: () => {},
})

export default ThemeContext
