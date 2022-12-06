import styled from 'styled-components'

export const HeaderLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: ${props => (props.active ? 'black' : 'white')};
`

export const Logout = styled.button`
  outline: none;
  cursor: pointer;
  margin-left: 15px;
  margin-right: 20px;
  padding: 8px;
  padding-left: 10px;
  padding-right: 10px;
  border: 2px solid ${props => (props.active ? 'white' : '#3b82f6')};
  color: ${props => (props.active ? 'white' : '#3b82f6')};
  font-weight: bold;
  background-color: transparent;
`
