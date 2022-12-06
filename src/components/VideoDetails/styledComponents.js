import styled from 'styled-components'

export const ParaItem = styled.button`
  font-weight: bold;
  font-family: 'Roboto';
  font-weight:bold
  padding-left: 8px;
  line-height: 0px;
  color: ${props => (props.activeicon ? '#ff0000' : '#000000')};
`
