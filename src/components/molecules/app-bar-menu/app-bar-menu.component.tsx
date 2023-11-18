import { useState } from "react";

// Material Imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { getCapitalize } from "utils";

// Interfaces
interface AppBarMenuProps {
  elements: Array<Record<string, any>>;
  mainElements: Array<Record<string, any>>;
}

export default function ButtonAppBar({
  elements,
  mainElements,
}: AppBarMenuProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNav = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleClick = (legacyOnClick: () => unknown) => {
    setAnchorElNav(null);
    if (legacyOnClick) legacyOnClick();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenNav}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={() => setAnchorElNav(null)}
          >
            {elements.map(({ title, onClick = null }) => (
              <MenuItem key={title} onClick={() => handleClick(onClick)}>
                <Typography>{getCapitalize(title)}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loansapp
          </Typography>
          <Box sx={{ display: {} }}>
            {mainElements.map(({ title, onClick = null }) => (
              <Button
                key={title}
                sx={{ textTransform: "none", margin: "0 5px" }}
                color="inherit"
                onClick={() => handleClick(onClick)}
              >
                {getCapitalize(title)}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
