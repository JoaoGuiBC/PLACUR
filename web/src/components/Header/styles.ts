import { styled } from "../../../stitches.config";

export const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 5rem',
  
  background: '$blue800',
})

export const UserInfoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  '& span': {
    fontFamily: '$text',
    fontWeight: '$medium',
    fontSize: '1rem',

    color: '$gray100',
  },

  '& img': {
    borderRadius: 100
  }
})