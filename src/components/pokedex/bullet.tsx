import { Box } from '@mui/material';

interface Props {
  color: string;
  text: string;
}

const Bullet = (props: Props) => {
  const { color, text } = props;
  return (
    <Box
      component="span"
      sx={{
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: '12px',
        color: 'rgb(255, 255, 255)',
        cursor: 'default',
        display: 'inline-flex',
        flexGrow: '0',
        flexShrink: '0',
        fontSize: '0.5rem',
        lineHeight: '1.5',
        fontWeight: '400',
        justifyContent: 'center',
        letterSpacing: '0.5px',
        minWidth: '10px',
        paddingLeft: '5px',
        paddingRight: '5px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        margin: '2px',
      }}
    >
      {text}
    </Box>
  );
};

export default Bullet;
