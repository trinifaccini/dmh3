import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { theme } from 'integrador/styles/material-theme';
import { FC } from 'react';

interface TextCardProps {
    title: string,
    content: string
}

const TextCard: FC<TextCardProps> = ({title, content}: TextCardProps) => {

  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

  const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));



  return (
    <Card sx={{ borderRadius: '30px', height: '100%', padding: mobile ? '1%' : laptopOrDesktop ? '0.75rem' : '1rem', boxShadow: 'none' }} >
      <CardContent>
        <Typography variant='h2' fontWeight='bold' gutterBottom>
          {title}
        </Typography>
        <hr style={{backgroundColor: '#C1FD35', height: '2px', border: 'none'}}/>
        <Typography variant="body1" lineHeight='1.4'>
          {content}
        </Typography>
      </CardContent>
     
    </Card>
  );
}

export default TextCard;