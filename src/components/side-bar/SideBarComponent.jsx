import { Apartment, ArrowBackIosNewOutlined, Calculate, CalendarMonth, Dashboard, Folder, Groups, HelpOutline, LoginOutlined, MenuOutlined, PlaylistAddCheck, RoomPreferences, Summarize, } from '@mui/icons-material'
import { Box, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { UseAuth } from '../../customhooks/UseAuth'
import { sideBarTitles } from '../../GlobalTitles'
import { useLocation, useNavigate } from 'react-router-dom'

const Items = ({ label, icon, color, onClickAction, active }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Tooltip title={label} placement="right-start">
            <Box>
                <MenuItem
                    active={active}
                    style={{
                        background: active ? '#EFF6FF' : (isHovered ? '#EFF6FF' : 'transparent'),
                        color: active ? '#2563EB' : (isHovered ? '#2563EB' : '#000000'),
                        borderStartStartRadius: 20,
                        borderEndStartRadius: 20,
                        marginTop: 2
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    icon={icon}
                    onClick={onClickAction}
                >
                    <Typography variant='subtitle1'>{label}</Typography>
                </MenuItem>
            </Box>
        </Tooltip>
    );
};

const SideBarComponent = () => {
    const { roles } = UseAuth();
    const [show, setHide] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("activeItem", activeItem)
    const globalTitles = sideBarTitles();

    const handleNavigation = (path) => {
        navigate(path);
        setActiveItem(path); // Update the active item when navigating
    };

    useEffect(() => {
        // Extract the pathname from location object and set the active item accordingly
        setActiveItem(location.pathname);
    }, [location]);

    const logOutHandler = () => {
        navigate('/sign-in');
        localStorage.clear('Taxsure');
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
        <Box>
            <Sidebar collapsed={show}
                transitionDuration={500}
                backgroundColor={"#E5E7EB"}
                rootStyles={{
                    height: "100vh",
                    boxShadow: "0 3px 3em #f0f0f0"
                }}>
                {!show && <Box sx={{ textAlign: "right", p: 1.5, cursor: "pointer", position: "sticky", top: "0em", bgcolor: "#E5E7EB", zIndex: 99 }}>
                    <ArrowBackIosNewOutlined onClick={() => setHide(true)} sx={{ color: "#000000" }} />
                </Box>}
                {show && <Box sx={{ textAlign: "center", p: 1.5, cursor: "pointer", position: "sticky", top: "0em", bgcolor: "#E5E7EB", zIndex: 99 }}>
                    <MenuOutlined onClick={() => setHide(false)} sx={{ color: "#000000" }} />
                </Box>}
                {!show && <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1em", p: 1, position: "sticky", top: "3em", zIndex: 99, bgcolor: "#E5E7EB" }}>
                    <img src="/taxsure-logo.png" alt="logo.png" style={{ width: "60%", marginTop: "-3.5em", padding: "0 0.3em" }} />
                </Box>}
                <Menu
                    closeOnClick
                    transitionDuration={500}
                >
                    <Items label={globalTitles?.dashboardName} icon={<Dashboard size={25} />} color={"black"} onClickAction={() => handleNavigation('/dashboard')} active={isActivePath('/dashboard')} />
                    <Items label={globalTitles?.manageExperts} icon={<Groups size={25} />} color={"black"} onClickAction={() => handleNavigation('/temp')} active={isActivePath('/temp')} />
                    <Items label={globalTitles?.manageCustomers} icon={<Apartment size={25} />} color={"black"} onClickAction={() => handleNavigation('/temp')} active={isActivePath('/temp')} />
                    <Items label={globalTitles?.manageCase} icon={<Folder size={25} />} color={"black"} onClickAction={() => handleNavigation('/temp')} active={isActivePath('/temp')} />
                    <Items label={globalTitles?.manageCalander} icon={<CalendarMonth size={25} />} color={"black"} onClickAction={() => handleNavigation('/temp')} active={isActivePath('/temp')} />
                    <Items label={globalTitles?.manageCalculator} icon={<Calculate size={25} />} color={"black"} onClickAction={() => handleNavigation('/temp')} active={isActivePath('/temp')} />
                    <Items label={globalTitles?.manageReport} icon={<Summarize size={25} />} color={"black"} onClickAction={() => handleNavigation('/temp')} active={isActivePath('/temp')} />
                    <Items label={globalTitles?.manageHelpSupport} icon={<HelpOutline size={25} />} color={"black"} onClickAction={() => handleNavigation('/temp')} active={isActivePath('/temp')} />

                    {roles && (roles?.roleId === 1000 || roles?.roleId === 2000) && <Tooltip title={globalTitles?.setUps} placement="right-start">
                        <SubMenu style={{ fontSize: "1.1em", backgroundColor: "#E5E7EB !important" }} icon={<PlaylistAddCheck />} label={globalTitles?.setUps}>
                            <Box padding={"0 0 0 1.5em"} sx={{ backgroundColor: "#E5E7EB" }}>
                                <Items label={globalTitles?.manageEmployee}
                                    color={"black"} onClickAction={() => handleNavigation('/employee')} active={isActivePath('/employee')} />
                                <Items label={globalTitles?.manageOperator}
                                    color={"black"} onClickAction={() => handleNavigation('/operator')} active={isActivePath('/operator')} />
                                <Items label={globalTitles?.manageBatchesShift}
                                    color={"black"} onClickAction={() => handleNavigation('/shift')} active={isActivePath('/shift')} />
                                {roles && roles?.roleId === 1000 &&
                                    <Items label={globalTitles?.manageMachine}
                                        color={"black"} onClickAction={() => handleNavigation('/machine')} active={isActivePath('/machine')} />
                                }
                                <Items label={globalTitles?.managePartNumber}
                                    color={"black"} onClickAction={() => handleNavigation('/part-number')} active={isActivePath('/part-number')} />
                            </Box>
                        </SubMenu>
                    </Tooltip>}
                    <Tooltip title={globalTitles?.logOut} placement="right-start">
                        <Box>
                            <MenuItem
                                icon={<LoginOutlined size={25} />}
                                style={{ color: "red" }}
                                onClick={() => logOutHandler()}
                            >
                                <Typography variant='subtitle1'>{globalTitles?.logOut}</Typography>
                            </MenuItem>
                        </Box>
                    </Tooltip>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SideBarComponent;