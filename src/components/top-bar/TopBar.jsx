import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopBarTitles } from "../../GlobalTitles";


const Item = ({ label, onClickAction, active }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <>
            <Typography
                style={{
                    borderBottom: active ? "3px solid #083a8a" : (isHovered ? "3px solid #083a8a" : 'none'),
                    // background: active ? '#083a8a' : (isHovered ? '#083a8a' : 'transparent'),
                    color: active ? '#000000' : (isHovered ? '#000000' : '#000000'),
                    // borderStartStartRadius: 20,
                    // borderEndStartRadius: 20,
                    marginTop: 2
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClickAction}
            >
                {label}
            </Typography>
        </>
    )
}

const TopBar = () => {
    const menuLabels = TopBarTitles()
    const location = useLocation();
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActivePath = (path) => {
        // Avoid highlighting root path `/` if you're on any other path, even sub-paths
        if (path === '/' && location.pathname === '/') {
            return true; // Highlight `/` only when you're on the exact root path
        }
        // Check for exact path match (e.g., `/shift`, `/machine`, etc.)
        if (location.pathname === path) return true;

        // For any other sub-paths (e.g., `/shift/add-shift`), don't highlight the root (`/`)
        if (path === '/' && location.pathname !== '/') {
            return false; // Ensure that root path isn't highlighted on subpaths
        }

        // Match base path and sub-paths (e.g., `/shift`, `/machine` should be highlighted on `/shift/any`, `/machine/any`)
        if (location.pathname.startsWith(path)) return true;

        return false; // If no match, return false
    };
    return (
        <>
            <Grid container sx={{ width: "100%", position: "fixed", display: "flex", alignItems: "center", zIndex: 999, top: 0, py: 1, backgroundColor: "#ffffff", boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.1)" }} >
                <Grid size={{ sm: 3 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src="/taxsure-logo.png" alt="" style={{ width: "50%" }} />
                </Grid>
                <Grid size={{ sm: 6 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <Item label={menuLabels.home} onClickAction={() => handleNavigation('/')} active={isActivePath('/')} />
                        <Typography>
                            {menuLabels.about}
                        </Typography>
                        <Typography>
                            {menuLabels.service}
                        </Typography>
                        <Typography>
                            {menuLabels.service}
                        </Typography>
                        <Typography>
                            {menuLabels.contact}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ sm: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 1, sm: 4 }, alignItems: "center" }}>
                        <Item label={menuLabels.signIn} onClickAction={() => handleNavigation('/sign-in')} active={isActivePath('/sign-in')} />
                        <Item label={menuLabels.signUp} onClickAction={() => handleNavigation('/sign-up')} active={isActivePath('/sign-up')} />

                        {/* <Typography sx={{ backgroundColor: "#2563EB", px: 3, py: 1, borderRadius: "1em", color: "#ffffff" }}>
                            Sign Up
                        </Typography> */}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default TopBar;