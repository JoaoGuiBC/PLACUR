import { styled } from "../../../stitches.config";

export const Container = styled('footer', {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 5rem',

  backgroundColor: '$white'
})

export const Contacts = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  '& h1': {
    fontFamily: '$heading',
    fontWeight: "$medium",
    fontSize: '$xl',

    color: '$blue600',
  }
})

export const InstitutionalLogos = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr'
})
