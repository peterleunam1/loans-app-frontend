import { Box as SourceBox, styled } from "@mui/material";

export const Line = styled(SourceBox)(( { theme } ) => ({
    display: 'block',
    width: '50%',
    height: '1.5rem',
    background: theme.palette.primary.main,
    borderRadius: '1.25rem',
    marginBottom: '1rem'
}));