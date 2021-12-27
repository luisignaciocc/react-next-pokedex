import styles from 'src/styles/loader.module.scss';
import { Box } from '@mui/material';

const Loader = () => {
  return (
    <Box component="div" className={styles.content}>
      <Box component="div" className={styles.pokedex}>
        <Box component="div" className={styles.top}>
          <Box component="div" className={styles.camera}></Box>
          <Box component="div" className={styles.lights}>
            <Box component="div" className={styles.red}></Box>
            <Box component="div" className={styles.yellow}></Box>
            <Box component="div" className={styles.green}></Box>
          </Box>
        </Box>
        <Box component="div" className={styles.rect}></Box>
        <Box component="div" className={styles.space}>
          <Box component="div" className={styles.arrowBehind}></Box>
          <Box component="div" className={styles.arrow}></Box>
        </Box>
        <Box component="div" className={styles.scroll}>
          <Box component="div" className={styles.bar}>
            <Box component="div" className={styles.squareTop}></Box>
            <Box component="div" className={styles.squareBottom}></Box>
          </Box>
        </Box>
        <Box component="div" className={styles.fill}></Box>
        <Box component="div" className={styles.triangle}></Box>
        <Box component="div" className={styles.inverse}></Box>
        <Box component="div" className={styles.end}>
          <Box component="div" className={styles.strip}></Box>
        </Box>
      </Box>
      <Box component="div" className={styles.shadow}></Box>
    </Box>
  );
};

export default Loader;
