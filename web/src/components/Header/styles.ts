import { styled } from "../../../stitches.config";

export const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',

  background: '$blue800',

  '@md': {
    padding: '0 5rem',
  }
})

export const UserInfoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  '& span': {
    fontFamily: '$text',
    fontWeight: '$medium',
    fontSize: '1rem',
    textAlign: 'right',

    color: '$gray100',
  }
})