import styled from 'styled-components'

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  outline: none;
  cursor: pointer;
  align-items: center;
  padding: 2px;
  padding-left: 25px;
  background-color: ${props =>
    (props.colorOption, props.active) ? '#f1f5f9' : 'white'};
`

export const OptionMainContainer = styled.div`
  width: 14%;
  flex-shrink: inherit;
  height: 89vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color:${props => (props.active ? 'white' : 'black')}
  background-color:${props => (props.active ? 'black' : 'white')}
  margin-right: 35px;
`
