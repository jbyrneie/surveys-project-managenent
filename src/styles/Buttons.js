import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

export const commonButton ={
  style: {padding:'0 20px', height:'44px'},
  labelStyle: {fontWeight:'400', fontSize:'14px'}
}

export const primaryButton ={
  backgroundColor: '#f24c45',
  style: {border:'1px solid #f24c45'},
  labelStyle: {color:'#fff'},
  hoverColor: '#e61713'
}

export const secondaryButton ={
  backgroundColor: '#80d7e0',
  style: {border:'1px solid #80d7e0'},
  labelStyle: {color:'#fff'},
  hoverColor: '#40b5c5'
}

export const defaultButton ={
  backgroundColor: '#fff',
  labelStyle: {color:'#f24c45'},
  style: {border:'1px solid #f24c45'}
}

export const newSurveyButton ={
  backgroundColor: green[500],
  color: 'white',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:40,
  paddingRight:40,
}

export const whiteButton ={
  backgroundColor: 'white',
  style: {border:'1px solid #0076B4'},
  paddingTop: 10,
  paddingBottom: 5,
  paddingLeft:20,
  paddingRight:20,
  marginLeft:40,
  hoverColor: 'yellow'
}

export const enabledButton ={
  backgroundColor: red[500],
  color: 'white',
  style: {border:'1px solid #0076B4'},
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:40,
  paddingRight:40
}

export const disabledButton ={
  backgroundColor: grey[500],
  color: 'white',
  style: {border:'1px solid #0076B4'},
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:40,
  paddingRight:40,
}

export const warningButton ={
  backgroundColor: '#faca3b',
  style: {border:'1px solid #faca3b'},
  labelStyle: {color:'#fff'},
  hoverColor: '#faaa00'
}
