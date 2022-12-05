import { styled } from "../../../stitches.config";

export const Tag = styled('div', {
  position: 'absolute',
  width: '4.5rem',
  height: '1rem',
  right: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,

  borderRadius: '8px 0 0 0',

  fontFamily: "$text",
  fontWeight: "$regular",
  fontSize: "$xs",
  color: '$white',

  variants: {
    category: {
      Workshop: {
        backgroundColor: "$pink500"
      },
      Palestra: {
        backgroundColor: "$purple500"
      },
      EAD: {
        backgroundColor: "$blue100"
      },
      Capacitação: {
        backgroundColor: "$red500"
      },
      Seminário: {
        backgroundColor: "$green500"
      },
      Outros: {
        backgroundColor: "$gray800"
      }
    }
  }
})